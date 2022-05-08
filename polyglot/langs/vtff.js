// this is modified version of VTFF interpreter by programmer5000
// based on https://codepen.io/programmer5000/full/pwJrVb/
// see also: http://esolangs.org/wiki/VTFF
//
// - removed stuff irrelevant for node.js
// - changed definitions of VT and FF
// note: `intepret` function was not changed

const VT = "\v";
const FF = "\f";

const intepret = (code, input)=>{
	
	if(code === ""){
		return "Hello, World!";
	}
	
	if(code === FF){
		return 0;
	}
	//remove useless, evil characters
	//console.log(code);
	code = code.replace(new RegExp("[^" + VT + FF + "]", "g"), "");
	//console.log(code);
	code = code.split(FF);
	//console.log(code);
	code = code.map(c=>{
		//console.log(c, c.length, c.length + 31, String.fromCharCode(c.length + 31));
		return String.fromCharCode(c.length + 31);
	});
	//console.log(code.join(""));
	
	var i = input;
	console.log(code.join("").replace("\x1f", "0"));
	return eval(code.join("").replace("\x1f", "0"));
};

////////////////////////////////////////////////////////////
if (process.argv.length <= 2) {
    console.log("Usage: node vtff.js <file>");
    process.exit(-1);
}
var code = require('fs').readFileSync(process.argv[2], 'utf8');
////////////////////////////////////////////////////////////

intepret(code, "")
