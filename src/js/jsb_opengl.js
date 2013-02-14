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

gl.createShader = function(shaderType) {
	// Returns a "WebGLShader" object
	var ret = gl._createShader(shaderType);
	return {shader_id:ret};
};

//
// Delete Functions
//
gl.deleteTexture = function(texture) {
	gl._deleteTexture(texture.texture_id);
};

gl.deleteBuffer = function(bufer) {
	gl._deleteBuffer(buffer.buffer_id);
};

gl.deleteRenderbuffer = function(bufer) {
	gl._deleteRenderbuffer(buffer.renderbuffer_id);
};

gl.deleteFramebuffer = function(bufer) {
	gl._deleteFramebuffer(buffer.framebuffer_id);
};

gl.deleteProgram = function(program) {
	gl._deleteProgram(program.program_id);
};

gl.deleteShader = function(shader) {
	gl._deleteShader(shader.shader_id);
};

//
// Bind Related
//
gl.bindTexture = function(target, texture) {

	var texture_id;
	// Accept numbers too. eg: gl.bindTexture(0)
	if( typeof texture === 'number' )
		texture_id = texture;
	// Accepts cocos2d's cc.Texture2D objects as well
	else if( typeof texture.texture_id === 'undefined' )
		texture_id = texture.getName();
	else
		texture_id = texture.texture_id;

	gl._bindTexture( target, texture_id );
};

gl.bindBuffer = function(target, buffer) {
	var buffer_id = buffer.buffer_id;

	// Accept numbers too. eg: gl.bindBuffer(0)
	if( typeof buffer === 'number' )
		buffer_id = buffer;

	gl._bindBuffer(target, buffer_id);
};

gl.bindRenderBuffer = function(target, buffer) {
	var buffer_id = buffer.renderbuffer_id;

	// Accept numbers too. eg: gl.bindRenderbuffer(0)
	if( typeof buffer === 'number' )
		buffer_id = buffer;

	gl._bindRenderbuffer(target, buffer_id);
};

gl.bindFramebuffer = function(target, buffer) {
	var buffer_id = buffer.framebuffer_id;

	// Accept numbers too. eg: gl.bindFramebuffer(0)
	if( typeof buffer === 'number' )
		buffer_id = buffer;

	gl._bindFramebuffer(target, buffer_id);
};

//
// Uniform related
//
// gl.uniformMatrix2fv = function(location, bool, matrix) {
// 	gl._uniformMatrix2fv(program.program_id, bool, matrix);
// };

// gl.uniformMatrix3fv = function(program, bool, matrix) {
// 	gl._uniformMatrix3fv(program.program_id, bool, matrix);
// };

// gl.uniformMatrix4fv = function(program, bool, matrix) {
// 	gl._uniformMatrix4fv(program.program_id, bool, matrix);
// };


//
// Shader related
//
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

//
// program related
//
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

