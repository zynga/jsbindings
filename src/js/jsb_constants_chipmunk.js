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

/// Initialize an static body
cp.BodyStatic = function()
{
	return new cp.Body(Infinity, Infinity);
};


// "Bounding Box" compatibility with Chipmunk-JS
cp.BB = function(l, b, r, t)
{
	return {l:l, b:b, r:r, t:t};
};

// helper function to create a BB
cp.bb = function(l, b, r, t) {
	return new cp.BB(l, b, r, t);
};


//
// Some properties
//
// "handle" needed in some cases
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
// Space properties
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
					},
					"idleSpeedThreshold" : {
						get : function(){
                            return this.getIdleSpeedThreshold();
                        },
						set : function(newValue){
                            this.setIdleSpeedThreshold(newValue);
                        },
						enumerable : true,
						configurable : true
					},
					"sleepTimeThreshold": {
						get : function(){
                            return this.getSleepTimeThreshold();
                        },
						set : function(newValue){
                            this.setSleepTimeThreshold(newValue);
                        },
						enumerable : true,
						configurable : true
					},
					"collisionSlop": {
						get : function(){
                            return this.getCollisionSlop();
                        },
						set : function(newValue){
                            this.setCollisionSlop(newValue);
                        },
						enumerable : true,
						configurable : true
					},
					"collisionBias": {
						get : function(){
                            return this.getCollisionBias();
                        },
						set : function(newValue){
                            this.setCollisionBias(newValue);
                        },
						enumerable : true,
						configurable : true
					},
					"collisionPersistence": {
						get : function(){
                            return this.getCollisionPersistence();
                        },
						set : function(newValue){
                            this.setCollisionPersistence(newValue);
                        },
						enumerable : true,
						configurable : true
					},
					"enableContactGraph": {
						get : function(){
                            return this.getEnableContactGraph();
                        },
						set : function(newValue){
                            this.setEnableContactGraph(newValue);
                        },
						enumerable : true,
						configurable : true
					}
				});

