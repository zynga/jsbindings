/*
 OpenGL helper functions
 */

require('jsb_opengl_enums.js');

var gl = gl || {};


gl.bindTexture = function(target, texture) {
	var texture_id = texture;
	if( typeof texture === 'object' )
		texture_id = texture.getName();

	gl._bindTexture( target, texture_id );
};
