#!/usr/bin/python
# ----------------------------------------------------------------------------
# Plugin to generate OpenGL ES 2.0 / WebGL code for JSB
#
# Author: Ricardo Quesada
# Copyright 2013 (C) Zynga, Inc
#
# License: MIT
# ----------------------------------------------------------------------------
'''
Plugin to generate OpenGL ES 2.0 / WebGL code for JSB
'''

__docformat__ = 'restructuredtext'


# python modules
import re

# plugin modules
from generate_jsb import JSBGenerateFunctions


#
#
# OpenGL ES 2.0 / WebGL function plugin
#
#
class JSBGenerateFunctions_GL(JSBGenerateFunctions):

    def __init__(self, config):
        super(JSBGenerateFunctions_GL, self).__init__(config)

        # TypedArray ivars
        self._current_typedarray = None
        self._with_count = False
        self._typedarray_dt = ['TypedArray/Sequence', 'ArrayBufferView']

        # Extend supported types
        self.args_js_special_type_conversions['TypedArray'] = [self.generate_argument_typedarray, 'void*']
        self.args_js_special_type_conversions['ArrayBufferView'] = [self.generate_argument_arraybufferview, 'void*']

        # Other supported functions
        self.supported_functions_without_count = ['glReadPixels', 'glDrawElements']
        self.supported_functions_with_count = ['glBufferData', 'glBufferSubData']

        # Only valid when _with_count is enabled
        self.args_to_ignore_in_js = ['count', 'size']

    #
    # Helper functions
    #
    def generate_argument_typedarray(self, i, arg_js_type, arg_declared_type):
        if self._current_typedarray:
            # TypedArray is used as an IN paramter
            template = '\tGLsizei count;\n\tok &= jsval_typedarray_to_dataptr( cx, *argvp++, &count, &arg%d, %s);\n' % (i, self._current_typedarray)
            self.fd_mm.write(template)
        else:
            raise Exception("Logic error in GL plugin")

    def generate_argument_arraybufferview(self, i, arg_js_type, arg_declared_type):
        if self._current_typedarray:
            # TypedArray is used as an OUT paramter
            template = '\tGLsizei count;\n\tok &= get_arraybufferview_dataptr( cx, *argvp++, &count, &arg%d);\n' % (i)
            self.fd_mm.write(template)
        else:
            raise Exception("Logic error in GL plugin")

    def generate_function_c_call_arg(self, i, dt):
        if self._current_typedarray and dt in self._typedarray_dt:
            ret = ''
            if self._with_count:
                ret += ', count'
            ret += ', (%s*)arg%d ' % (self._current_cast, i)
            return ret
        return super(JSBGenerateFunctions_GL, self).generate_function_c_call_arg(i, dt)

    #
    # Overriden methods
    #
    def convert_function_name_to_js(self, function_name):

        use_underscore = False
        # It is possible to add the "name" parameter in opengl_jsb.ini,
        # but it easier with a plugin
        functions_with_underscore = [
                                    'glCreateShader', 'glCreateProgram',
                                    'glDeleteShader', 'glDeleteProgram',
                                    'glGetShaderInfoLog', 'glGetProgramInfoLog',
                                    'glAttachShader', 'glLinkProgram', 'glUseProgram', 'glCompileShader',
                                    'glGetAttribLocation', 'glGetUniformLocation', 'glGetShaderSource', 'glShaderSource',
                                    'glValidateProgram',
                                    'glVertexAttribPointer',
                                    ]

        if function_name in functions_with_underscore:
            use_underscore = True
        elif re.match('gl\S+([1-4])([fi])v$', function_name):
            use_underscore = True
        elif re.match('glBind.*$', function_name):
            use_underscore = True

        if use_underscore:
            name = function_name[2].lower() + function_name[3:]
            return "_%s" % name
        return super(JSBGenerateFunctions_GL, self).convert_function_name_to_js(function_name)

    def validate_argument(self, arg):
        if self._current_typedarray:
            # Skip count, size: ivars for glUniformXXX, glBufferData, etc...
            if self._with_count and arg['name'] in self.args_to_ignore_in_js:
                return (None, None)

            # Vector thing
            if arg['type'] == '^i':
                return ('TypedArray', 'TypedArray/Sequence')
            elif arg['type'] == '^v':
                return ('ArrayBufferView', 'ArrayBufferView')
        else:
            # Special case: glVertexAttribPointer
            if self._current_funcname == 'glVertexAttribPointer' and arg['type'] == '^v':
                # Argument is an integer, but cast it as a void *
                return ('i', 'GLvoid*')
            elif self._current_funcname in ['glGetAttribLocation', 'glBindAttribLocation', 'glGetUniformLocation'] and arg['type'] == '*':
                return ('char*', 'char*')

        return super(JSBGenerateFunctions_GL, self).validate_argument(arg)

    def generate_function_binding(self, function):
        func_name = function['name']

        self._current_funcname = func_name
        self._current_typedarray = None
        self._current_cast = 'GLvoid'
        self._with_count = False

        t = None
        # Testing generic vector functions
        r = re.match('gl\S+([1-4])([fi])v$', func_name)
        if r:
            t = 'f32' if r.group(2) == 'f' else 'i32'
            self._with_count = (re.match('glVertexAttrib[1-4][fi]v', func_name) == None)
        else:
            if func_name in self.supported_functions_without_count:
                t = 'v'
            elif func_name in self.supported_functions_with_count:
                t = 'v'
                self._with_count = True

        if t == 'f32':
            self._current_typedarray = 'js::ArrayBufferView::TYPE_FLOAT32'
            self._current_cast = 'GLfloat'
        elif t == 'i32':
            self._current_typedarray = 'js::ArrayBufferView::TYPE_INT32'
            self._current_cast = 'GLint'
        elif t == 'u8':
            self._current_typedarray = 'js::ArrayBufferView::TYPE_UINT8'
            self._current_cast = 'GLuint8'
        elif t == 'v':
            self._current_typedarray = 'void'
            self._current_cast = 'GLvoid'

        return super(JSBGenerateFunctions_GL, self).generate_function_binding(function)
