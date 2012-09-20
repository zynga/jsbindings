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

// Properties, for Chipmunk-JS compatibility
Object.defineProperties(cp.Base.prototype,
				{
					"handle" : {
						get : function(){
                            return this.getHandle();
                        },
                        enumerable : true,
						configurable : true
					}
				});

// Properties, for Chipmunk-JS compatibility
Object.defineProperties(cp.Space.prototype,
				{
					"gravity" : {
						get : function(){
                            return this.getGravity();
                        },
						set : function(newValue){
                            this.setGravity(newValue);
                        },
						enumerable : true,
						configurable : true
					},
					"iterations" : {
						get : function(){
                            return this.getIterations();
                        },
						set : function(newValue){
                            this.setIterations(newValue);
                        },
						enumerable : true,
						configurable : true
					},
					"damping" : {
						get : function(){
                            return this.getDamping();
                        },
						set : function(newValue){
                            this.setDamping(newValue);
                        },
						enumerable : true,
						configurable : true
					},
					"staticBody" : {
						get : function(){
                            return this.getStaticBody();
                        },
						enumerable : true,
						configurable : true
					}
				});
