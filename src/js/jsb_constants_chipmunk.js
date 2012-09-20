//
// Chipmunk defines
//

cp.v = cc.p;
cp._v = cc._p;
cp.vzero  = cp.v(0,0);


/// Initialize an offset box shaped polygon shape.
cp.BoxShape2 = function(body, box)
{
	var verts = [
		box.l, box.b,
		box.l, box.t,
		box.r, box.t,
		box.r, box.b
	];
	
	return new cp.PolyShape(body, verts, cp.vzero);
};
