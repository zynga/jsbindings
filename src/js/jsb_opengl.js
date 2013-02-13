/*
 OpenGL ES 2.0 / WebGL helper functions
 */

/*
 * According to the WebGL specification ( For further info see:s http://www.khronos.org/registry/webgl/specs/latest/webgl.idl ),
 * the API should work with objects like WebGLTexture, WebGLBuffer, WebGLRenderBuffer, WebGLFramebuffer, WebGLProgram, WebGLShader.
 * OpenGL ES 2.0 doesn't have "objects" concepts: Instead it uses ids (GLints). So, these objects are emulated in this thin wrapper.
 */

require('jsb_opengl_enums.js');

var gl = gl || {};

//
// Create functions
//
gl.createTexture = function() {
	// Returns a "WebGLTexture" object
	var ret = gl._createTexture();
	return { texture_id:ret };
};

gl.createBuffer = function() {
	// Returns a "WebGLBuffer" object
	var ret = gl._createBuffer();
	return { buffer_id:ret };
};

gl.createRenderbuffer = function() {
	// Returns a "WebGLRenderBuffer" object
	var ret = gl._createRenderuffer();
	return { renderbuffer_id:ret};
};

gl.createFramebuffer = function() {
	// Returns a "WebGLFramebuffer" object
	var ret = gl._createFramebuffer();
	return {framebuffer_id:ret};
};

gl.createProgram = function() {
	// Returns a "WebGLProgram" object
	var ret = gl._createProgram();
	return {program_id:ret};
};

gl.createShader = function(type) {
	// Returns a "WebGLShader" object
	var ret = gl._createShader(type);
	return {shader_id:ret};
};


//
// Native functions don't use WebGL objects. Instead, they use ids
//

// Texture related
gl.bindTexture = function(target, texture) {
	var texture_id = texture.texture_id;

	// Accepts cocos2d's cc.Texture2D objects.
	if( typeof texture_id === 'undefined' )
		texture_id = texture.getName();

	gl._bindTexture( target, texture_id );
};

// Shader related
gl.compileShader = function(shader) {
	gl._compileShader( shader.shader_id);
};

gl.shaderSource = function(shader, source) {
	gl._shaderSource(shader.shader_id, source);
};

gl.getShaderParameter = function(shader, e) {
	return gl._getShaderParameter(shader.shader_id,e);
};

gl.getShaderInfoLog = function(shader) {
	return gl._getShaderInfoLog(shader.shader_id);
};

// program related
gl.attachShader = function(program, shader) {
	gl._attachShader(program.program_id, shader.shader_id);
};

gl.linkProgram = function(program) {
	gl._linkProgram(program.program_id);
};

gl.getProgramParameter = function(program, e) {
	return gl._getProgramParameter(program.program_id, e);
};

gl.useProgram = function(program) {
	gl._useProgram (program.program_id);
};

gl.getAttribLocation = function(program, name) {
	return gl._getAttribLocation(program.program_id, name);
};

// uniform related
gl.getUniformLocation = function(program, name) {
	return gl._getUniformLocation(program.program_id,name);
};

