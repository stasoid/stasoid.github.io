// Wierd interpreter, adapted from online version http://catseye.tc/ix/Wierd_(John_Colagioia)

let x = 1;
let y = 1; // grows down
let dx = 1;
let dy = 1;
let stack = [];
let code = [];

function step()
{
    if (tryAhead(0, true)) { 
        // nop
    } else if (tryAhead(45, true)) {
        stack.push(1);
    } else if (tryAhead(315, true)) {
        if (stack.length >= 2) {
            let a = stack.pop();
            let b = stack.pop();
            stack.push(b - a);
        }
    } else if (tryAhead(90, false)) {
        let a = 0;
        if (stack.length > 0) a = stack.pop();
        [dx,dy] = rotateDegrees(dx,dy,a === 0 ? 90 : 180);
        x += dx; y += dy;
    } else if (tryAhead(270, false)) {
        let a = 0;
        if (stack.length > 0) a = stack.pop();
        [dx,dy] = rotateDegrees(dx,dy,a === 0 ? 270 : 180);
        x += dx; y += dy;
    } else if (tryAhead(135, true)) {
        let a = stack.pop(); // if stack is empty then a===undefined, as in original
        let _x = stack.pop(); 
        let _y = stack.pop();
        if (a !== 0) { 
            let e = (getChar(_x, _y) || ' ').charCodeAt(0);
            stack.push(e);
        } else {
            let c = String.fromCharCode(stack.pop()); // if stack is empty c==="\0"
            putChar(_x, _y, c);
        }
    } else if (tryAhead(225, true)) {
        let a = stack.pop();
        if (a === 0) {
            console.log("error: input is not supported");
            return 'stop';
        } else {
            let c = stack.pop();
            process.stdout.write(String.fromCharCode(c));
        }
    } else {
        let _x=x+2*dx, _y=y+2*dy;
        let c = getChar(_x, _y);
        if (c != ' ' && c != undefined) {
            x=_x; y=_y;
        } else {
            return 'stop';
        }
    }
}

function tryAhead(degrees, advance)
{
    let _x = x, _y = y;
    let [_dx,_dy] = rotateDegrees(dx,dy,degrees)
    _x += _dx; _y += _dy;
    let c = getChar(_x,_y);
    if (c != ' ' && c != undefined) {
        if (advance) {
            dx=_dx; dy=_dy;
            x=_x; y=_y;
        }
        return true;
    }
    return false;
}

// same as pf.get() in the original
// note: x,y are 1-based
// returns one-character string
function getChar(_x, _y)
{
	if(_y < 1 || _y > code.length) return undefined;
	let line = code[_y-1];
	if(_x < 1 || _x > line.length) return undefined;
	return line[_x-1];
}

// same as pf.put() in the original
function putChar(_x, _y, ch)
{
	if(_y < 1 || _y > code.length) return;
	let line = code[_y-1];
	if(_x < 1 || _x > line.length) return;
	
	line = line.substr(0,_x-1) + ch + line.substr(_x);
	code[_y-1] = line
}

function rotateDegrees(_dx, _dy, angle)
{
	let dir = getdir(_dx,_dy)
	dir = (dir + angle) % 360
	return getdxdy(dir)
}

// (dx,dy) -> angle
// return angle in degrees from east direction (dx=1,dy=0) rotating left
function getdir(_dx,_dy)
{
	if(_dx==1 && _dy==0) return 0;
	if(_dx==1 && _dy==-1) return 45;
	if(_dx==0 && _dy==-1) return 90;
	if(_dx==-1 && _dy==-1) return 135;
	if(_dx==-1 && _dy==0) return 180;
	if(_dx==-1 && _dy==1) return 225;
	if(_dx==0 && _dy==1) return 270;
	if(_dx==1 && _dy==1) return 315;
}

// angle -> (dx,dy)
function getdxdy(dir)
{
	if(dir==0)   return [1 ,0];
	if(dir==45)  return [1 ,-1];
	if(dir==90)  return [0 ,-1];
	if(dir==135) return [-1,-1];
	if(dir==180) return [-1,0];
	if(dir==225) return [-1,1];
	if(dir==270) return [0 ,1];
	if(dir==315) return [1 ,1];
}

////////////////////////////////////////////////////////////////
if (process.argv.length <= 2) {
    console.log("Usage: node wierd.js <file>");
    process.exit(-1);
}
let code_str = require('fs').readFileSync(process.argv[2], 'ascii');
////////////////////////////////////////////////////////////////

code = code_str.split('\n');

while(step() !== "stop");
