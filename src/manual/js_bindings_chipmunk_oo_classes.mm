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

// Arguments: 
// Ret value: float (d)
JSBool JSB_cpSpace_handle(JSContext *cx, uint32_t argc, jsval *vp) {

	JSObject* jsthis = (JSObject *)JS_THIS_OBJECT(cx, vp);
	void *handle = JS_GetPrivate(jsthis);

	JSB_PRECONDITION( handle, "Invalid Proxy object");

	jsval ret_val = opaque_to_jsval(cx, handle);
	JS_SET_RVAL(cx, vp, ret_val);
	return JS_TRUE;
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
		JS_FN("getHandle", JSB_cpSpace_handle, 0, JSPROP_PERMANENT | JSPROP_SHARED | JSPROP_ENUMERATE),
		JS_FS_END
	};
	static JSFunctionSpec st_funcs[] = {
		JS_FS_END
	};

	JSB_cpSpace_object = JS_InitClass(cx, globalObj, NULL, JSB_cpSpace_class, JSB_cpSpace_constructor,0,properties,funcs,NULL,st_funcs);
}

#endif // JSB_INCLUDE_COCOSDENSHION
