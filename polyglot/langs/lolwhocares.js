// based on https://valthe.scheffers.net/testing/lolwhocares.js

/* lol who executes */

var VM_BASE = 3; // Can not exceed base 36
var VM_DIGITS = 18;
var VM_MAX_INT = Math.pow(VM_BASE, VM_DIGITS); // Can not equal or exceed 2^32

var DIR_UP = 3;
var DIR_DOWN = 1;
var DIR_LEFT = 2;
var DIR_RIGHT = 0;

var insnBase;
var lastInsnChar;

var copyOfCode;
var codeWidth;
var codeHeight;
var pc;
var dir;
var stk;
var insnBuf;
//var isRunning;

var insnCharMap = {
	'0': {'0': '0', '1': '1', '2': '2'},
	'1': {'0': '2', '1': '0', '2': '1'},
	'2': {'0': '1', '1': '2', '2': '0'}
};

var insnRCharMap = {
	'0': {'0': '0', '1': '1', '2': '2'},
	'1': {'2': '0', '0': '1', '1': '2'},
	'2': {'1': '0', '2': '1', '0': '2'}
};

var insnLowerMap = {
	'0': '1',
	'1': '0',
	'2': '0'
};

var insnHigherMap = {
	'0': '2',
	'1': '2',
	'2': '1'
};

function log() {
	process.stderr.write(`pc={x:${pc.x},y:${pc.y}} dir=${dir} stk=${stk} insnBuf=${insnBuf}\n`);
}

function reset() {
	//isRunning = false;
	//outElem.value = "";
	copyOfCode = code.split(/\r\n|\r|\n/g);
	codeHeight = copyOfCode.length;
	codeWidth = 0;
	for (i in copyOfCode) {
		codeWidth = Math.max(codeWidth, copyOfCode[i].length);
	}
	pc = {x: -1, y: 0};
	dir = 0;
	stk = [];
	insnBuf = [];
	insnBase = '0';
	lastInsnChar = null;
}

function step() {
	var char = getc();
	//while (char != null && !char.match(/^&@-\$\^$/)) char = getc();
	if (char == null) return false;
	runInsn(char);
	log();
	return true;
}

function completeInsnBuf(doHigher, hidden) {
	if (hidden) {
		var map = doHigher ? insnHigherMap : insnLowerMap;
		var stuff = insnBuf[insnBuf.length - 1];
		insnBuf.push(map[stuff]);
	} else if (insnBuf.length == 1) {
		completeInsnBuf(doHigher, true);
		completeInsnBuf(doHigher, true);
		process.stderr.write("Completed insn buf to " + insnBuf + "\n");
	} else {
		completeInsnBuf(doHigher, true);
		process.stderr.write("Completed insn buf to " + insnBuf + "\n");
	}
}

function runInsn(insn) {
	var pushLater = null;
	var branchLater = 0;
	if (insn == '*') {
		pushLater = readTheNum() % VM_MAX_INT;
	}
	if (!insn.match(/[012]/)) {
		switch (insn) {
			case ('<'):
				dir = 2;
				break;
			case ('>'):
				dir = 0;
				break;
			case ('^'):
				dir = 3;
				break;
			case ('v'):
				dir = 1;
				break;
			case ('`'):
				branchLater = -1;
				break;
			case (','):
				branchLater = 1;
				break;
		}
		dir &= 3;
		if (insnBuf.length > 0) {
			completeInsnBuf(!((pc.x + pc.y) & 1));
		} else {
			lastInsnChar = insn;
			if (pushLater != null) stk.push(pushLater);
			if (branchLater && !stk[stk.length - 1]) {
				dir = (dir + branchLater) & 3;
			}
			return;
		}
	} else if (insnBuf.length == 2) {
		if (insn == lastInsnChar) {
			completeInsnBuf(!((pc.x + pc.y) & 1));
			insnBase = insn;
		} else {
			insnBuf.push(insnCharMap[insnBase][insn]);
			insnBase = '0';
			if (insnBuf.length >= 3) {
				process.stderr.write("Running insn " + insnBuf + "\n");
			}
		}
	} else if (insnBuf.length < 3) {
		if (insn == lastInsnChar) {
			completeInsnBuf(!((pc.x + pc.y) & 1));
			insnBase = insn;
		} else {
			insnBuf.push(insnCharMap[insnBase][insn]);
		}
	}
	lastInsnChar = insn;
	if (insnBuf.length >= 3) {
		lastInsnChar = null;
		insn = insnBuf[0] + insnBuf[1] + insnBuf[2];
		insnBuf = [];
		switch (insn) {
			case ('010'): // Swap
				var ax = stk.pop() || 0, bx = stk.pop() || 0;
				stk.push(ax, bx);
				break;
			case ('012'): // Increment
				var ax = stk.pop() || 0;
				stk.push((ax + 1 + VM_MAX_INT) % VM_MAX_INT);
				break;
			case ('020'): // Decrement
				var ax = stk.pop() || 0;
				stk.push((ax - 1 + VM_MAX_INT) % VM_MAX_INT);
				break;
			case ('021'): // Duplicate
				var ax = stk.pop() || 0;
				stk.push(ax, ax);
				break;
			case ('120'): // Discard
				stk.pop();
				break;
			case ('121'): // Add
				var ax = stk.pop() || 0, bx = stk.pop() || 0;
				stk.push((bx + ax + VM_MAX_INT) % VM_MAX_INT);
				break;
			case ('101'): // Sub
				var ax = stk.pop() || 0, bx = stk.pop() || 0;
				stk.push((bx - ax + VM_MAX_INT) % VM_MAX_INT);
				break;
			case ('102'): // Store
				var x = stk.pop() || 0, y = stk.pop() || 0, cx = stk.pop() || 0;
				if (y < 0 || y >= codeHeight) break;
				else if (x < 0 || x >= copyOfCode[y].length) break;
				else copyOfCode[y] = copyOfCode[y].substring(0, x) + String.fromCharCode(cx) + copyOfCode[y].substring(x + 1);
				break;
			case ('210'): // Load
				var x = stk.pop() || 0, y = stk.pop() || 0;
				if (y < 0 || y >= codeHeight) stk.push(0);
				else if (x < 0 || x >= copyOfCode[y].length) stk.push(0);
				else stk.push(copyOfCode[y].charCodeAt(x));
				break;
			case ('212'): // Input
				var val = inElem.value[0];
				inElem.value = inElem.value.substring(1);
				stk.push((val || '\u0000').charCodeAt(0));
				break;
			case ('201'): // Output
				var ax = stk.pop() || 0;
				//outElem.value += String.fromCharCode(ax);
				process.stdout.write(String.fromCharCode(ax));
				break;
		}
	}
	if (pushLater != null) stk.push(pushLater);
	if (branchLater && !stk[stk.length - 1]) {
		dir = (dir + branchLater) & 3;
	}
}

function readTheNum() {
	var n = 0;
	var alpha = '0123456789abcdefghijklmnopqrstuvwxyz';
	while (1) {
		var q = {x: pc.x, y: pc.y};
		var digit = alpha.indexOf(getc());
		if (digit < 0 || digit >= VM_BASE) {
			pc = q; // Undo the pc++ of getc.
			return n;
		}
		n *= VM_BASE;
		n += digit;
	}
}

function getcp(x, y) {
	if (y < 0 || y >= codeHeight) {
		return null;
	}
	if (x < 0 || x >= codeWidth) {
		return null;
	}
	ret = copyOfCode[y];
	if (x >= ret.length) return ' ';
	else return ret[x];
}

function getc() {
	switch (dir & 3) {
		case (0):
			pc.x ++;
			break;
		case (1):
			pc.y ++;
			break;
		case (2):
			pc.x --;
			break;
		case (3):
			pc.y --;
			break;
	}
	if (pc.y < 0 || pc.y >= codeHeight) {
		return null;
	}
	if (pc.x < 0 || pc.x >= codeWidth) {
		return null;
	}
	ret = copyOfCode[pc.y];
	if (pc.x >= ret.length) return ' ';
	else return ret[pc.x];
}

function lolWhoCares() {
	reset();
	//setInterval(manyStep, 50);
	while(step());
}

////////////////////////////////////////////////////////////
if (process.argv.length <= 2) {
    console.log("Usage: node lolwhocares-node.js <file>");
    process.exit(-1);
}
var filename = process.argv[2];
var fs = require('fs');
var code = fs.readFileSync(filename, 'utf8');
lolWhoCares();
////////////////////////////////////////////////////////////
