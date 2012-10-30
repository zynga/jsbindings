/*
 * JS Bindings: https://github.com/zynga/jsbindings
 *
 * Copyright (c) 2012 Zynga Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#import "js_bindings_config.h"
#import "js_bindings_core.h"

// NS
#import "js_bindings_NS_manual.h"

// cocos2d + chipmunk registration files
#import "js_bindings_cocos2d_registration.h"
#import "js_bindings_chipmunk_registration.h"
#import "js_bindings_system_registration.h"

#import "jsdbgapi.h"

#include <sys/socket.h>
#include <netdb.h>

static NSMutableDictionary* __globals = NULL;
static NSMutableDictionary* __scripts = NULL;

#pragma mark - Hash

typedef struct _hashJSObject
{
	JSObject			*jsObject;
	void				*proxy;
	UT_hash_handle		hh;
} tHashJSObject;

static tHashJSObject *hash = NULL;
static tHashJSObject *reverse_hash = NULL;

// Globals
char * JSB_association_proxy_key = NULL;

const char * JSB_version = "0.5";


static void its_finalize(JSFreeOp *fop, JSObject *obj)
{
	CCLOGINFO(@"Finalizing global class");
}

static JSClass global_class = {
	"__global", JSCLASS_GLOBAL_FLAGS,
	JS_PropertyStub, JS_PropertyStub,
	JS_PropertyStub, JS_StrictPropertyStub,
	JS_EnumerateStub, JS_ResolveStub,
	JS_ConvertStub, its_finalize,
	JSCLASS_NO_OPTIONAL_MEMBERS
};

#pragma mark JSBCore - Helper free functions
static void reportError(JSContext *cx, const char *message, JSErrorReport *report)
{
	fprintf(stderr, "%s:%u:%s\n",
			report->filename ? report->filename : "<no filename=\"filename\">",
			(unsigned int) report->lineno,
			message);
};

#pragma mark JSBCore - Free JS functions

JSBool JSBCore_log(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc > 0) {
		JSString *string = NULL;
		JS_ConvertArguments(cx, argc, JS_ARGV(cx, vp), "S", &string);
		if (string) {
			char *cstr = JS_EncodeString(cx, string);
			fprintf(stderr, "%s\n", cstr);
		}

		return JS_TRUE;
	}
	return JS_FALSE;
};

JSBool JSBCore_executeScript(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSB_PRECONDITION2(argc==1, cx, JS_FALSE, "Invalid number of arguments in executeScript");

	JSBool ok = JS_FALSE;
	JSString *string;
	if (JS_ConvertArguments(cx, argc, JS_ARGV(cx, vp), "S", &string) == JS_TRUE) {
		ok = [[JSBCore sharedInstance] runScript: [NSString stringWithCString:JS_EncodeString(cx, string) encoding:NSUTF8StringEncoding] ];
	}

	JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error executing script");

	return ok;
};

JSBool JSBCore_associateObjectWithNative(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSB_PRECONDITION(argc==2, "Invalid number of arguments in associateObjectWithNative");


	jsval *argvp = JS_ARGV(cx,vp);
	JSObject *pureJSObj;
	JSObject *nativeJSObj;
	JSBool ok = JS_TRUE;
	ok &= JS_ValueToObject( cx, *argvp++, &pureJSObj );
	ok &= JS_ValueToObject( cx, *argvp++, &nativeJSObj );

	JSB_PRECONDITION2(ok && pureJSObj && nativeJSObj, cx, JS_FALSE, "Error parsing parameters");

	JSB_NSObject *proxy = (JSB_NSObject*) jsb_get_proxy_for_jsobject( nativeJSObj );
	jsb_set_proxy_for_jsobject( proxy, pureJSObj );
	[proxy setJsObj:pureJSObj];

	return JS_TRUE;
};

JSBool JSBCore_getAssociatedNative(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSB_PRECONDITION2(argc==1, cx, JS_FALSE, "Invalid number of arguments in getAssociatedNative");

	jsval *argvp = JS_ARGV(cx,vp);
	JSObject *pureJSObj;
	JS_ValueToObject( cx, *argvp++, &pureJSObj );

	JSB_NSObject *proxy = (JSB_NSObject*) jsb_get_proxy_for_jsobject( pureJSObj );
	id native = [proxy realObj];

	JSObject * obj = get_or_create_jsobject_from_realobj(cx, native);
	JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj) );

	return JS_TRUE;
};


JSBool JSBCore_platform(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSB_PRECONDITION2(argc==0, cx, JS_FALSE, "Invalid number of arguments in getPlatform");

	JSString * platform;

// iOS is always 32 bits
#ifdef __CC_PLATFORM_IOS
	platform = JS_InternString(cx, "mobile/iOS/32");

// Mac can be 32 or 64 bits
#elif defined(__CC_PLATFORM_MAC)

#ifdef __LP64__
	platform = JS_InternString(cx, "desktop/OSX/64");
#else
	platform = JS_InternString(cx, "desktop/OSX/32");
#endif // 32 or 64

#else // unknown platform
#error "Unsupported platform"
#endif
	jsval ret = STRING_TO_JSVAL(platform);

	JS_SET_RVAL(cx, vp, ret);

	return JS_TRUE;
};



/* Register an object as a member of the GC's root set, preventing them from being GC'ed */
JSBool JSBCore_addRootJS(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSB_PRECONDITION2(argc==1, cx, JS_FALSE, "Invalid number of arguments in addRootJS");

	JSObject *o = NULL;
	if (JS_ConvertArguments(cx, argc, JS_ARGV(cx, vp), "o", &o) == JS_TRUE) {
		if (JS_AddObjectRoot(cx, &o) == JS_FALSE) {
			CCLOGWARN(@"something went wrong when setting an object to the root");
		}
	}

	return JS_TRUE;
};

/*
 * removes an object from the GC's root, allowing them to be GC'ed if no
 * longer referenced.
 */
JSBool JSBCore_removeRootJS(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSB_PRECONDITION2(argc==1, cx, JS_FALSE, "Invalid number of arguments in removeRootJS");

	JSObject *o = NULL;
	if (JS_ConvertArguments(cx, argc, JS_ARGV(cx, vp), "o", &o) == JS_TRUE) {
		JS_RemoveObjectRoot(cx, &o);
	}
	return JS_TRUE;
};

/*
 * Dumps GC
 */
static void dumpNamedRoot(const char *name, void *addr,  JSGCRootType type, void *data)
{
    printf("There is a root named '%s' at %p\n", name, addr);
}
JSBool JSBCore_dumpRoot(JSContext *cx, uint32_t argc, jsval *vp)
{
	// JS_DumpNamedRoots is only available on DEBUG versions of SpiderMonkey.
	// Mac and Simulator versions were compiled with DEBUG.
#if DEBUG && (defined(__CC_PLATFORM_MAC) || TARGET_IPHONE_SIMULATOR )
	JSRuntime *rt = [[JSBCore sharedInstance] runtime];
	JS_DumpNamedRoots(rt, dumpNamedRoot, NULL);
#endif
	return JS_TRUE;
};

/*
 * Force a cycle of GC
 */
JSBool JSBCore_forceGC(JSContext *cx, uint32_t argc, jsval *vp)
{
	JS_GC( [[JSBCore sharedInstance] runtime] );
	return JS_TRUE;
};

JSBool JSBCore_restartVM(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSB_PRECONDITION2(argc==0, cx, JS_FALSE, "Invalid number of arguments in executeScript");
	
	[[JSBCore sharedInstance] restartRuntime];
	return JS_FALSE;
};


@implementation JSBCore

@synthesize globalObject = _object;
@synthesize globalContext = _cx;
@synthesize runtime = _rt;

+ (id)sharedInstance
{
	static dispatch_once_t pred;
	static JSBCore *instance = nil;
	dispatch_once(&pred, ^{
		instance = [[self alloc] init];
	});
	return instance;
}

-(id) init
{
	self = [super init];
	if( self ) {

#if DEBUG
		printf("JSB: JavaScript Bindings v%s\n", JSB_version);
#endif

		// Must be called only once, and before creating a new runtime
		JS_SetCStringsAreUTF8();

		[self createRuntime];
	}

	return self;
}

-(void) createRuntime
{
	NSAssert(_rt == NULL && _cx==NULL, @"runtime already created. Reset it first");

	_rt = JS_NewRuntime(8 * 1024 * 1024);
	_cx = JS_NewContext( _rt, 8192);
	JS_SetOptions(_cx, JSOPTION_VAROBJFIX);
	JS_SetVersion(_cx, JSVERSION_LATEST);
	JS_SetErrorReporter(_cx, reportError);
	_object = JSB_NewGlobalObject(_cx);//JS_NewGlobalObject( _cx, &global_class, NULL);
}

+(void) reportErrorWithContext:(JSContext*)cx message:(NSString*)message report:(JSErrorReport*)report
{

}

+(JSBool) logWithContext:(JSContext*)cx argc:(uint32_t)argc vp:(jsval*)vp
{
	return JS_TRUE;
}

+(JSBool) executeScriptWithContext:(JSContext*)cx argc:(uint32_t)argc vp:(jsval*)vp
{
	return JS_TRUE;
}

+(JSBool) addRootJSWithContext:(JSContext*)cx argc:(uint32_t)argc vp:(jsval*)vp
{
	return JS_TRUE;
}

+(JSBool) removeRootJSWithContext:(JSContext*)cx argc:(uint32_t)argc vp:(jsval*)vp
{
	return JS_TRUE;
}

+(JSBool) forceGCWithContext:(JSContext*)cx argc:(uint32_t)argc vp:(jsval*)vp
{
	return JS_TRUE;
}

-(void) purgeCache
{
    tHashJSObject *current, *tmp;
    HASH_ITER(hh, hash, current, tmp) {
		HASH_DEL(hash, current);
		JSB_NSObject *proxy = (JSB_NSObject*) current->proxy;
		[proxy unrootJSObject];
		free(current);
    }

	HASH_ITER(hh, reverse_hash, current, tmp) {
		HASH_DEL(reverse_hash, current);
		free(current);
    }
}

-(void) shutdown
{
	// clean cache
	[self purgeCache];

	JS_DestroyContext(_cx);
	JS_DestroyRuntime(_rt);
	_cx = NULL;
	_rt = NULL;
}

-(void) restartRuntime
{
	[self shutdown];
	[self createRuntime];
}

-(BOOL) evalString:(NSString*)string outVal:(jsval*)outVal
{
	jsval rval;
	JSString *str;
	JSBool ok;
	const char *filename = "noname";
	uint32_t lineno = 0;
	if (outVal == NULL) {
		outVal = &rval;
	}
	const char *cstr = [string UTF8String];
	ok = JS_EvaluateScript( _cx, _object, cstr, (unsigned)strlen(cstr), filename, lineno, outVal);
	if (ok == JS_FALSE) {
		CCLOGWARN(@"error evaluating script:%@", string);
	}
	str = JS_ValueToString( _cx, rval);
	return ok;
}

/*
 * Evaluates an script
 */
-(JSBool) runScript_do_not_use:(NSString*)filename
{
	JSBool ok = JS_FALSE;

	CCFileUtils *fileUtils = [CCFileUtils sharedFileUtils];
	NSString *fullpath = [fileUtils fullPathFromRelativePathIgnoringResolutions:filename];

	unsigned char *content = NULL;
	size_t contentSize = ccLoadFileIntoMemory([fullpath UTF8String], &content);
	if (content && contentSize) {
		jsval rval;
		ok = JS_EvaluateScript( _cx, _object, (char *)content, (unsigned)contentSize, [filename UTF8String], 1, &rval);
		free(content);

		if (ok == JS_FALSE)
			CCLOGWARN(@"error evaluating script: %@", filename);
	}

	return ok;
}

/*
 * This function works OK if it JS_SetCStringsAreUTF8() is called.
 */
-(JSBool) runScript:(NSString*)filename
{
	JSBool ok = JS_FALSE;

	static JSScript *script;

	CCFileUtils *fileUtils = [CCFileUtils sharedFileUtils];
	NSString *fullpath = [fileUtils fullPathFromRelativePathIgnoringResolutions:filename];
	if( !fullpath) {
		char tmp[256];
		snprintf(tmp, sizeof(tmp)-1, "File not found: %s", [filename UTF8String]);
		JSB_PRECONDITION(fullpath, tmp);
	}

	JSAutoCompartment ac(_cx, _object);
	script = JS_CompileUTF8File(_cx, _object, [fullpath UTF8String] );

	JSB_PRECONDITION(script, "Error compiling script");

	const char * name = [[NSString stringWithFormat:@"script %@", filename] UTF8String];
	char *static_name = (char*) malloc(strlen(name)+1);
	strcpy(static_name, name );

    if (!JS_AddNamedScriptRoot(_cx, &script, static_name ) )
        return JS_FALSE;

	jsval result;
	ok = JS_ExecuteScript(_cx, _object, script, &result);

    JS_RemoveScriptRoot(_cx, &script);  /* scriptObj becomes unreachable
										   and will eventually be collected. */
	free( static_name);

	JSB_PRECONDITION(ok, "Error executing script");

    return ok;
}

-(void) dealloc
{
	[super dealloc];

	JS_DestroyContext(_cx);
	JS_DestroyRuntime(_rt);
	JS_ShutDown();
}
@end


#pragma mark JSObject-> Proxy

// Hash of JSObject -> proxy
void* jsb_get_proxy_for_jsobject(JSObject *obj)
{
	tHashJSObject *element = NULL;
	HASH_FIND_INT(hash, &obj, element);

	if( element )
		return element->proxy;
	return nil;
}

void jsb_set_proxy_for_jsobject(void *proxy, JSObject *obj)
{
	NSCAssert( !jsb_get_proxy_for_jsobject(obj), @"Already added. abort");

//	printf("Setting proxy for: %p - %p (%s)\n", obj, proxy, [[proxy description] UTF8String] );

	tHashJSObject *element = (tHashJSObject*) malloc( sizeof( *element ) );

	// XXX: Do not retain it here.
//	[proxy retain];
	element->proxy = proxy;
	element->jsObject = obj;

	HASH_ADD_INT( hash, jsObject, element );
}

void jsb_del_proxy_for_jsobject(JSObject *obj)
{
	tHashJSObject *element = NULL;
	HASH_FIND_INT(hash, &obj, element);
	if( element ) {
		HASH_DEL(hash, element);
		free(element);
	}
}

#pragma mark Proxy -> JSObject

// Reverse hash: Proxy -> JSObject
JSObject* jsb_get_jsobject_for_proxy(void *proxy)
{
	tHashJSObject *element = NULL;
	HASH_FIND_INT(reverse_hash, &proxy, element);

	if( element )
		return element->jsObject;
	return NULL;
}

void jsb_set_jsobject_for_proxy(JSObject *jsobj, void* proxy)
{
	NSCAssert( !jsb_get_jsobject_for_proxy(proxy), @"Already added. abort");

	tHashJSObject *element = (tHashJSObject*) malloc( sizeof( *element ) );

	element->proxy = proxy;
	element->jsObject = jsobj;

	HASH_ADD_INT( reverse_hash, proxy, element );
}

void jsb_del_jsobject_for_proxy(void* proxy)
{
	tHashJSObject *element = NULL;
	HASH_FIND_INT(reverse_hash, &proxy, element);
	if( element ) {
		HASH_DEL(reverse_hash, element);
		free(element);
	}
}

#pragma mark


JSBool jsb_set_reserved_slot(JSObject *obj, uint32_t idx, jsval value)
{
	JSClass *klass = JS_GetClass(obj);
	NSUInteger slots = JSCLASS_RESERVED_SLOTS(klass);
	if( idx >= slots )
		return JS_FALSE;

	JS_SetReservedSlot(obj, idx, value);

	return JS_TRUE;
}

#pragma mark "C" proxy functions

struct jsb_c_proxy_s* jsb_get_c_proxy_for_jsobject( JSObject *jsobj )
{
	struct jsb_c_proxy_s *proxy = (struct jsb_c_proxy_s *) JS_GetPrivate(jsobj);

	// DO not assert. This might be called from "finalize".
	// "finalize" could be called from a VM restart, and it is possible that no proxy was
	// associated with the jsobj yet
	if( ! proxy )
		CCLOGWARN(@"Could you find proxy for jsboject: %p ", jsobj);

	return proxy;
}

void jsb_del_c_proxy_for_jsobject( JSObject *jsobj )
{
	struct jsb_c_proxy_s *proxy = (struct jsb_c_proxy_s *) JS_GetPrivate(jsobj);
	NSCAssert(proxy, @"Invalid proxy for JSObject");
	JS_SetPrivate(jsobj, NULL);

	free(proxy);
}

void jsb_set_c_proxy_for_jsobject( JSObject *jsobj, void *handle, unsigned long flags)
{
	struct jsb_c_proxy_s *proxy = (struct jsb_c_proxy_s*) malloc(sizeof(*proxy));
	NSCAssert(proxy, @"No memory for proxy");

	proxy->handle = handle;
	proxy->flags = flags;
	proxy->jsobj = jsobj;

	JS_SetPrivate(jsobj, proxy);
}

#pragma mark - Debug

JSObject* JSB_NewGlobalObject(JSContext* cx)
{
	JSObject* glob = JS_NewGlobalObject(cx, &global_class, NULL);
	if (!glob) {
		return NULL;
	}
	JSAutoCompartment ac(cx, glob);
	JSBool ok = JS_TRUE;
	ok = JS_InitStandardClasses(cx, glob);
	if (ok)
		JS_InitReflect(cx, glob);
	if (ok)
		ok = JS_DefineDebuggerObject(cx, glob);
	if (!ok)
		return NULL;

	//
	// globals
	//
	JS_DefineFunction(cx, glob, "require", JSBCore_executeScript, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "__associateObjWithNative", JSBCore_associateObjectWithNative, 2, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "__getAssociatedNative", JSBCore_getAssociatedNative, 2, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "__getPlatform", JSBCore_platform, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	
	//
	// Javascript controller (__jsc__)
	//
	JSObject *jsc = JS_NewObject(cx, NULL, NULL, NULL);
	jsval jscVal = OBJECT_TO_JSVAL(jsc);
	JS_SetProperty(cx, glob, "__jsc__", &jscVal);
	
	JS_DefineFunction(cx, jsc, "garbageCollect", JSBCore_forceGC, 0, JSPROP_READONLY | JSPROP_PERMANENT | JSPROP_ENUMERATE );
	JS_DefineFunction(cx, jsc, "dumpRoot", JSBCore_dumpRoot, 0, JSPROP_READONLY | JSPROP_PERMANENT | JSPROP_ENUMERATE );
	JS_DefineFunction(cx, jsc, "addGCRootObject", JSBCore_addRootJS, 1, JSPROP_READONLY | JSPROP_PERMANENT | JSPROP_ENUMERATE );
	JS_DefineFunction(cx, jsc, "removeGCRootObject", JSBCore_removeRootJS, 1, JSPROP_READONLY | JSPROP_PERMANENT | JSPROP_ENUMERATE );
	JS_DefineFunction(cx, jsc, "executeScript", JSBCore_executeScript, 1, JSPROP_READONLY | JSPROP_PERMANENT | JSPROP_ENUMERATE );
	JS_DefineFunction(cx, jsc, "restart", JSBCore_restartVM, 0, JSPROP_READONLY | JSPROP_PERMANENT | JSPROP_ENUMERATE );
	
	//
	// debugger
	//
    JS_DefineFunction(cx, glob, "newGlobal", JSBCore_NewGlobal, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, glob, "_getScript", JSBDebug_GetScript, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, glob, "_socketOpen", JSBDebug_SocketOpen, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, glob, "_socketWrite", JSBDebug_SocketWrite, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, glob, "_socketRead", JSBDebug_SocketRead, 1, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, glob, "_socketClose", JSBDebug_SocketClose, 1, JSPROP_READONLY | JSPROP_PERMANENT);

	//
	// 3rd party developer ?
	// Add here your own classes registration
	//
	
	// registers cocos2d, cocosdenshion and cocosbuilder reader bindings
#if JSB_INCLUDE_COCOS2D
	jsb_register_cocos2d(cx, glob);
#endif // JSB_INCLUDE_COCOS2D
	
	// registers chipmunk bindings
#if JSB_INCLUDE_CHIPMUNK
	jsb_register_chipmunk(cx, glob);
#endif // JSB_INCLUDE_CHIPMUNK
	
    return glob;
}

JSBool JSBCore_NewGlobal(JSContext* cx, unsigned argc, jsval* vp)
{
	if (__globals == NULL) {
		__globals = [[NSMutableDictionary alloc] init];
	}
    if (argc == 1) {
        jsval *argv = JS_ARGV(cx, vp);
        JSString *jsstr = JS_ValueToString(cx, argv[0]);
        const char* key = JS_EncodeString(cx, jsstr);
		NSValue* val = [__globals objectForKey:[NSString stringWithUTF8String:key]];
		js::RootedObject *global;
        if (!val) {
            JSObject* g = JSB_NewGlobalObject(cx);
            global = new js::RootedObject(cx, g);
            JS_WrapObject(cx, global->address());
			NSValue *val = [NSValue valueWithPointer:global];
			[__globals setObject:val forKey:[NSString stringWithUTF8String:key]];
        } else {
			global = (js::RootedObject *)[val pointerValue];
		}
		JS_free(cx, (void*)key);
        JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(*global));
        return JS_TRUE;
    }
    return JS_FALSE;
}

JSBool JSBDebug_GetScript(JSContext* cx, unsigned argc, jsval* vp)
{
	jsval* argv = JS_ARGV(cx, vp);
	if (argc == 1 && argv[0].isString()) {
		JSString* str = JSVAL_TO_STRING(argv[0]);
		const char* cstr = JS_EncodeString(cx, str);
		NSValue *val = [__scripts objectForKey:[NSString stringWithUTF8String:cstr]];
		if (val) {
			JSScript* script = (JSScript *)[val pointerValue];
			jsval out = OBJECT_TO_JSVAL((JSObject*)script);
			JS_SET_RVAL(cx, vp, out);
		} else {
			JS_SET_RVAL(cx, vp, JSVAL_NULL);
		}
		JS_free(cx, (void*)cstr);
	}
	return JS_TRUE;
}

// open a socket, bind it to a port and start listening, all at once :)
JSBool JSBDebug_SocketOpen(JSContext* cx, unsigned argc, jsval* vp)
{
    if (argc == 2) {
        jsval* argv = JS_ARGV(cx, vp);
        int port = JSVAL_TO_INT(argv[0]);
        JSObject* callback = JSVAL_TO_OBJECT(argv[1]);
		
		// FIX
		// in the c++ version, there's a map for port-number -> socket
		// I just removed this since for now I'm assuming we're only using this for the debugger
        int s = 0;
        if (!s) {
            char myname[256];
            struct sockaddr_in sa;
            struct hostent *hp;
            memset(&sa, 0, sizeof(struct sockaddr_in));
            gethostname(myname, 256);
            hp = gethostbyname(myname);
            sa.sin_family = hp->h_addrtype;
            sa.sin_port = htons(port);
            if ((s = socket(PF_INET, SOCK_STREAM, 0)) < 0) {
                JS_ReportError(cx, "error opening socket");
                return JS_FALSE;
            }
            int optval = 1;
            if ((setsockopt(s, SOL_SOCKET, SO_REUSEADDR, (char*)&optval, sizeof(optval))) < 0) {
                close(s);
                JS_ReportError(cx, "error setting socket options");
                return JS_FALSE;
            }
            if ((bind(s, (const struct sockaddr *)&sa, sizeof(struct sockaddr_in))) < 0) {
                close(s);
                JS_ReportError(cx, "error binding socket");
                return JS_FALSE;
            }
            listen(s, 1);
            int clientSocket;
            if ((clientSocket = accept(s, NULL, NULL)) > 0) {
                jsval fval = OBJECT_TO_JSVAL(callback);
                jsval jsSocket = INT_TO_JSVAL(clientSocket);
                jsval outVal;
                JS_CallFunctionValue(cx, NULL, fval, 1, &jsSocket, &outVal);
            }
        } else {
            // just call the callback with the client socket
            jsval fval = OBJECT_TO_JSVAL(callback);
            jsval jsSocket = INT_TO_JSVAL(s);
            jsval outVal;
            JS_CallFunctionValue(cx, NULL, fval, 1, &jsSocket, &outVal);
        }
        JS_SET_RVAL(cx, vp, INT_TO_JSVAL(s));
    }
    return JS_TRUE;
}

JSBool JSBDebug_SocketRead(JSContext* cx, unsigned argc, jsval* vp)
{
    if (argc == 1) {
        jsval* argv = JS_ARGV(cx, vp);
        int s = JSVAL_TO_INT(argv[0]);
        char buff[1024];
        JSString* outStr = JS_NewStringCopyZ(cx, "");
		
        size_t bytesRead;
        while ((bytesRead = read(s, buff, 1024)) > 0) {
            JSString* newStr = JS_NewStringCopyN(cx, buff, bytesRead);
            outStr = JS_ConcatStrings(cx, outStr, newStr);
            // break on new line
            if (buff[bytesRead-1] == '\n') {
                break;
            }
        }
        JS_SET_RVAL(cx, vp, STRING_TO_JSVAL(outStr));
    } else {
        JS_SET_RVAL(cx, vp, JSVAL_NULL);
    }
    return JS_TRUE;
}

JSBool JSBDebug_SocketWrite(JSContext* cx, unsigned argc, jsval* vp)
{
    if (argc == 2) {
        jsval* argv = JS_ARGV(cx, vp);
        int s;
        const char* str;
		
        s = JSVAL_TO_INT(argv[0]);
        JSString* jsstr = JS_ValueToString(cx, argv[1]);
        str = JS_EncodeString(cx, jsstr);
		
        write(s, str, strlen(str));
		
        JS_free(cx, (void*)str);
    }
    return JS_TRUE;
}

JSBool JSBDebug_SocketClose(JSContext* cx, unsigned argc, jsval* vp)
{
    if (argc == 1) {
        jsval* argv = JS_ARGV(cx, vp);
        int s = JSVAL_TO_INT(argv[0]);
        close(s);
    }
    return JS_TRUE;
}

#pragma mark Do Nothing - Callbacks

JSBool JSB_do_nothing(JSContext *cx, uint32_t argc, jsval *vp)
{
	JS_SET_RVAL(cx, vp, JSVAL_VOID);
	return JS_TRUE;
}
