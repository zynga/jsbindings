dbg = {};
cc = {};
cc.log = log;

var commandProcessor = {};

commandProcessor.break = function (str) {
	str = str.replace(/\n$/, "");
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

commandProcessor.info = function (regexp_match_array, frame, script) {

    return ({processed : true,
             stringResult : ""});
}

commandProcessor.clear = function (regexp_match_array, frame, script) {

    return ({processed : true,
             stringResult : ""});
}

commandProcessor.scripts = function (regexp_match_array, frame, script) {

    return ({processed : true,
             stringResult : ""});
}

commandProcessor.step = function (regexp_match_array, frame, script) {

    return ({processed : true,
             stringResult : ""});
}

commandProcessor.continue = function (regexp_match_array, frame, script) {

    return ({processed : true,
             stringResult : ""});
}

commandProcessor.deval = function (regexp_match_array, frame, script) {

    return ({processed : true,
             stringResult : ""});
}

commandProcessor.eval = function (regexp_match_array, frame, script) {

    return ({processed : true,
             stringResult : ""});
}

commandProcessor.line = function (regexp_match_array, frame, script) {

    return ({processed : true,
             stringResult : ""});
}

commandProcessor.backtrace = function (regexp_match_array, frame, script) {

    return ({processed : true,
             stringResult : ""});
}

commandProcessor.help = function (regexp_match_array, frame, script) {

    return ({processed : true,
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

this.getCommandProcessor = function (str) {
	str = str.replace(/\n$/, "");
	if (str.length === 0) {
		return null;
	}
    
	// break
	var md = str.match(/[a-z]*/);
    if (!md) {
        return null;
    }
    cc.log("md[0] = " + md[0]);
    switch (md[0]) {
    case "b" :
    case "break" :
        return commandProcessor.break;
    case "info" :
        return commandProcessor.info;
    case "clear" :
        return commandProcessor.clear;
    case "scripts" :
        return commandProcessor.scripts;
    case "s" :
    case "step" :
        return commandProcessor.step;
    case "c" :
    case "continue" :
        return commandProcessor.continue;
    case "deval" :
        return commandProcessor.deval;
    case "eval" :
        return commandProcessor.eval;
    case "line" :
        return commandProcessor.line;
    case "bt" :
        return commandProcessor.backtrace;
    case "help" :
        return commandProcessor.help;
    default :
        return null;
    }
}

this.processInput = function (str, frame, script) {
    var command_func = this.getCommandProcessor(str);
    var command_return;

    if (!command_func) {
        cc.log("did not find a command processor!");
    } else {
        if (command_func.hasOwnProperty("name")) {
            cc.log("calling ... " + command_func.name);
        }
        try {
            command_return = command_func(str);
            if (true === command_return.success) {
                cc.log("command succeeded. return value = " + command_return.stringResult);
            } else {
                cc.log("command failed. return value = " + command_return.stringResult);
            }
        } catch (e) {
            cc.log("Exception in command processing. e =\n" + e);
        }
    }
};


_printHelp = function() {
	var help = "break filename:numer\tAdds a breakpoint at a given filename and line number\n" +
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
