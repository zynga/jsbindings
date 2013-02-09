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

    def validate_argument(self, arg):
        if self._vectorFunction:

            # Skip count
            if arg['name'] == 'count':
                return (None, None)

            # Vector thing
            if arg['type'] == '^i':
                return ('N/A', 'Vector')

        return super(JSBGenerateFunctions_GL, self).validate_argument(arg)

    def generate_function_binding(self, function):
        func_name = function['name']

        # Manually bind "vector" functions
 #       print func_name

        # Match for vector functions
        r = re.match('gl\S+[1-4][fi]v$', func_name)
        self._vectorFunction = (r != None)

        return super(JSBGenerateFunctions_GL, self).generate_function_binding(function)
