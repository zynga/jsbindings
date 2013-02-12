/*
 * JS Bindings: https://github.com/zynga/jsbindings
 *
 * Copyright (c) 2013 Zynga Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


#include "jsb_config.h"
#if JSB_INCLUDE_OPENGL

#include "jsapi.h"
#include "jsfriendapi.h"

#include "jsb_opengl_manual.h"
#include "jsb_basic_conversions.h"
#include "jsb_core.h"
#include "jsb_opengl_functions.h"


// Helper functions that link "glGenXXXs" (OpenGL ES 2.0 spec), with "gl.createXXX" (WebGL spec)
JSBool JSB_glGenTextures(JSContext *cx, uint32_t argc, jsval *vp) {
	JSB_PRECONDITION2( argc == 0, cx, JS_FALSE, "Invalid number of arguments" );

	GLuint texture;
	glGenTextures(1, &texture);
	JS_SET_RVAL(cx, vp, INT_TO_JSVAL(texture));
	return JS_TRUE;
}

JSBool JSB_glGenBuffers(JSContext *cx, uint32_t argc, jsval *vp) {
	JSB_PRECONDITION2( argc == 0, cx, JS_FALSE, "Invalid number of arguments" );

	GLuint buffer;
	glGenBuffers(0, &buffer);
	JS_SET_RVAL(cx, vp, INT_TO_JSVAL(buffer));
	return JS_TRUE;
}

JSBool JSB_glGenRenderbuffers(JSContext *cx, uint32_t argc, jsval *vp) {
	JSB_PRECONDITION2( argc == 0, cx, JS_FALSE, "Invalid number of arguments" );

	GLuint renderbuffers;
	glGenRenderbuffers(1, &renderbuffers);
	JS_SET_RVAL(cx, vp, INT_TO_JSVAL(renderbuffers));
	return JS_TRUE;
}

JSBool JSB_glGenFramebuffers(JSContext *cx, uint32_t argc, jsval *vp) {
	JSB_PRECONDITION2( argc == 0, cx, JS_FALSE, "Invalid number of arguments" );

	GLuint framebuffers;
	glGenFramebuffers(1, &framebuffers);
	JS_SET_RVAL(cx, vp, INT_TO_JSVAL(framebuffers));
	return JS_TRUE;
}

JSBool JSB_glDeleteTextures(JSContext *cx, uint32_t argc, jsval *vp) {
	JSB_PRECONDITION2( argc == 1, cx, JS_FALSE, "Invalid number of arguments" );
	jsval *argvp = JS_ARGV(cx,vp);
	JSBool ok = JS_TRUE;
	uint32_t arg0;

	ok &= jsval_to_uint32( cx, *argvp++, &arg0 );
	JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");

	glDeleteTextures(1, &arg0);
	JS_SET_RVAL(cx, vp, JSVAL_VOID);
	return JS_TRUE;
}

JSBool JSB_glDeleteBuffers(JSContext *cx, uint32_t argc, jsval *vp) {
	JSB_PRECONDITION2( argc == 1, cx, JS_FALSE, "Invalid number of arguments" );
	jsval *argvp = JS_ARGV(cx,vp);
	JSBool ok = JS_TRUE;
	uint32_t arg0;

	ok &= jsval_to_uint32( cx, *argvp++, &arg0 );
	JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");

	glDeleteBuffers(1, &arg0);
	JS_SET_RVAL(cx, vp, JSVAL_VOID);
	return JS_TRUE;
}

JSBool JSB_glDeleteRenderbuffers(JSContext *cx, uint32_t argc, jsval *vp) {
	JSB_PRECONDITION2( argc == 1, cx, JS_FALSE, "Invalid number of arguments" );
	jsval *argvp = JS_ARGV(cx,vp);
	JSBool ok = JS_TRUE;
	uint32_t arg0;

	ok &= jsval_to_uint32( cx, *argvp++, &arg0 );
	JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");

	glDeleteRenderbuffers(1, &arg0);
	JS_SET_RVAL(cx, vp, JSVAL_VOID);
	return JS_TRUE;
}

JSBool JSB_glDeleteFramebuffers(JSContext *cx, uint32_t argc, jsval *vp) {
	JSB_PRECONDITION2( argc == 1, cx, JS_FALSE, "Invalid number of arguments" );
	jsval *argvp = JS_ARGV(cx,vp);
	JSBool ok = JS_TRUE;
	uint32_t arg0;

	ok &= jsval_to_uint32( cx, *argvp++, &arg0 );
	JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");

	glDeleteFramebuffers(1, &arg0);
	JS_SET_RVAL(cx, vp, JSVAL_VOID);
	return JS_TRUE;
}


#endif // JSB_INCLUDE_OPENGL
