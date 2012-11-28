dbg = {};

// fallback for no cc
cc = {};
cc.log = log;

var breakpointHandler = {
	hit: function (frame) {
		var script = frame.script;
		beginDebug(frame, frame.script);
	}
};

dbg.breakLine = 0;

var beginDebug = function (frame, script) {
	var stop = false;
	var offsets = [];
	// clear onStep from previous step (if any)
	if (frame) {
		if (dbg.breakLine > 0) {
			var curLine = script.getOffsetLine(frame.offset);
			if (curLine < dbg.breakLine)
				return;
		} else {
			dbg.breakLine = 0;
			frame.onStep = undefined;
		}
	}
	var processInput = function (str, socket) {
		var md = str.match(/^b(reak)?\s+([^:]+):(\d+)/);
		if (md) {
			var scripts = dbg.scripts[md[2]],
				tmpScript = null;
			if (scripts) {
				var breakLine = parseInt(md[3], 10),
					off = -1;
				for (var n=0; n < scripts.length; n++) {
					offsets = scripts[n].getLineOffsets(breakLine);
					if (offsets.length > 0) {
						off = offsets[0];
						tmpScript = scripts[n];
						break;
					}
				}
				if (off >= 0) {
					tmpScript.setBreakpoint(off, breakpointHandler);
					_socketWrite(socket, "breakpoint set for line " + breakLine + " of script " + md[2] + "\n");
				} else {
					_socketWrite(socket, "no valid offsets at that line\n");
				}
			} else {
				_socketWrite(socket, "no script named: " + md[2] + "\n");
			}
			return;
		}
		md = str.match(/^scripts/);
		if (md) {
			cc.log("sending list of available scripts");
			_socketWrite(socket, "scripts:\n" + Object.keys(dbg.scripts).join("\n") + "\n");
			return;
		}
		md = str.match(/^s(tep)?/);
		if (md && frame) {
			cc.log("will step");
			dbg.breakLine = script.getOffsetLine(frame.offset) + 1;
			frame.onStep = function () {
				beginDebug(frame, frame.script);
				return undefined;
			};
			stop = true;
			return;
		}
		md = str.match(/^c(ontinue)?/);
		if (md) {
			if (frame) {
				frame.onStep = undefined;
				dbg.breakLine = 0;
			}
			stop = true;
			return;
		}
		md = str.match(/^eval\s+(.+)/);
		if (md && frame) {
			var res = frame['eval'](md[1]),
				k;
			if (res['return']) {
				var r = res['return'];
				_socketWrite(socket, "* " + (typeof r) + "\n");
				if (typeof r != "object") {
					_socketWrite(socket, "~> " + r + "\n");
				} else {
					var props = r.getOwnPropertyNames();
					for (k in props) {
						var desc = r.getOwnPropertyDescriptor(props[k]);
						_socketWrite(socket, "~> " + props[k] + " = ");
						if (desc.value) {
							_socketWrite(socket, "" + desc.value);
						} else if (desc.get) {
							_socketWrite(socket, "" + desc.get());
						} else {
							_socketWrite(socket, "undefined (no value or getter)");
						}
						_socketWrite(socket, "\n");
					}
				}
			} else if (res['throw']) {
				_socketWrite(socket, "!! got exception: " + res['throw'].message + "\n");
			}
			return;
		} else if (md) {
			_socketWrite(socket, "!! no frame to eval in\n");
			return;
		}
		md = str.match(/^line/);
		if (md && frame) {
			_socketWrite(socket, "current line: " + script.getOffsetLine(frame.offset) + "\n");
			return;
		} else if (md) {
			_socketWrite(socket, "no line, probably entering script\n");
			return;
		}
		md = str.match(/^bt/);
		if (md && frame) {
			var cur = frame,
				stack = [cur.script.url + ":" + cur.script.getOffsetLine(cur.offset)];
			while ((cur = cur.older)) {
				stack.push(cur.script.url + ":" + cur.script.getOffsetLine(cur.offset));
			}
			_socketWrite(socket, stack.join("\n") + "\n");
			return;
		} else if (md) {
			_socketWrite(socket, "no valid frame\n");
			return;
		}
		_socketWrite("! invalid command" + "\n");
	};

	_socketOpen(1337, function (socket) {
		if (frame) {
			_socketWrite(socket, "> " + script.url + ":" + script.getOffsetLine(frame.offset) + "\n");
		} else if (script) {
			_socketWrite(socket, "> " + script.url + "\n");
		}
		// set the client socket
		dbg.socket = socket;
		var str;
		while (!stop && (str = _socketRead(socket))) {
			processInput(str, socket);
			if (stop) {
				_socketWrite(socket, "<\n");
			}
		}
	});
};

dbg.scripts = [];

dbg.onNewScript = function (script) {
	// skip if the url is this script
	var last = script.url.split("/").pop();

	var children = script.getChildScripts(),
		arr = [script].concat(children);
	/**
	 * just dumping all the offsets from the scripts
	for (var i in arr) {
		cc.log("script: " + arr[i].url);
		for (var start=arr[i].startLine, j=start; j < start+arr[i].lineCount; j++) {
			var offsets = arr[i].getLineOffsets(j);
			cc.log("  off: " + offsets.join(",") + "; line: " + j);
		}
	}
	 */
	dbg.scripts[last] = arr;
};

dbg.onDebuggerStatement = function (frame) {
	cc.log("!! on debugger");
	beginDebug(frame, frame.script);
};

dbg.onError = function (frame, report) {
	if (dbg.socket && report) {
		_socketWrite(dbg.socket, "!! exception @ " + report.file + ":" + report.line);
	}
	cc.log("!! exception");
	beginDebug(frame, frame.script);
};

function _prepareDebugger(global) {
	var tmp = new Debugger(global);
	tmp.onNewScript = dbg.onNewScript;
	tmp.onDebuggerStatement = dbg.onDebuggerStatement;
	tmp.onError = dbg.onError;
	dbg.dbg = tmp;
}

function _startDebugger(global, files, startFunc) {
	cc.log("starting with debugger enabled");
	// _socketOpen(1337, function (socket) {
	// 	// just set the client socket
	// 	_socketWrite(socket, "> connected\n");
	// 	dbg.socket = socket;
	// });
	for (var i in files) {
		global['eval']("require('" + files[i] + "');");
	}
	if (startFunc) {
		global['eval'](startFunc);
	}
	beginDebug();
}
