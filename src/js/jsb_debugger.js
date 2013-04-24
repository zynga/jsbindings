dbg = {};
cc = {};
cc.log = log;

var textCommandProcessor = {};

textCommandProcessor.break = function (str) {
    var md = str.match(/^b(reak)?\s+([^:]+):(\d+)/);

    if (!md) {
        return ({success : false,
                 stringResult : "command could not be parsed"});
    }

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
            return ({success : true,
                     stringResult : "breakpoint set for line " + breakLine + " of script " + md[2]});
		} else {
            return ({success : false,
                     stringResult : "no valid offsets at that line"});
		}
	} else {
        return ({success : false,
                 stringResult : "no script named: " + md[2]});
	}
}

textCommandProcessor.info = function (str) {
    var report = "";

    var md = str.match(/^info\s+(\S+)/);
	if (md) {
        report += "info - NYI";
        report += "\nmd[0] = " + md[0];
        report += "\nmd[1] = " + md[1];

        return ({success : true,
                 stringResult : report});
	} else {
        return ({success : false,
                 stringResult : report});
    }
}

textCommandProcessor.clear = function (str) {
    var report = "";

    report += "clearing all breakpoints";

    dbg.dbg.clearAllBreakpoints();
    return ({success : true,
             stringResult : report});
}

textCommandProcessor.scripts = function (str) {
	var report = "List of available scripts\n";
	report += Object.keys(dbg.scripts).join("\n");

    return ({success : true,
             stringResult : report});
}

textCommandProcessor.step = function (str, frame, script) {
	if (frame) {
		dbg.breakLine = script.getOffsetLine(frame.offset) + 1;
		frame.onStep = function () {
			stepFunction(frame, frame.script);
			return undefined;
		};
		stop = true;
		_unlockVM();

        return ({success : true,
                 stringResult : ""});
	} else {
        return ({success : false,
                 stringResult : ""});
    }
}

textCommandProcessor.continue = function (str, frame, script) {
	if (frame) {
		frame.onStep = undefined;
		dbg.breakLine = 0;
	}
	stop = true;
	_unlockVM();

    return ({success : true,
             stringResult : ""});
}

textCommandProcessor.deval = function (str, frame, script) {
	// debugger eval
	var md = str.match(/^deval\s+(.+)/);
	if (md[1]) {
		try {
			var tmp = eval(md[1]);
			if (tmp) {
				debugObject(tmp, true);
			}
		} catch (e) {
            return ({success : false,
                     stringResult : "exception:\n" + e.message});
		}
        return ({success : true,
                 stringResult : ""});
	} else {
        return ({success : false,
                 stringResult : "could not parse script to evaluate"});
    }

}

textCommandProcessor.eval = function (str, frame, script) {
    if (!frame) {
        return ({success : false,
                 stringResult : "no frame to eval in"});
    }

	var md = str.match(/^eval\s+(.+)/);

	if (md) {
		var res = frame['eval'](md[1]),
			k;
		if (res && res['return']) {
			debugObject(res['return']);
		} else if (res && res['throw']) {
            return ({success : false,
                     stringResult : "got exception: " + res['throw'].message});
		} else {
            return ({success : false,
                     stringResult : "invalid return from eval"});
		}

        return ({success : true,
                 stringResult : ""});
	}
}

textCommandProcessor.line = function (str, frame, script) {
	if (frame) {
        try {
            return ({success : true,
                     stringResult : "current line: " + script.getOffsetLine(frame.offset)});
        } catch (e) {
            return ({success : false,
                     stringResult : "exception " + e});
        }
	}

    return ({success : false,
             stringResult : "no line, probably entering script"});
}

textCommandProcessor.backtrace = function (str, frame, script) {
	if (!frame) {
        return ({success : false,
                 stringResult : "no valid frame"});
    }

    var result = "";
	var cur = frame,
	stack = [cur.script.url + ":" + cur.script.getOffsetLine(cur.offset)];
	while ((cur = cur.older)) {
		stack.push(cur.script.url + ":" + cur.script.getOffsetLine(cur.offset));
	}
	result += stack.join("\n");

    return ({success : true,
             stringResult : result});
}

textCommandProcessor.help = function (regexp_match_array, frame, script) {
    _printHelp();

    return ({success : true,
             stringResult : ""});
}

var breakpointHandler = {
	hit: function (frame) {
		var script = frame.script;
		_lockVM(frame, frame.script);
	}
};

var stepFunction = function (frame, script) {
	if (dbg.breakLine > 0) {
		var curLine = script.getOffsetLine(frame.offset);
		if (curLine < dbg.breakLine) {
			return;
		} else {
			_lockVM(frame, script);
			// dbg.breakLine = 0;
			// frame.onStep = undefined;
		}
	} else {
		cc.log("invalid state onStep");
	}
};

var debugObject = function (r, isNormal) {
	_bufferWrite("* " + (typeof r) + "\n");
	if (typeof r != "object") {
		_bufferWrite("~> " + r + "\n");
	} else {
		var props;
		if (isNormal) {
			props = Object.keys(r);
		} else {
			props = r.getOwnPropertyNames();
		}
		for (k in props) {
			var desc = r.getOwnPropertyDescriptor(props[k]);
			_bufferWrite("~> " + props[k] + " = ");
			if (desc.value) {
				_bufferWrite("" + desc.value);
			} else if (desc.get) {
				_bufferWrite("" + desc.get());
			} else {
				_bufferWrite("undefined (no value or getter)");
			}
			_bufferWrite("\n");
		}
	}
}

dbg.breakLine = 0;

textCommandProcessor.getCommandProcessor = function (str) {
	// break
	var md = str.match(/[a-z]*/);
    if (!md) {
        return null;
    }
    cc.log("md[0] = " + md[0]);
    switch (md[0]) {
    case "b" :
    case "break" :
        return textCommandProcessor.break;
    case "info" :
        return textCommandProcessor.info;
    case "clear" :
        return textCommandProcessor.clear;
    case "scripts" :
        return textCommandProcessor.scripts;
    case "s" :
    case "step" :
        return textCommandProcessor.step;
    case "c" :
    case "continue" :
        return textCommandProcessor.continue;
    case "deval" :
        return textCommandProcessor.deval;
    case "eval" :
        return textCommandProcessor.eval;
    case "line" :
        return textCommandProcessor.line;
    case "bt" :
        return textCommandProcessor.backtrace;
    case "help" :
        return textCommandProcessor.help;
    default :
        return null;
    }
}


this.processInput = function (str, frame, script) {
    var command_func;
    var command_return;

    if (!str) {
        return;
    }

	str = str.replace(/\n+/, "");
	str = str.replace(/\r+/, "");

	if (str === "") {
        cc.log("Empty input. Ignoring.");
		return;
	}
    
    command_func = dbg.getCommandProcessor(str);

    if (!command_func) {
        cc.log("did not find a command processor!");
    } else {
        try {
            command_return = command_func(str, frame, script);
            if (true === command_return.success) {
                cc.log("command succeeded. return value = " + command_return.stringResult);
                _bufferWrite(command_return.stringResult + "\n");
            } else {
                cc.log("command failed. return value = " + command_return.stringResult);
                _bufferWrite("ERROR " + command_return.stringResult + "\n");
            }
        } catch (e) {
            cc.log("Exception in command processing. e =\n" + e  + "\n");
        }
    }
};


_printHelp = function() {
	var help = "break filename:numer\tAdds a breakpoint at a given filename and line number\n" +
				"clear\tClear all breakpoints\n" +
				"c / continue\tContinues the execution\n" +
				"s / step\tStep\n" +
				"bt\tBacktrace\n" +
				"scripts\tShow the scripts\n" +
				"line\tShows current line\n" +
				"eval js_command\tEvaluates JS code\n" +
				"deval js_command\tEvaluates JS Debugger command\n";
	_bufferWrite(help);
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

dbg.onError = function (frame, report) {
	if (dbg.socket && report) {
		_socketWrite(dbg.socket, "!! exception @ " + report.file + ":" + report.line);
	}
	cc.log("!! exception");
};

this._prepareDebugger = function (global) {
	var tmp = new Debugger(global);
	tmp.onNewScript = dbg.onNewScript;
	tmp.onDebuggerStatement = dbg.onDebuggerStatement;
	tmp.onError = dbg.onError;
	dbg.dbg = tmp;

    // use the text command processor at startup
    dbg.getCommandProcessor = textCommandProcessor.getCommandProcessor;
};

this._startDebugger = function (global, files, startFunc) {
	cc.log("[DBG] starting debug session");
	for (var i in files) {
		try {
			global['eval']("require('" + files[i] + "');");
		} catch (e) {
			cc.log("[DBG] error evaluating file: " + files[i]);
		}
	}
	cc.log("[DBG] all files required");
	if (startFunc) {
		cc.log("executing start func: " + startFunc);
		global['eval'](startFunc);
	}
	// beginDebug();
}
