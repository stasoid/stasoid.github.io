// based on https://codepen.io/AndoDaan/pen/yyaxJP
// fixed nested loops, adapted for nodejs

function error(msg)
{
	console.error(msg);
	process.exit(-1);
}

  function dumpTree(){
	// made dumpTree optional because polyglot takes 1 min to print those huge trees at the end or fails with
	// FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
	if(!debug) return; 
    tree='iPointer:'+iPointer + '  dPointer:'+dPointer + '\n';
    for(var p = 0; p<highestLevel+1;p++){
      for (var i = Math.pow(2,p); i < Math.pow(2,p+1); i++) {
        if(typeof dTape[i]=="undefined"){
          tree=tree +i +":0 ";
        }else{
          v=dTape[i];
          tree=tree+'['+i+":"+v.toString()+"] ";
        }
    };
    tree=tree+'\n';
    }
    
    console.error(tree+"---------------");
  }

  function run(){
    stdInputArray=input.split('');
    iPointer=0;
    dPointer=1;
    level=0;
    highestLevel=0;
    dTape={1: 0};
    endFlag=false;
    maxcycles=10000000;
    cycles=0;

    while(endFlag!==true && cycles<maxcycles){
     
       interpret();
       
       cycles++;
    }

    if(debug) console.error('cycles='+cycles);
  }

  function interpret(){
    cInstruction=code[iPointer];
    switch(cInstruction){
      case "+":
        dTape[dPointer]++;
        break;
      case "-":
        dTape[dPointer]--;
        break;
      case ">":
        dPointer=dPointer*2+1;
        level++;
        if(level>highestLevel){highestLevel=level}
        
        if(typeof dTape[dPointer]=="undefined"){
          tapeMax=dPointer;
        }
        break;
      case "<":
        dPointer=dPointer*2;
        level++;
        if(level>highestLevel){highestLevel=level}
        if(typeof dTape[dPointer]=="undefined"){
          tapeMin=dPointer;
        }
        break;
      case "^":
        if (level > 0) {
          dPointer = Math.floor(dPointer/2);
          level--;
        }
        break;
      case "[":
        if(dTape[dPointer] == 0) {
            let loop_level = 1;

            while (loop_level > 0) {
                iPointer++;
                if (iPointer >= code.length) error("mismatched bracket");
                if (code[iPointer] == '[')
                    loop_level++;
                else if (code[iPointer] == ']')
                    loop_level--;
            }
        }
        break;
      case "]":
        if (dTape[dPointer] != 0) {
			let loop_level = 1;

			while (loop_level > 0) {
                iPointer--;
                if (iPointer < 0) error("mismatched bracket");
				if (code[iPointer] == '[')
					loop_level--;
				else if (code[iPointer] == ']')
					loop_level++;
			}
		}
        break;
      case ",":
        if(stdInputArray.length !== 0){
          var chr = stdInputArray[0];
          stdInputArray.shift();
          dTape[dPointer]=chr.charCodeAt(0);
        }else{
          dTape[dPointer]=0;
        }
        break;
      case ".":
        var bt = dTape[dPointer];
        process.stdout.write(String.fromCharCode(bt));
        break;
      case "s":
        dumpTree();
        break;
    }
    if(iPointer<0 || iPointer > code.length -1){
      endFlag=true;

      return;
    }else{
      iPointer++;
      switch(dPointer){
        case -1:
          dPointer=29999;
          break;
        case 30000:
          dPointer=0;
          break;
      }
      if(typeof dTape[dPointer]=="undefined"){
        dTape[dPointer]=0
      }else{
        switch(dTape[dPointer]){
          case -1:
            dTape[dPointer]=255;
            break;
          case 256:
           dTape[dPointer]=0;
           break;
        }
      }
      return;
    }
  }

if (process.argv.length <= 2) {
    console.log("Usage: node treehugger-node.js [-d] <file>");
    process.exit(-1);
}
debug = process.argv[2] == "-d" // see comment in dumpTree
file = process.argv[debug ? 3 : 2]
code = require('fs').readFileSync(file, 'utf-8');
input = "";
run();
