#include <errno.h>
#include <sys/socket.h>
#include <netdb.h>
#include <thread>
#include <chrono>
#include <iostream>
#include <sstream>
#include <mutex>
#include <vector>
#import "js_bindings_dbg.h"

using namespace std;

map<string, js::RootedScript*> __scripts;

thread *debugThread;
string inData;
string outData;
vector<string> queue;
mutex g_qMutex;
mutex g_rwMutex;
bool vmLock = false;
jsval frame = JSVAL_NULL, script = JSVAL_NULL;
int clientSocket;

#define DEBUGGER_PORT 1337
bool serverAlive = true;

void processInput(string data) {
	NSString* str = [NSString stringWithUTF8String:data.c_str()];
	if (vmLock) {
		g_qMutex.lock();
		queue.push_back(string(data));
		g_qMutex.unlock();
	} else {
		[[JSBCore sharedInstance] performSelector:@selector(debugProcessInput:) onThread:[NSThread mainThread] withObject:str waitUntilDone:YES];
	}
}

void clearBuffers() {
	g_rwMutex.lock();
	{
		// only process input if there's something and we're not locked
		if (inData.length() > 0) {
			processInput(inData);
			inData.clear();
		}
		if (outData.length() > 0) {
			write(clientSocket, outData.c_str(), outData.length());
			outData.clear();
		}
	}
	g_rwMutex.unlock();
}

void serverEntryPoint()
{
	// start a server, accept the connection and keep reading data from it
	char myname[256];
	struct sockaddr_in sa;
	struct hostent *hp;
	int s;
	memset(&sa, 0, sizeof(struct sockaddr_in));
	gethostname(myname, 256);
	hp = gethostbyname(myname);
	sa.sin_family = hp->h_addrtype;
	sa.sin_port = htons(DEBUGGER_PORT);
	if ((s = socket(PF_INET, SOCK_STREAM, 0)) < 0) {
		CCLOG(@"error opening debug server socket");
		return;
	}
	int optval = 1;
	if ((setsockopt(s, SOL_SOCKET, SO_REUSEADDR, (char*)&optval, sizeof(optval))) < 0) {
		close(s);
		CCLOG(@"error setting socket options");
		return;
	}
	if ((bind(s, (const struct sockaddr *)&sa, sizeof(struct sockaddr_in))) < 0) {
		close(s);
		CCLOG(@"error binding socket");
		return;
	}
	listen(s, 1);
	while (serverAlive && (clientSocket = accept(s, NULL, NULL)) > 0) {
		// read/write data
		CCLOG(@"debug client connected");
		while (serverAlive) {
			char buf[256];
			int readBytes;
			while ((readBytes = read(clientSocket, buf, 256)) > 0) {
				buf[readBytes] = '\0';
				// no other thread is using this
				inData.append(buf);
				// process any input, send any output
				clearBuffers();
			} // while(read)
		} // while(serverAlive)
	}
}

@implementation JSBCore (Debugger)

/**
 * if we're on a breakpoint, this will pass the right frame & script
 */
- (void)debugProcessInput:(NSString *)str {
	JSString* jsstr = JS_NewStringCopyZ(_cx, [str UTF8String]);
	jsval argv[3] = {
		STRING_TO_JSVAL(jsstr),
		frame,
		script
	};
	jsval outval;
	JSAutoCompartment ac(_cx, _debugObject);
	JS_CallFunctionName(_cx, _debugObject, "processInput", 3, argv, &outval);
}

- (void)enableDebugger
{
	if (_debugObject == NULL) {
		_debugObject = JSB_NewGlobalObject(_cx, true);
		// these are used in the debug socket
		{
			JS_DefineFunction(_cx, _debugObject, "log", JSBCore_log, 0, JSPROP_READONLY | JSPROP_PERMANENT);
			JS_DefineFunction(_cx, _debugObject, "_bufferWrite", JSBDebug_BufferWrite, 1, JSPROP_READONLY | JSPROP_PERMANENT);
			JS_DefineFunction(_cx, _debugObject, "_bufferRead", JSBDebug_BufferRead, 0, JSPROP_READONLY | JSPROP_PERMANENT);
			JS_DefineFunction(_cx, _debugObject, "_lockVM", JSBDebug_LockExecution, 2, JSPROP_READONLY | JSPROP_PERMANENT);
			JS_DefineFunction(_cx, _debugObject, "_unlockVM", JSBDebug_UnlockExecution, 0, JSPROP_READONLY | JSPROP_PERMANENT);
			[self runScript:@"debugger.js" withContainer:_debugObject];
			
			// prepare the debugger
			jsval argv = OBJECT_TO_JSVAL(_object);
			jsval outval;
			JS_WrapObject(_cx, &_debugObject);
			JSAutoCompartment ac(_cx, _debugObject);
			JS_CallFunctionName(_cx, _debugObject, "_prepareDebugger", 1, &argv, &outval);
		}
		// define the start debugger function
		JS_DefineFunction(_cx, _object, "startDebugger", JSBDebug_StartDebugger, 3, JSPROP_READONLY | JSPROP_PERMANENT);
		// start bg thread
		debugThread = new thread(serverEntryPoint);
	}
}

@end

JSBool JSBDebug_StartDebugger(JSContext* cx, unsigned argc, jsval* vp)
{
	JSObject* debugGlobal = [[JSBCore sharedInstance] debugObject];
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		jsval out;
		JS_WrapObject(cx, &debugGlobal);
		JSAutoCompartment ac(cx, debugGlobal);
		JS_CallFunctionName(cx, debugGlobal, "_startDebugger", 3, argv, &out);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JSBool JSBDebug_BufferRead(JSContext* cx, unsigned argc, jsval* vp)
{
    if (argc == 0) {
		JSString* str;
		// this is safe because we're already inside a lock (from clearBuffers)
		if (vmLock) {
			g_rwMutex.lock();
		}
		str = JS_NewStringCopyZ(cx, inData.c_str());
		inData.clear();
		if (vmLock) {
			g_rwMutex.unlock();			
		}
		JS_SET_RVAL(cx, vp, STRING_TO_JSVAL(str));
    } else {
        JS_SET_RVAL(cx, vp, JSVAL_NULL);
    }
    return JS_TRUE;
}

JSBool JSBDebug_BufferWrite(JSContext* cx, unsigned argc, jsval* vp)
{
    if (argc == 1) {
        jsval* argv = JS_ARGV(cx, vp);
        const char* str;
		
        JSString* jsstr = JS_ValueToString(cx, argv[0]);
        str = JS_EncodeString(cx, jsstr);

		// this is safe because we're already inside a lock (from clearBuffers)
		outData.append(str);

        JS_free(cx, (void*)str);
    }
    return JS_TRUE;
}

// this should lock the execution of the running thread, waiting for a signal
JSBool JSBDebug_LockExecution(JSContext* cx, unsigned argc, jsval* vp)
{
	assert([NSThread currentThread] == [NSThread mainThread]);
	if (argc == 2) {
		printf("locking vm\n");
		jsval* argv = JS_ARGV(cx, vp);
		frame = argv[0];
		script = argv[1];
		vmLock = true;
		while (vmLock) {
			// try to read the input, if there's anything
			g_qMutex.lock();
			while (queue.size() > 0) {
				vector<string>::iterator first = queue.begin();
				string str = *first;
				NSString *nsstr = [NSString stringWithUTF8String:str.c_str()];
				[[JSBCore sharedInstance] performSelector:@selector(debugProcessInput:) withObject:nsstr];
				queue.erase(first);
			}
			g_qMutex.unlock();
			this_thread::yield();
		}
		printf("vm unlocked\n");
		frame = JSVAL_NULL;
		script = JSVAL_NULL;
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call to _lockVM");
	return JS_FALSE;
}

JSBool JSBDebug_UnlockExecution(JSContext* cx, unsigned argc, jsval* vp)
{
	vmLock = false;
	return JS_TRUE;
}
