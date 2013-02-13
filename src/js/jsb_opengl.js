/*
 OpenGL ES 2.0 / WebGL helper functions
 For further info see:s http://www.khronos.org/registry/webgl/specs/latest/webgl.idl
 */

require('jsb_opengl_enums.js');

var gl = gl || {};


gl.bindTexture = function(target, texture) {
	var texture_id = texture;

	// Accepts cocos2d's cc.Texture2D objects.
	// Future: it should also supports WebGLTexture objects
	if( typeof texture === 'object' )
		texture_id = texture.getName();

	gl._bindTexture( target, texture_id );
};

gl.createTexture = function() {
	// Should it return a WebGLTexture ?
	return gl._createTexture();
};

gl.createBuffer = function() {
	// Should it return a WebGLBuffer ?
	return gl._createBuffer();
};

gl.createRenderbuffer = function() {
	// it should return a WebGLRenderBuffer
	return gl._createRenderuffer();
};

gl.createFramebuffer = function() {
	// it should return a WebGLBuffer
	return gl._createFramebuffer();
};

gl.createProgram = function() {
	// it should return a WebGLProgram ?
	return gl._createProgram();
};

gl.createShader = function(type) {
	// it should return a WebGLShader ?
	return gl._createShader(type);
};
