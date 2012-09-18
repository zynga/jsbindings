
/* File auto generated but manually modified */

/*----------------------
 *
 *       Body
 *
 *----------------------*/
 /* cpBodyNew( m, i ) */
cp.Body = function( /* m,i | handle */ ) {
    if (arguments.length === 2) {
        this.object = new cp._Body( arguments[0], arguments[1] );
        this.handle = this.object.getHandle();
    } else if( arguments.length === 1) {
        this.handle = arguments[0];
    } else if( arguments.length === 0) {
        // Static Object ??
        this.object = new cp._Body( Infinity, Infinity );
        this.handle = this.object.getHandle();
    }
};

/* cpBodyNewStatic(  ) */
cp.BodyXXXFIXMEXXX = function(  ) {
    this.object = new cp._Body(  );
    this.handle = this.object.getHandle();
};

/* cpBodyActivate( body ) */
cp.Body.prototype.activate = function(  ) {
    return cp.bodyActivate( this.handle );
};

/* cpBodyActivateStatic( body, filter ) */
cp.Body.prototype.activateStatic = function( filter ) {
    return cp.bodyActivateStatic( this.handle, filter );
};

/* cpBodyAlloc(  ) */
cp.Body.prototype.alloc = function(  ) {
    return cp.bodyAlloc( this.handle );
};

/* cpBodyApplyForce( body, f, r ) */
cp.Body.prototype.applyForce = function( f, r ) {
    return cp.bodyApplyForce( this.handle, f, r );
};

/* cpBodyApplyImpulse( body, j, r ) */
cp.Body.prototype.applyImpulse = function( j, r ) {
    return cp.bodyApplyImpulse( this.handle, j, r );
};

/* cpBodyDestroy( body ) */
cp.Body.prototype.destroy = function(  ) {
    return cp.bodyDestroy( this.handle );
};

/* cpBodyFree( body ) */
cp.Body.prototype.free = function(  ) {
    return cp.bodyFree( this.handle );
};

/* cpBodyGetAngVel( body ) */
cp.Body.prototype.getAngVel = function(  ) {
    return cp.bodyGetAngVel( this.handle );
};

/* cpBodyGetAngVelLimit( body ) */
cp.Body.prototype.getAngVelLimit = function(  ) {
    return cp.bodyGetAngVelLimit( this.handle );
};

/* cpBodyGetAngle( body ) */
cp.Body.prototype.getAngle = function(  ) {
    return cp.bodyGetAngle( this.handle );
};

/* cpBodyGetForce( body ) */
cp.Body.prototype.getForce = function(  ) {
    return cp.bodyGetForce( this.handle );
};

/* cpBodyGetMass( body ) */
cp.Body.prototype.getMass = function(  ) {
    return cp.bodyGetMass( this.handle );
};

/* cpBodyGetMoment( body ) */
cp.Body.prototype.getMoment = function(  ) {
    return cp.bodyGetMoment( this.handle );
};

/* cpBodyGetPos( body ) */
cp.Body.prototype.getPos = function(  ) {
    return cp.bodyGetPos( this.handle );
};

/* cpBodyGetRot( body ) */
cp.Body.prototype.getRot = function(  ) {
    return cp.bodyGetRot( this.handle );
};

/* cpBodyGetSpace( body ) */
cp.Body.prototype.getSpace = function(  ) {
    return cp.bodyGetSpace( this.handle );
};

/* cpBodyGetTorque( body ) */
cp.Body.prototype.getTorque = function(  ) {
    return cp.bodyGetTorque( this.handle );
};

/* cpBodyGetVel( body ) */
cp.Body.prototype.getVel = function(  ) {
    return cp.bodyGetVel( this.handle );
};

/* cpBodyGetVelAtLocalPoint( body, point ) */
cp.Body.prototype.getVelAtLocalPoint = function( point ) {
    return cp.bodyGetVelAtLocalPoint( this.handle, point );
};

/* cpBodyGetVelAtWorldPoint( body, point ) */
cp.Body.prototype.getVelAtWorldPoint = function( point ) {
    return cp.bodyGetVelAtWorldPoint( this.handle, point );
};

/* cpBodyGetVelLimit( body ) */
cp.Body.prototype.getVelLimit = function(  ) {
    return cp.bodyGetVelLimit( this.handle );
};

/* cpBodyInit( body, m, i ) */
cp.Body.prototype.init = function( m, i ) {
    return cp.bodyInit( this.handle, m, i );
};

/* cpBodyInitStatic( body ) */
cp.Body.prototype.initStatic = function(  ) {
    return cp.bodyInitStatic( this.handle );
};

/* cpBodyIsRogue( body ) */
cp.Body.prototype.isRogue = function(  ) {
    return cp.bodyIsRogue( this.handle );
};

/* cpBodyIsSleeping( body ) */
cp.Body.prototype.isSleeping = function(  ) {
    return cp.bodyIsSleeping( this.handle );
};

/* cpBodyIsStatic( body ) */
cp.Body.prototype.isStatic = function(  ) {
    return cp.bodyIsStatic( this.handle );
};

/* cpBodyKineticEnergy( body ) */
cp.Body.prototype.kineticEnergy = function(  ) {
    return cp.bodyKineticEnergy( this.handle );
};

/* cpBodyLocal2World( body, v ) */
cp.Body.prototype.local2World = function( v ) {
    return cp.bodyLocal2World( this.handle, v );
};

/* cpBodyResetForces( body ) */
cp.Body.prototype.resetForces = function(  ) {
    return cp.bodyResetForces( this.handle );
};

/* cpBodySetAngVel( body, value ) */
cp.Body.prototype.setAngVel = function( value ) {
    return cp.bodySetAngVel( this.handle, value );
};

/* cpBodySetAngVelLimit( body, value ) */
cp.Body.prototype.setAngVelLimit = function( value ) {
    return cp.bodySetAngVelLimit( this.handle, value );
};

/* cpBodySetAngle( body, a ) */
cp.Body.prototype.setAngle = function( a ) {
    return cp.bodySetAngle( this.handle, a );
};

/* cpBodySetForce( body, value ) */
cp.Body.prototype.setForce = function( value ) {
    return cp.bodySetForce( this.handle, value );
};

/* cpBodySetMass( body, m ) */
cp.Body.prototype.setMass = function( m ) {
    return cp.bodySetMass( this.handle, m );
};

/* cpBodySetMoment( body, i ) */
cp.Body.prototype.setMoment = function( i ) {
    return cp.bodySetMoment( this.handle, i );
};

/* cpBodySetPos( body, pos ) */
cp.Body.prototype.setPos = function( pos ) {
    return cp.bodySetPos( this.handle, pos );
};

/* cpBodySetTorque( body, value ) */
cp.Body.prototype.setTorque = function( value ) {
    return cp.bodySetTorque( this.handle, value );
};

/* cpBodySetVel( body, value ) */
cp.Body.prototype.setVel = function( value ) {
    return cp.bodySetVel( this.handle, value );
};

/* cpBodySetVelLimit( body, value ) */
cp.Body.prototype.setVelLimit = function( value ) {
    return cp.bodySetVelLimit( this.handle, value );
};

/* cpBodySleep( body ) */
cp.Body.prototype.sleep = function(  ) {
    return cp.bodySleep( this.handle );
};

/* cpBodySleepWithGroup( body, group ) */
cp.Body.prototype.sleepWithGroup = function( group ) {
    return cp.bodySleepWithGroup( this.handle, group );
};

/* cpBodyUpdatePosition( body, dt ) */
cp.Body.prototype.updatePosition = function( dt ) {
    return cp.bodyUpdatePosition( this.handle, dt );
};

/* cpBodyUpdateVelocity( body, gravity, damping, dt ) */
cp.Body.prototype.updateVelocity = function( gravity, damping, dt ) {
    return cp.bodyUpdateVelocity( this.handle, gravity, damping, dt );
};

/* cpBodyWorld2Local( body, v ) */
cp.Body.prototype.world2Local = function( v ) {
    return cp.bodyWorld2Local( this.handle, v );
};

/*----------------------
 *
 *       Joints
 *
 *----------------------*/

/* manually added */
cp.Constraint = function() {
    this.object = new cp._Constraint();
    this.handle = this.object.getHandle();
};

/* cpDampedRotarySpringNew( a, b, restAngle, stiffness, damping ) */
cp.DampedRotarySpring = function( a, b, restAngle, stiffness, damping ) {
    this.object = new cp._DampedRotarySpring( a, b, restAngle, stiffness, damping );
    this.handle = this.object.getHandle();
};

/* cpDampedSpringNew( a, b, anchr1, anchr2, restLength, stiffness, damping ) */
cp.DampedSpring = function( a, b, anchr1, anchr2, restLength, stiffness, damping ) {
    this.object = new cp._DampedSpring( a, b, anchr1, anchr2, restLength, stiffness, damping );
    this.handle = this.object.getHandle();
};

/* cpGearJointNew( a, b, phase, ratio ) */
cp.GearJoint = function( a, b, phase, ratio ) {
    this.object = new cp._GearJoint( a, b, phase, ratio );
    this.handle = this.object.getHandle();
};

/* cpGrooveJointNew( a, b, groove_a, groove_b, anchr2 ) */
cp.GrooveJoint = function( a, b, groove_a, groove_b, anchr2 ) {
    this.object = new cp._GrooveJoint( a, b, groove_a, groove_b, anchr2 );
    this.handle = this.object.getHandle();
};

/* cpPinJointNew( a, b, anchr1, anchr2 ) */
cp.PinJoint = function( a, b, anchr1, anchr2 ) {
    this.object = new cp._PinJoint( a, b, anchr1, anchr2 );
    this.handle = this.object.getHandle();
};

/* cpPivotJointNew( a, b, pivot ) */
cp.PivotJoint = function( a, b, pivot ) {
    this.object = new cp._PivotJoint( a, b, pivot );
    this.handle = this.object.getHandle();
};

/* cpPivotJointNew2( a, b, anchr1, anchr2 ) */
cp.PivotJoint = function( a, b, anchr1, anchr2 ) {
    this.object = new cp._PivotJoint( a, b, anchr1, anchr2 );
    this.handle = this.object.getHandle();
};

/* cpRatchetJointNew( a, b, phase, ratchet ) */
cp.RatchetJoint = function( a, b, phase, ratchet ) {
    this.object = new cp._RatchetJoint( a, b, phase, ratchet );
    this.handle = this.object.getHandle();
};

/* cpRotaryLimitJointNew( a, b, min, max ) */
cp.RotaryLimitJoint = function( a, b, min, max ) {
    this.object = new cp._RotaryLimitJoint( a, b, min, max );
    this.handle = this.object.getHandle();
};

/* cpSimpleMotorNew( a, b, rate ) */
cp.SimpleMotor = function( a, b, rate ) {
    this.object = new cp._SimpleMotor( a, b, rate );
    this.handle = this.object.getHandle();
};

/* cpSlideJointNew( a, b, anchr1, anchr2, min, max ) */
cp.SlideJoint = function( a, b, anchr1, anchr2, min, max ) {
    this.object = new cp._SlideJoint( a, b, anchr1, anchr2, min, max );
    this.handle = this.object.getHandle();
};

/* cpConstraintActivateBodies( constraint ) */
cp.Constraint.prototype.activateBodies = function(  ) {
    return cp.constraintActivateBodies( this.handle );
};

/* cpConstraintDestroy( constraint ) */
cp.Constraint.prototype.destroy = function(  ) {
    return cp.constraintDestroy( this.handle );
};

/* cpConstraintFree( constraint ) */
cp.Constraint.prototype.free = function(  ) {
    return cp.constraintFree( this.handle );
};

/* cpConstraintGetA( constraint ) */
cp.Constraint.prototype.getA = function(  ) {
    return cp.constraintGetA( this.handle );
};

/* cpConstraintGetB( constraint ) */
cp.Constraint.prototype.getB = function(  ) {
    return cp.constraintGetB( this.handle );
};

/* cpConstraintGetErrorBias( constraint ) */
cp.Constraint.prototype.getErrorBias = function(  ) {
    return cp.constraintGetErrorBias( this.handle );
};

/* cpConstraintGetImpulse( constraint ) */
cp.Constraint.prototype.getImpulse = function(  ) {
    return cp.constraintGetImpulse( this.handle );
};

/* cpConstraintGetMaxBias( constraint ) */
cp.Constraint.prototype.getMaxBias = function(  ) {
    return cp.constraintGetMaxBias( this.handle );
};

/* cpConstraintGetMaxForce( constraint ) */
cp.Constraint.prototype.getMaxForce = function(  ) {
    return cp.constraintGetMaxForce( this.handle );
};

/* cpConstraintGetSpace( constraint ) */
cp.Constraint.prototype.getSpace = function(  ) {
    return cp.constraintGetSpace( this.handle );
};

/* cpConstraintSetErrorBias( constraint, value ) */
cp.Constraint.prototype.setErrorBias = function( value ) {
    return cp.constraintSetErrorBias( this.handle, value );
};

/* cpConstraintSetMaxBias( constraint, value ) */
cp.Constraint.prototype.setMaxBias = function( value ) {
    return cp.constraintSetMaxBias( this.handle, value );
};

/* cpConstraintSetMaxForce( constraint, value ) */
cp.Constraint.prototype.setMaxForce = function( value ) {
    return cp.constraintSetMaxForce( this.handle, value );
};

/* cpDampedRotarySpringGetDamping( constraint ) */
cp.DampedRotarySpring.prototype.getDamping = function(  ) {
    return cp.dampedRotarySpringGetDamping( this.handle );
};

/* cpDampedRotarySpringGetRestAngle( constraint ) */
cp.DampedRotarySpring.prototype.getRestAngle = function(  ) {
    return cp.dampedRotarySpringGetRestAngle( this.handle );
};

/* cpDampedRotarySpringGetStiffness( constraint ) */
cp.DampedRotarySpring.prototype.getStiffness = function(  ) {
    return cp.dampedRotarySpringGetStiffness( this.handle );
};

/* cpDampedRotarySpringSetDamping( constraint, value ) */
cp.DampedRotarySpring.prototype.setDamping = function( value ) {
    return cp.dampedRotarySpringSetDamping( this.handle, value );
};

/* cpDampedRotarySpringSetRestAngle( constraint, value ) */
cp.DampedRotarySpring.prototype.setRestAngle = function( value ) {
    return cp.dampedRotarySpringSetRestAngle( this.handle, value );
};

/* cpDampedRotarySpringSetStiffness( constraint, value ) */
cp.DampedRotarySpring.prototype.setStiffness = function( value ) {
    return cp.dampedRotarySpringSetStiffness( this.handle, value );
};

/* cpDampedSpringGetAnchr1( constraint ) */
cp.DampedSpring.prototype.getAnchr1 = function(  ) {
    return cp.dampedSpringGetAnchr1( this.handle );
};

/* cpDampedSpringGetAnchr2( constraint ) */
cp.DampedSpring.prototype.getAnchr2 = function(  ) {
    return cp.dampedSpringGetAnchr2( this.handle );
};

/* cpDampedSpringGetDamping( constraint ) */
cp.DampedSpring.prototype.getDamping = function(  ) {
    return cp.dampedSpringGetDamping( this.handle );
};

/* cpDampedSpringGetRestLength( constraint ) */
cp.DampedSpring.prototype.getRestLength = function(  ) {
    return cp.dampedSpringGetRestLength( this.handle );
};

/* cpDampedSpringGetStiffness( constraint ) */
cp.DampedSpring.prototype.getStiffness = function(  ) {
    return cp.dampedSpringGetStiffness( this.handle );
};

/* cpDampedSpringSetAnchr1( constraint, value ) */
cp.DampedSpring.prototype.setAnchr1 = function( value ) {
    return cp.dampedSpringSetAnchr1( this.handle, value );
};

/* cpDampedSpringSetAnchr2( constraint, value ) */
cp.DampedSpring.prototype.setAnchr2 = function( value ) {
    return cp.dampedSpringSetAnchr2( this.handle, value );
};

/* cpDampedSpringSetDamping( constraint, value ) */
cp.DampedSpring.prototype.setDamping = function( value ) {
    return cp.dampedSpringSetDamping( this.handle, value );
};

/* cpDampedSpringSetRestLength( constraint, value ) */
cp.DampedSpring.prototype.setRestLength = function( value ) {
    return cp.dampedSpringSetRestLength( this.handle, value );
};

/* cpDampedSpringSetStiffness( constraint, value ) */
cp.DampedSpring.prototype.setStiffness = function( value ) {
    return cp.dampedSpringSetStiffness( this.handle, value );
};

/* cpGearJointGetPhase( constraint ) */
cp.GearJoint.prototype.getPhase = function(  ) {
    return cp.gearJointGetPhase( this.handle );
};

/* cpGearJointGetRatio( constraint ) */
cp.GearJoint.prototype.getRatio = function(  ) {
    return cp.gearJointGetRatio( this.handle );
};

/* cpGearJointSetPhase( constraint, value ) */
cp.GearJoint.prototype.setPhase = function( value ) {
    return cp.gearJointSetPhase( this.handle, value );
};

/* cpGearJointSetRatio( constraint, value ) */
cp.GearJoint.prototype.setRatio = function( value ) {
    return cp.gearJointSetRatio( this.handle, value );
};

/* cpGrooveJointGetAnchr2( constraint ) */
cp.GrooveJoint.prototype.getAnchr2 = function(  ) {
    return cp.grooveJointGetAnchr2( this.handle );
};

/* cpGrooveJointGetGrooveA( constraint ) */
cp.GrooveJoint.prototype.getGrooveA = function(  ) {
    return cp.grooveJointGetGrooveA( this.handle );
};

/* cpGrooveJointGetGrooveB( constraint ) */
cp.GrooveJoint.prototype.getGrooveB = function(  ) {
    return cp.grooveJointGetGrooveB( this.handle );
};

/* cpGrooveJointSetAnchr2( constraint, value ) */
cp.GrooveJoint.prototype.setAnchr2 = function( value ) {
    return cp.grooveJointSetAnchr2( this.handle, value );
};

/* cpGrooveJointSetGrooveA( constraint, value ) */
cp.GrooveJoint.prototype.setGrooveA = function( value ) {
    return cp.grooveJointSetGrooveA( this.handle, value );
};

/* cpGrooveJointSetGrooveB( constraint, value ) */
cp.GrooveJoint.prototype.setGrooveB = function( value ) {
    return cp.grooveJointSetGrooveB( this.handle, value );
};

/* cpPinJointGetAnchr1( constraint ) */
cp.PinJoint.prototype.getAnchr1 = function(  ) {
    return cp.pinJointGetAnchr1( this.handle );
};

/* cpPinJointGetAnchr2( constraint ) */
cp.PinJoint.prototype.getAnchr2 = function(  ) {
    return cp.pinJointGetAnchr2( this.handle );
};

/* cpPinJointGetDist( constraint ) */
cp.PinJoint.prototype.getDist = function(  ) {
    return cp.pinJointGetDist( this.handle );
};

/* cpPinJointSetAnchr1( constraint, value ) */
cp.PinJoint.prototype.setAnchr1 = function( value ) {
    return cp.pinJointSetAnchr1( this.handle, value );
};

/* cpPinJointSetAnchr2( constraint, value ) */
cp.PinJoint.prototype.setAnchr2 = function( value ) {
    return cp.pinJointSetAnchr2( this.handle, value );
};

/* cpPinJointSetDist( constraint, value ) */
cp.PinJoint.prototype.setDist = function( value ) {
    return cp.pinJointSetDist( this.handle, value );
};

/* cpPivotJointGetAnchr1( constraint ) */
cp.PivotJoint.prototype.getAnchr1 = function(  ) {
    return cp.pivotJointGetAnchr1( this.handle );
};

/* cpPivotJointGetAnchr2( constraint ) */
cp.PivotJoint.prototype.getAnchr2 = function(  ) {
    return cp.pivotJointGetAnchr2( this.handle );
};

/* cpPivotJointSetAnchr1( constraint, value ) */
cp.PivotJoint.prototype.setAnchr1 = function( value ) {
    return cp.pivotJointSetAnchr1( this.handle, value );
};

/* cpPivotJointSetAnchr2( constraint, value ) */
cp.PivotJoint.prototype.setAnchr2 = function( value ) {
    return cp.pivotJointSetAnchr2( this.handle, value );
};
/* cpRatchetJointGetAngle( constraint ) */
cp.RatchetJoint.prototype.getAngle = function(  ) {
    return cp.ratchetJointGetAngle( this.handle );
};

/* cpRatchetJointGetPhase( constraint ) */
cp.RatchetJoint.prototype.getPhase = function(  ) {
    return cp.ratchetJointGetPhase( this.handle );
};

/* cpRatchetJointGetRatchet( constraint ) */
cp.RatchetJoint.prototype.getRatchet = function(  ) {
    return cp.ratchetJointGetRatchet( this.handle );
};

/* cpRatchetJointSetAngle( constraint, value ) */
cp.RatchetJoint.prototype.setAngle = function( value ) {
    return cp.ratchetJointSetAngle( this.handle, value );
};

/* cpRatchetJointSetPhase( constraint, value ) */
cp.RatchetJoint.prototype.setPhase = function( value ) {
    return cp.ratchetJointSetPhase( this.handle, value );
};

/* cpRatchetJointSetRatchet( constraint, value ) */
cp.RatchetJoint.prototype.setRatchet = function( value ) {
    return cp.ratchetJointSetRatchet( this.handle, value );
};

/* cpRotaryLimitJointGetMax( constraint ) */
cp.RotaryLimitJoint.prototype.getMax = function(  ) {
    return cp.rotaryLimitJointGetMax( this.handle );
};

/* cpRotaryLimitJointGetMin( constraint ) */
cp.RotaryLimitJoint.prototype.getMin = function(  ) {
    return cp.rotaryLimitJointGetMin( this.handle );
};

/* cpRotaryLimitJointSetMax( constraint, value ) */
cp.RotaryLimitJoint.prototype.setMax = function( value ) {
    return cp.rotaryLimitJointSetMax( this.handle, value );
};

/* cpRotaryLimitJointSetMin( constraint, value ) */
cp.RotaryLimitJoint.prototype.setMin = function( value ) {
    return cp.rotaryLimitJointSetMin( this.handle, value );
};

/* cpSimpleMotorGetRate( constraint ) */
cp.SimpleMotor.prototype.getRate = function(  ) {
    return cp.simpleMotorGetRate( this.handle );
};

/* cpSimpleMotorSetRate( constraint, value ) */
cp.SimpleMotor.prototype.setRate = function( value ) {
    return cp.simpleMotorSetRate( this.handle, value );
};

/* cpSlideJointGetAnchr1( constraint ) */
cp.SlideJoint.prototype.getAnchr1 = function(  ) {
    return cp.slideJointGetAnchr1( this.handle );
};

/* cpSlideJointGetAnchr2( constraint ) */
cp.SlideJoint.prototype.getAnchr2 = function(  ) {
    return cp.slideJointGetAnchr2( this.handle );
};

/* cpSlideJointGetMax( constraint ) */
cp.SlideJoint.prototype.getMax = function(  ) {
    return cp.slideJointGetMax( this.handle );
};

/* cpSlideJointGetMin( constraint ) */
cp.SlideJoint.prototype.getMin = function(  ) {
    return cp.slideJointGetMin( this.handle );
};

/* cpSlideJointSetAnchr1( constraint, value ) */
cp.SlideJoint.prototype.setAnchr1 = function( value ) {
    return cp.slideJointSetAnchr1( this.handle, value );
};

/* cpSlideJointSetAnchr2( constraint, value ) */
cp.SlideJoint.prototype.setAnchr2 = function( value ) {
    return cp.slideJointSetAnchr2( this.handle, value );
};

/* cpSlideJointSetMax( constraint, value ) */
cp.SlideJoint.prototype.setMax = function( value ) {
    return cp.slideJointSetMax( this.handle, value );
};

/* cpSlideJointSetMin( constraint, value ) */
cp.SlideJoint.prototype.setMin = function( value ) {
    return cp.slideJointSetMin( this.handle, value );
};

/*----------------------
 *
 *       Shape
 *
 *----------------------*/

// "handle" constructor
cp.Shape = function(handle) {
    this.handle = handle;
};

// Shape Properties
/* cpShapeGetBB( shape ) */
cp.Shape.prototype.getBB = function(  ) {
    return cp.shapeGetBB( this.handle );
};

/* cpShapeGetBody( shape ) */
cp.Shape.prototype.getBody = function(  ) {
    return cp.shapeGetBody( this.handle );
};

/* cpShapeGetCollisionType( shape ) */
cp.Shape.prototype.getCollisionType = function(  ) {
    return cp.shapeGetCollisionType( this.handle );
};

/* cpShapeGetElasticity( shape ) */
cp.Shape.prototype.getElasticity = function(  ) {
    return cp.shapeGetElasticity( this.handle );
};

/* cpShapeGetFriction( shape ) */
cp.Shape.prototype.getFriction = function(  ) {
    return cp.shapeGetFriction( this.handle );
};

/* cpShapeGetGroup( shape ) */
cp.Shape.prototype.getGroup = function(  ) {
    return cp.shapeGetGroup( this.handle );
};

/* cpShapeGetLayers( shape ) */
cp.Shape.prototype.getLayers = function(  ) {
    return cp.shapeGetLayers( this.handle );
};

/* cpShapeGetSensor( shape ) */
cp.Shape.prototype.getSensor = function(  ) {
    return cp.shapeGetSensor( this.handle );
};

/* cpShapeGetSpace( shape ) */
cp.Shape.prototype.getSpace = function(  ) {
    return cp.shapeGetSpace( this.handle );
};

/* cpShapeGetSurfaceVelocity( shape ) */
cp.Shape.prototype.getSurfaceVelocity = function(  ) {
    return cp.shapeGetSurfaceVelocity( this.handle );
};

/* cpShapePointQuery( shape, p ) */
cp.Shape.prototype.pointQuery = function( p ) {
    return cp.shapePointQuery( this.handle, p );
};

/* cpShapeSetBody( shape, body ) */
cp.Shape.prototype.setBody = function( body ) {
    return cp.shapeSetBody( this.handle, body );
};

/* cpShapeSetCollisionType( shape, value ) */
cp.Shape.prototype.setCollisionType = function( value ) {
    return cp.shapeSetCollisionType( this.handle, value );
};

/* cpShapeSetElasticity( shape, value ) */
cp.Shape.prototype.setElasticity = function( value ) {
    return cp.shapeSetElasticity( this.handle, value );
};

/* cpShapeSetFriction( shape, value ) */
cp.Shape.prototype.setFriction = function( value ) {
    return cp.shapeSetFriction( this.handle, value );
};

/* cpShapeSetGroup( shape, value ) */
cp.Shape.prototype.setGroup = function( value ) {
    return cp.shapeSetGroup( this.handle, value );
};

/* cpShapeSetLayers( shape, value ) */
cp.Shape.prototype.setLayers = function( value ) {
    return cp.shapeSetLayers( this.handle, value );
};

/* cpShapeSetSensor( shape, value ) */
cp.Shape.prototype.setSensor = function( value ) {
    return cp.shapeSetSensor( this.handle, value );
};

/* cpShapeSetSurfaceVelocity( shape, value ) */
cp.Shape.prototype.setSurfaceVelocity = function( value ) {
    return cp.shapeSetSurfaceVelocity( this.handle, value );
};

/* cpShapeUpdate( shape, pos, rot ) */
cp.Shape.prototype.update = function( pos, rot ) {
    return cp.shapeUpdate( this.handle, pos, rot );
};

//
// Poly Shape
//

/* manually added: cpShape* cpPolyShapeNew(cpBody *body, int numVerts, cpVect *verts, cpVect offset); */
cp.PolyShape = function( body, verts, offset ) {
    this.object = new cp._PolyShape( body.handle, verts, offset );
    this.handle = this.object.getHandle();
};

cp.PolyShape.prototype = Object.create(cp.Shape.prototype);

/* cpPolyShapeGetNumVerts( shape ) */
cp.PolyShape.prototype.getNumVerts = function(  ) {
    return cp.polyShapeGetNumVerts( this.handle );
};

/* cpPolyShapeGetVert( shape, idx ) */
cp.PolyShape.prototype.getVert = function( idx ) {
    return cp.polyShapeGetVert( this.handle, idx );
};

//
// Segment Shape
//

/* cpSegmentShapeNew( body, a, b, radius ) */
cp.SegmentShape = function( body, a, b, radius ) {
    this.object = new cp._SegmentShape( body.handle, a, b, radius );
    this.handle = this.object.getHandle();
};
cp.SegmentShape.prototype = Object.create(cp.Shape.prototype);

/* cpSegmentShapeGetA( shape ) */
cp.SegmentShape.prototype.getA = function(  ) {
    return cp.segmentShapeGetA( this.handle );
};

/* cpSegmentShapeGetB( shape ) */
cp.SegmentShape.prototype.getB = function(  ) {
    return cp.segmentShapeGetB( this.handle );
};

/* cpSegmentShapeGetNormal( shape ) */
cp.SegmentShape.prototype.getNormal = function(  ) {
    return cp.segmentShapeGetNormal( this.handle );
};

/* cpSegmentShapeGetRadius( shape ) */
cp.SegmentShape.prototype.getRadius = function(  ) {
    return cp.segmentShapeGetRadius( this.handle );
};

/* cpSegmentShapeSetNeighbors( shape, prev, next ) */
cp.SegmentShape.prototype.setNeighbors = function( prev, next ) {
    return cp.segmentShapeSetNeighbors( this.handle, prev, next );
};

//
// Box Shape
//

 /* cpBoxShapeNew( body, width, height ) */
cp.BoxShape = function( body, width, height ) {
    this.object = new cp._BoxShape( body.handle, width, height );
    this.handle = this.object.getHandle();
};
cp.BoxShape.prototype = Object.create(cp.Shape.prototype);

/* cpBoxShapeNew2( body, box ) */
cp.BoxShapeXXXFIXMEXXX = function( body, box ) {
    this.object = new cp._BoxShape( body, box );
    this.handle = this.object.getHandle();
};

//
// Circle Shape
//

/* cpCircleShapeNew( body, radius, offset ) */
cp.CircleShape = function( body, radius, offset ) {
    this.object = new cp._CircleShape( body.handle, radius, offset );
    this.handle = this.object.getHandle();
};
cp.CircleShape.prototype = Object.create(cp.Shape.prototype);


/* cpCircleShapeGetOffset( shape ) */
cp.CircleShape.prototype.getOffset = function(  ) {
    return cp.circleShapeGetOffset( this.handle );
};

/* cpCircleShapeGetRadius( shape ) */
cp.CircleShape.prototype.getRadius = function(  ) {
    return cp.circleShapeGetRadius( this.handle );
};

/*----------------------
 *
 *       Space
 *
 *----------------------*/

 /* cpSpaceNew() */
cp.Space = function(  ) {
    this.object = new cp._Space();
    this.handle = this.object.getHandle();

    // internals
    this.static_body = null;
};

// For compatibility with Chipmunk-JS
Object.defineProperty(cp.Space.prototype, "gravity", {
						get : function(){
                            return this.getGravity();
                        },
						set : function(newValue){
                            this.setGravity(newValue);
                        },
                    enumerable : true,
                    configurable : true});

cp.Space.prototype.addCollisionHandler = function( typeA, typeB, self, cbBegin, cbPre, cbPost, cbSep ) {
    
    function CBBegin(cbBegin, self) {
        return function(na, ns) {
            var a = new cp.Arbiter( na );
            cbBegin.apply(self, [a, self]);
        };
    }

    function CBPre(cbPre, self) {
        return function(na, ns) {
            var a = new cp.Arbiter( na );
            cbPre.apply(self, [a, self]);
        };
    }

    function CBPost(cbPost, self) {
        return function(na, ns) {
            var a = new cp.Arbiter( na );
            cbPost.apply(self, [a, self]);
        };
    }

    function CBSep(cbSep, self) {
        return function(na, ns) {
            var a = new cp.Arbiter( na );
            cbSep.apply(self, [a, self]);
        };
    }

    var cb_begin = CBBegin(cbBegin, self);
    var cb_pre = CBPre(cbPre, self);
    var cb_post = CBPost(cbPost, self);
    var cb_sep = CBSep(cbSep, self);

    return cp.spaceAddCollisionHandler( this.handle, typeA, typeB, this, cb_begin, cb_pre, cb_post, cb_sep);
};

/* manually wrapped in C */
cp.Space.prototype.removeCollisionHandler = function( typeA, typeB ) {
	return cp.spaceRemoveCollisionHandler( this.handle, typeA, typeB );
};

/* cpSpaceActivateShapesTouchingShape( space, shape ) */
cp.Space.prototype.activateShapesTouchingShape = function( shape ) {
    return cp.spaceActivateShapesTouchingShape( this.handle, shape.handle );
};

/* cpSpaceAddBody( space, body ) */
cp.Space.prototype.addBody = function( body ) {
    return cp.spaceAddBody( this.handle, body.handle );
};

/* cpSpaceAddConstraint( space, constraint ) */
cp.Space.prototype.addConstraint = function( constraint ) {
    return cp.spaceAddConstraint( this.handle, constraint.handle );
};

/* cpSpaceAddShape( space, shape ) */
cp.Space.prototype.addShape = function( shape ) {
    return cp.spaceAddShape( this.handle, shape.handle );
};

/* cpSpaceAddStaticShape( space, shape ) */
cp.Space.prototype.addStaticShape = function( shape ) {
    return cp.spaceAddStaticShape( this.handle, shape.handle );
};

/* cpSpaceAlloc(  ) */
cp.Space.prototype.alloc = function(  ) {
    return cp.spaceAlloc( this.handle );
};

/* cpSpaceContainsBody( space, body ) */
cp.Space.prototype.containsBody = function( body ) {
    return cp.spaceContainsBody( this.handle, body.handle );
};

/* cpSpaceContainsConstraint( space, constraint ) */
cp.Space.prototype.containsConstraint = function( constraint ) {
    return cp.spaceContainsConstraint( this.handle, constraint.handle );
};

/* cpSpaceContainsShape( space, shape ) */
cp.Space.prototype.containsShape = function( shape ) {
    return cp.spaceContainsShape( this.handle, shape.handle );
};

/* cpSpaceDestroy( space ) */
cp.Space.prototype.destroy = function(  ) {
    return cp.spaceDestroy( this.handle );
};

/* cpSpaceFree( space ) */
cp.Space.prototype.free = function(  ) {
    return cp.spaceFree( this.handle );
};

/* cpSpaceGetCollisionBias( space ) */
cp.Space.prototype.getCollisionBias = function(  ) {
    return cp.spaceGetCollisionBias( this.handle );
};

/* cpSpaceGetCollisionPersistence( space ) */
cp.Space.prototype.getCollisionPersistence = function(  ) {
    return cp.spaceGetCollisionPersistence( this.handle );
};

/* cpSpaceGetCollisionSlop( space ) */
cp.Space.prototype.getCollisionSlop = function(  ) {
    return cp.spaceGetCollisionSlop( this.handle );
};

/* cpSpaceGetCurrentTimeStep( space ) */
cp.Space.prototype.getCurrentTimeStep = function(  ) {
    return cp.spaceGetCurrentTimeStep( this.handle );
};

/* cpSpaceGetDamping( space ) */
cp.Space.prototype.getDamping = function(  ) {
    return cp.spaceGetDamping( this.handle );
};

/* cpSpaceGetEnableContactGraph( space ) */
cp.Space.prototype.getEnableContactGraph = function(  ) {
    return cp.spaceGetEnableContactGraph( this.handle );
};

/* cpSpaceGetGravity( space ) */
cp.Space.prototype.getGravity = function(  ) {
    return cp.spaceGetGravity( this.handle );
};

/* cpSpaceGetIdleSpeedThreshold( space ) */
cp.Space.prototype.getIdleSpeedThreshold = function(  ) {
    return cp.spaceGetIdleSpeedThreshold( this.handle );
};

/* cpSpaceGetIterations( space ) */
cp.Space.prototype.getIterations = function(  ) {
    return cp.spaceGetIterations( this.handle );
};

/* cpSpaceGetSleepTimeThreshold( space ) */
cp.Space.prototype.getSleepTimeThreshold = function(  ) {
    return cp.spaceGetSleepTimeThreshold( this.handle );
};

/* cpSpaceGetStaticBody( space ) */
cp.Space.prototype.getStaticBody = function(  ) {
    if( this.static_body === null ) {

        var handle = cp.spaceGetStaticBody( this.handle );
        this.static_body = new cp.Body(handle);
    }
    return this.static_body;
};

/* cpSpaceInit( space ) */
cp.Space.prototype.init = function(  ) {
    return cp.spaceInit( this.handle );
};

/* cpSpaceIsLocked( space ) */
cp.Space.prototype.isLocked = function(  ) {
    return cp.spaceIsLocked( this.handle );
};

/* cpSpacePointQueryFirst( space, point, layers, group ) */
cp.Space.prototype.pointQueryFirst = function( point, layers, group ) {
    return cp.spacePointQueryFirst( this.handle, point, layers, group );
};

/* cpSpaceReindexShape( space, shape ) */
cp.Space.prototype.reindexShape = function( shape ) {
    return cp.spaceReindexShape( this.handle, shape );
};

/* cpSpaceReindexShapesForBody( space, body ) */
cp.Space.prototype.reindexShapesForBody = function( body ) {
    return cp.spaceReindexShapesForBody( this.handle, body );
};

/* cpSpaceReindexStatic( space ) */
cp.Space.prototype.reindexStatic = function(  ) {
    return cp.spaceReindexStatic( this.handle );
};

/* cpSpaceRemoveBody( space, body ) */
cp.Space.prototype.removeBody = function( body ) {
    return cp.spaceRemoveBody( this.handle, body );
};

/* cpSpaceRemoveConstraint( space, constraint ) */
cp.Space.prototype.removeConstraint = function( constraint ) {
    return cp.spaceRemoveConstraint( this.handle, constraint );
};

/* cpSpaceRemoveShape( space, shape ) */
cp.Space.prototype.removeShape = function( shape ) {
    return cp.spaceRemoveShape( this.handle, shape );
};

/* cpSpaceRemoveStaticShape( space, shape ) */
cp.Space.prototype.removeStaticShape = function( shape ) {
    return cp.spaceRemoveStaticShape( this.handle, shape );
};

/* cpSpaceSetCollisionBias( space, value ) */
cp.Space.prototype.setCollisionBias = function( value ) {
    return cp.spaceSetCollisionBias( this.handle, value );
};

/* cpSpaceSetCollisionPersistence( space, value ) */
cp.Space.prototype.setCollisionPersistence = function( value ) {
    return cp.spaceSetCollisionPersistence( this.handle, value );
};

/* cpSpaceSetCollisionSlop( space, value ) */
cp.Space.prototype.setCollisionSlop = function( value ) {
    return cp.spaceSetCollisionSlop( this.handle, value );
};

/* cpSpaceSetDamping( space, value ) */
cp.Space.prototype.setDamping = function( value ) {
    return cp.spaceSetDamping( this.handle, value );
};

/* cpSpaceSetEnableContactGraph( space, value ) */
cp.Space.prototype.setEnableContactGraph = function( value ) {
    return cp.spaceSetEnableContactGraph( this.handle, value );
};

/* cpSpaceSetGravity( space, value ) */
cp.Space.prototype.setGravity = function( value ) {
    return cp.spaceSetGravity( this.handle, value );
};

/* cpSpaceSetIdleSpeedThreshold( space, value ) */
cp.Space.prototype.setIdleSpeedThreshold = function( value ) {
    return cp.spaceSetIdleSpeedThreshold( this.handle, value );
};

/* cpSpaceSetIterations( space, value ) */
cp.Space.prototype.setIterations = function( value ) {
    return cp.spaceSetIterations( this.handle, value );
};

/* cpSpaceSetSleepTimeThreshold( space, value ) */
cp.Space.prototype.setSleepTimeThreshold = function( value ) {
    return cp.spaceSetSleepTimeThreshold( this.handle, value );
};

/* cpSpaceStep( space, dt ) */
cp.Space.prototype.step = function( dt ) {
    return cp.spaceStep( this.handle, dt );
};

/* cpSpaceUseSpatialHash( space, dim, count ) */
cp.Space.prototype.useSpatialHash = function( dim, count ) {
    return cp.spaceUseSpatialHash( this.handle, dim, count );
};


/*----------------------
 *
 *       Arbiter
 *
 *----------------------*/

cp.Arbiter = function( handle ) {
    this.object = new cp._Base( handle );
    this.handle = handle;
};

cp.Arbiter.prototype.getBodies = function(  ) {
    var bodies = cp.arbiterGetBodies( this.handle );
    // convert "handles" to objects
    return [ new cp.Body(bodies[0]), new cp.Body(bodies[1]) ];
};

cp.Arbiter.prototype.getShapes = function(  ) {
    var shapes = cp.arbiterGetShapes( this.handle );
    // convert "handles" to objects
    return [ new cp.Shape(shapes[0]), new cp.Shape(shapes[1]) ];
};

/* cpArbiterGetCount( arb ) */
cp.Arbiter.prototype.getCount = function(  ) {
    return cp.arbiterGetCount( this.handle );
};

/* cpArbiterGetDepth( arb, i ) */
cp.Arbiter.prototype.getDepth = function( i ) {
    return cp.arbiterGetDepth( this.handle, i );
};

/* cpArbiterGetElasticity( arb ) */
cp.Arbiter.prototype.getElasticity = function(  ) {
    return cp.arbiterGetElasticity( this.handle );
};

/* cpArbiterGetFriction( arb ) */
cp.Arbiter.prototype.getFriction = function(  ) {
    return cp.arbiterGetFriction( this.handle );
};

/* cpArbiterGetNormal( arb, i ) */
cp.Arbiter.prototype.getNormal = function( i ) {
    return cp.arbiterGetNormal( this.handle, i );
};

/* cpArbiterGetPoint( arb, i ) */
cp.Arbiter.prototype.getPoint = function( i ) {
    return cp.arbiterGetPoint( this.handle, i );
};

/* cpArbiterGetSurfaceVelocity( arb ) */
cp.Arbiter.prototype.getSurfaceVelocity = function(  ) {
    return cp.arbiterGetSurfaceVelocity( this.handle );
};

/* cpArbiterIgnore( arb ) */
cp.Arbiter.prototype.ignore = function(  ) {
    return cp.arbiterIgnore( this.handle );
};

/* cpArbiterIsFirstContact( arb ) */
cp.Arbiter.prototype.isFirstContact = function(  ) {
    return cp.arbiterIsFirstContact( this.handle );
};

/* cpArbiterSetElasticity( arb, value ) */
cp.Arbiter.prototype.setElasticity = function( value ) {
    return cp.arbiterSetElasticity( this.handle, value );
};

/* cpArbiterSetFriction( arb, value ) */
cp.Arbiter.prototype.setFriction = function( value ) {
    return cp.arbiterSetFriction( this.handle, value );
};

/* cpArbiterSetSurfaceVelocity( arb, value ) */
cp.Arbiter.prototype.setSurfaceVelocity = function( value ) {
    return cp.arbiterSetSurfaceVelocity( this.handle, value );
};

/* cpArbiterTotalImpulse( arb ) */
cp.Arbiter.prototype.totalImpulse = function(  ) {
    return cp.arbiterTotalImpulse( this.handle );
};

/* cpArbiterTotalImpulseWithFriction( arb ) */
cp.Arbiter.prototype.totalImpulseWithFriction = function(  ) {
    return cp.arbiterTotalImpulseWithFriction( this.handle );
};

/* cpArbiterTotalKE( arb ) */
cp.Arbiter.prototype.totalKE = function(  ) {
    return cp.arbiterTotalKE( this.handle );
};
