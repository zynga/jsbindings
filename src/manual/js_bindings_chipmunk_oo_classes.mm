/*
 * Chipmunk Object Oritned API
 * Manually generated
 */

#import "js_bindings_config.h"
#ifdef JSB_INCLUDE_CHIPMUNK

#import "jsfriendapi.h"
#import "js_bindings_config.h"
#import "js_bindings_core.h"
#import "js_bindings_basic_conversions.h"

/*
 * Chipmunk Base Object
 */

JSClass* JSB_cpBase_class = NULL;
JSObject* JSB_cpBase_object = NULL;
// Constructor
JSBool JSB_cpBase_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSB_PRECONDITION( argc==1, "Invalid arguments. Expecting 1");
	
	JSObject *jsobj = JS_NewObject(cx, JSB_cpBase_class, JSB_cpBase_object, NULL);
	
	jsval *argvp = JS_ARGV(cx,vp);
	JSBool ok = JS_TRUE;
	
	void *handle = NULL;
	
	ok = jsval_to_opaque(cx, *argvp++, &handle);

	JSB_PRECONDITION(ok, "Error converting arguments for JSB_cpBase_constructor");
	
	JS_SetPrivate(jsobj, handle);
	
	JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(jsobj));
	return JS_TRUE;
}

// Destructor
void JSB_cpBase_finalize(JSFreeOp *fop, JSObject *obj)
{
	CCLOGINFO(@"jsbindings: finalizing JS object %p (cpBase)", obj);
	
	// should not delete the handle since it was manually added
}

JSBool JSB_cpBase_getHandle(JSContext *cx, uint32_t argc, jsval *vp)
{	
	JSObject* jsthis = (JSObject *)JS_THIS_OBJECT(cx, vp);
	JSB_PRECONDITION( jsthis, "Invalid jsthis object");

	void *handle = JS_GetPrivate(jsthis);
	JSB_PRECONDITION( handle, "Invalid private object");
	
	jsval ret_val = opaque_to_jsval(cx, handle);
	JS_SET_RVAL(cx, vp, ret_val);
	return JS_TRUE;
}

JSBool JSB_cpBase_setHandle(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject* jsthis = (JSObject *)JS_THIS_OBJECT(cx, vp);
	JSB_PRECONDITION( jsthis, "Invalid jsthis object");

	JSB_PRECONDITION( argc==1, "Invalid arguments. Expecting 1");
	
	jsval *argvp = JS_ARGV(cx,vp);
	
	void *handle;
	JSBool ok = jsval_to_opaque(cx, *argvp++, &handle);
	JSB_PRECONDITION( ok, "Invalid parsing arguments");

	JS_SetPrivate(jsthis, handle);
	
	JS_SET_RVAL(cx, vp, JSVAL_VOID);
	return JS_TRUE;
}


void JSB_cpBase_createClass(JSContext *cx, JSObject* globalObj, const char* name )
{
	JSB_cpBase_class = (JSClass *)calloc(1, sizeof(JSClass));
	JSB_cpBase_class->name = name;
	JSB_cpBase_class->addProperty = JS_PropertyStub;
	JSB_cpBase_class->delProperty = JS_PropertyStub;
	JSB_cpBase_class->getProperty = JS_PropertyStub;
	JSB_cpBase_class->setProperty = JS_StrictPropertyStub;
	JSB_cpBase_class->enumerate = JS_EnumerateStub;
	JSB_cpBase_class->resolve = JS_ResolveStub;
	JSB_cpBase_class->convert = JS_ConvertStub;
	JSB_cpBase_class->finalize = JSB_cpBase_finalize;
	JSB_cpBase_class->flags = JSCLASS_HAS_PRIVATE;
	
	static JSPropertySpec properties[] = {
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_FN("getHandle", JSB_cpBase_getHandle, 0, JSPROP_PERMANENT | JSPROP_SHARED | JSPROP_ENUMERATE),
		JS_FN("setHandle", JSB_cpBase_setHandle, 1, JSPROP_PERMANENT | JSPROP_SHARED | JSPROP_ENUMERATE),
		JS_FS_END
	};
	static JSFunctionSpec st_funcs[] = {
		JS_FS_END
	};
	
	JSB_cpBase_object = JS_InitClass(cx, globalObj, NULL, JSB_cpBase_class, JSB_cpBase_constructor,0,properties,funcs,NULL,st_funcs);
}



/*
 * cpSpace
 */
#pragma mark - cpSpace

JSClass* JSB_cpSpace_class = NULL;
JSObject* JSB_cpSpace_object = NULL;
// Constructor
JSBool JSB_cpSpace_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *jsobj = JS_NewObject(cx, JSB_cpSpace_class, JSB_cpSpace_object, NULL);
	cpSpace *handle = cpSpaceNew();
	JS_SetPrivate(jsobj, handle);

	JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(jsobj));
	return JS_TRUE;
}

// Destructor
void JSB_cpSpace_finalize(JSFreeOp *fop, JSObject *obj)
{
	CCLOGINFO(@"jsbindings: finalizing JS object %p (cpSpace)", obj);
	void *handle = JS_GetPrivate(obj);
	NSCAssert( handle, @"Invalid handle for cpSapce");

	cpSpaceFree( (cpSpace*)handle);
}

void JSB_cpSpace_createClass(JSContext *cx, JSObject* globalObj, const char* name )
{
	JSB_cpSpace_class = (JSClass *)calloc(1, sizeof(JSClass));
	JSB_cpSpace_class->name = name;
	JSB_cpSpace_class->addProperty = JS_PropertyStub;
	JSB_cpSpace_class->delProperty = JS_PropertyStub;
	JSB_cpSpace_class->getProperty = JS_PropertyStub;
	JSB_cpSpace_class->setProperty = JS_StrictPropertyStub;
	JSB_cpSpace_class->enumerate = JS_EnumerateStub;
	JSB_cpSpace_class->resolve = JS_ResolveStub;
	JSB_cpSpace_class->convert = JS_ConvertStub;
	JSB_cpSpace_class->finalize = JSB_cpSpace_finalize;
	JSB_cpSpace_class->flags = JSCLASS_HAS_PRIVATE;

	static JSPropertySpec properties[] = {
		{0, 0, 0, 0, 0}
	};

	static JSFunctionSpec funcs[] = {
		JS_FS_END
	};

	static JSFunctionSpec st_funcs[] = {
		JS_FS_END
	};

	JSB_cpSpace_object = JS_InitClass(cx, globalObj, JSB_cpBase_object, JSB_cpSpace_class, JSB_cpSpace_constructor,0,properties,funcs,NULL,st_funcs);
}

/*
 * cpBody
 */
#pragma mark - cpBody

JSClass* JSB_cpBody_class = NULL;
JSObject* JSB_cpBody_object = NULL;

// Constructor
JSBool JSB_cpBody_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSB_PRECONDITION( argc==2, "Invalid arguments. Expecting 2");
	
	JSObject *jsobj = JS_NewObject(cx, JSB_cpBody_class, JSB_cpBody_object, NULL);
	
	jsval *argvp = JS_ARGV(cx,vp);
	JSBool ok = JS_TRUE;
	
	double m, i;
	
	ok = JS_ValueToNumber(cx, *argvp++, &m );
	ok = JS_ValueToNumber(cx, *argvp++, &i );
	
	JSB_PRECONDITION(ok, "Error converting arguments for JSB_cpBody_constructor");
	
	cpBody *handle = cpBodyNew(m, i);
	JS_SetPrivate(jsobj, handle);
	
	JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(jsobj));
	return JS_TRUE;
}

// Destructor
void JSB_cpBody_finalize(JSFreeOp *fop, JSObject *obj)
{
	CCLOGINFO(@"jsbindings: finalizing JS object %p (cpBody)", obj);
	void *handle = JS_GetPrivate(obj);
	NSCAssert( handle, @"Invalid handle for cpBody");
	
	cpShapeFree((cpShape*)handle);
}

void JSB_cpBody_createClass(JSContext *cx, JSObject* globalObj, const char* name )
{
	JSB_cpBody_class = (JSClass *)calloc(1, sizeof(JSClass));
	JSB_cpBody_class->name = name;
	JSB_cpBody_class->addProperty = JS_PropertyStub;
	JSB_cpBody_class->delProperty = JS_PropertyStub;
	JSB_cpBody_class->getProperty = JS_PropertyStub;
	JSB_cpBody_class->setProperty = JS_StrictPropertyStub;
	JSB_cpBody_class->enumerate = JS_EnumerateStub;
	JSB_cpBody_class->resolve = JS_ResolveStub;
	JSB_cpBody_class->convert = JS_ConvertStub;
	JSB_cpBody_class->finalize = JSB_cpBody_finalize;
	JSB_cpBody_class->flags = JSCLASS_HAS_PRIVATE;
	
	static JSPropertySpec properties[] = {
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_FS_END
	};
	static JSFunctionSpec st_funcs[] = {
		JS_FS_END
	};
	
	JSB_cpBody_object = JS_InitClass(cx, globalObj, JSB_cpBase_object, JSB_cpBody_class, JSB_cpBody_constructor,0,properties,funcs,NULL,st_funcs);
}

/*
 * cpSegmentShape
 */
#pragma mark - cpSegmentShape

JSClass* JSB_cpSegmentShape_class = NULL;
JSObject* JSB_cpSegmentShape_object = NULL;
// Constructor
JSBool JSB_cpSegmentShape_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSB_PRECONDITION( argc==4, "Invalid arguments. Expecting 4");

	JSObject *jsobj = JS_NewObject(cx, JSB_cpSegmentShape_class, JSB_cpSegmentShape_object, NULL);
	
	jsval *argvp = JS_ARGV(cx,vp);
	JSBool ok = JS_TRUE;

	cpBody *body = NULL;
	cpVect a, b;
	double radius;
	
	ok = jsval_to_opaque(cx, *argvp++, (void**)&body);
	ok = jsval_to_CGPoint(cx, *argvp++, (CGPoint*)&a);
	ok = jsval_to_CGPoint(cx, *argvp++, (CGPoint*)&b);
	ok = JS_ValueToNumber(cx, *argvp++, &radius);
	
	JSB_PRECONDITION(ok, "Error converting arguments for JSB_cpSegmentShape_constructor");
	
	cpShape *handle = cpSegmentShapeNew(body, a, b, radius);
	JS_SetPrivate(jsobj, handle);
	
	JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(jsobj));
	return JS_TRUE;
}

// Destructor
void JSB_cpSegmentShape_finalize(JSFreeOp *fop, JSObject *obj)
{
	CCLOGINFO(@"jsbindings: finalizing JS object %p (cpSegmentShape)", obj);
	void *handle = JS_GetPrivate(obj);
	NSCAssert( handle, @"Invalid handle for cpSegmentShape");
	
	cpShapeFree((cpShape*)handle);
}

void JSB_cpSegmentShape_createClass(JSContext *cx, JSObject* globalObj, const char* name )
{
	JSB_cpSegmentShape_class = (JSClass *)calloc(1, sizeof(JSClass));
	JSB_cpSegmentShape_class->name = name;
	JSB_cpSegmentShape_class->addProperty = JS_PropertyStub;
	JSB_cpSegmentShape_class->delProperty = JS_PropertyStub;
	JSB_cpSegmentShape_class->getProperty = JS_PropertyStub;
	JSB_cpSegmentShape_class->setProperty = JS_StrictPropertyStub;
	JSB_cpSegmentShape_class->enumerate = JS_EnumerateStub;
	JSB_cpSegmentShape_class->resolve = JS_ResolveStub;
	JSB_cpSegmentShape_class->convert = JS_ConvertStub;
	JSB_cpSegmentShape_class->finalize = JSB_cpSegmentShape_finalize;
	JSB_cpSegmentShape_class->flags = JSCLASS_HAS_PRIVATE;
	
	static JSPropertySpec properties[] = {
		{0, 0, 0, 0, 0}
	};

	static JSFunctionSpec funcs[] = {
		JS_FS_END
	};

	static JSFunctionSpec st_funcs[] = {
		JS_FS_END
	};
	
	JSB_cpSegmentShape_object = JS_InitClass(cx, globalObj, JSB_cpBase_object, JSB_cpSegmentShape_class, JSB_cpSegmentShape_constructor,0,properties,funcs,NULL,st_funcs);
}

/*
 * cpBoxShape
 */
#pragma mark - cpBoxShape

JSClass* JSB_cpBoxShape_class = NULL;
JSObject* JSB_cpBoxShape_object = NULL;

// Constructor
JSBool JSB_cpBoxShape_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSB_PRECONDITION( argc==3, "Invalid arguments. Expecting 3");
	
	JSObject *jsobj = JS_NewObject(cx, JSB_cpBoxShape_class, JSB_cpBoxShape_object, NULL);
	
	jsval *argvp = JS_ARGV(cx,vp);
	JSBool ok = JS_TRUE;
	
	cpBody *body = NULL;
	double w, h;
	
	ok = jsval_to_opaque(cx, *argvp++, (void**)&body);
	ok = JS_ValueToNumber(cx, *argvp++, &w );
	ok = JS_ValueToNumber(cx, *argvp++, &h );

	JSB_PRECONDITION(ok, "Error converting arguments for JSB_cpBoxShape_constructor");
	
	cpShape *handle = cpBoxShapeNew(body, w, h);
	JS_SetPrivate(jsobj, handle);
	
	JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(jsobj));
	return JS_TRUE;
}

// Destructor
void JSB_cpBoxShape_finalize(JSFreeOp *fop, JSObject *obj)
{
	CCLOGINFO(@"jsbindings: finalizing JS object %p (cpBoxShape)", obj);
	void *handle = JS_GetPrivate(obj);
	NSCAssert( handle, @"Invalid handle for cpBoxShape");
	
	cpShapeFree((cpShape*)handle);
}

void JSB_cpBoxShape_createClass(JSContext *cx, JSObject* globalObj, const char* name )
{
	JSB_cpBoxShape_class = (JSClass *)calloc(1, sizeof(JSClass));
	JSB_cpBoxShape_class->name = name;
	JSB_cpBoxShape_class->addProperty = JS_PropertyStub;
	JSB_cpBoxShape_class->delProperty = JS_PropertyStub;
	JSB_cpBoxShape_class->getProperty = JS_PropertyStub;
	JSB_cpBoxShape_class->setProperty = JS_StrictPropertyStub;
	JSB_cpBoxShape_class->enumerate = JS_EnumerateStub;
	JSB_cpBoxShape_class->resolve = JS_ResolveStub;
	JSB_cpBoxShape_class->convert = JS_ConvertStub;
	JSB_cpBoxShape_class->finalize = JSB_cpBoxShape_finalize;
	JSB_cpBoxShape_class->flags = JSCLASS_HAS_PRIVATE;
	
	static JSPropertySpec properties[] = {
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_FS_END
	};
	static JSFunctionSpec st_funcs[] = {
		JS_FS_END
	};
	
	JSB_cpBoxShape_object = JS_InitClass(cx, globalObj, JSB_cpBase_object, JSB_cpBoxShape_class, JSB_cpBoxShape_constructor,0,properties,funcs,NULL,st_funcs);
}

#endif // JSB_INCLUDE_CHIPMUNK
