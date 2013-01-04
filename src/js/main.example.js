/**
 * bootstrap for the debugger. You can test to see if the debugger is loaded by checking the type of
 * `startDebugger`. If that function is defined, then you should call it with the global object,
 * which at this point is `this`, the array of files that you need to load (usually is just your
 * main javascript), and the function that needs to be called to start your game, as a string.
 * If the `startDebugger` function is not defined, then you just require your files and start your
 * game :)
 */
var files = ['cc.main.js'];
if (typeof startDebugger !== "undefined") {
	startDebugger(this, files, 'run()');
} else {
	for (var i in files) {
		require(files[i]);
	}
	run();
}
