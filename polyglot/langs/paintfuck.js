// Based on http://www.formauri.es/personal/pgimeno/temp/esoteric/paintfuck/paintfuck-canvas.php?xsize=9&ysize=9

fs=require('fs');

var pgmvalue = fs.readFileSync(process.argv[2],{encoding:'utf-8'});

  var x,y,c,pgm,bck,fwd;
  var valid = false;
  var timer;
  var ms;
  var ipf;
  var totiters;
  var blkcolor = "black";

  var xsize=9;
  var ysize=9;

  var pix = new Array(ysize);
  for (y = 0; y < ysize; y++) {
    pix[y] = new Array(xsize);
  }

function rst()
{
  for (y = 0; y < ysize; y++)
    for (x = 0; x < xsize; x++) {
      pix[y][x] = 0;
    }

  if (true) {
    x = y = 0;
  } else {
    x = xsize >> 1;
    y = ysize >> 1;
  }
  c=0;
  totiters=0;
  pgm=pgmvalue.replace(/[^\[\]nsew*]+/g, "");
  bck = [];
  fwd = [];
  var lvlpos = [];
  var nesting = 0;
  var chr;
  valid = true;
  for (var i = 0; i < pgm.length; i++) {
    chr = pgm.charAt(i);
    if (chr == "[") {
      lvlpos[nesting] = i;
      nesting++;
    } else if (chr == "]") {
      if (nesting == 0) { process.stderr.write("Wrong nesting - too many ']'"); valid = false; break; }
      nesting--;
      bck[i] = lvlpos[nesting];
      fwd[lvlpos[nesting]] = i;
    }
  }
  if (nesting != 0) { process.stderr.write("Wrong nesting - too few ']'"); valid = false; }

  return;
}

function execone()
{
  if (c >= pgm.length) {/*alert("End of program");*/ return false;}
  switch(pgm.charAt(c)) {
  case "n":
    if (y==0) y=ysize;
    y--;
    break;
  case "s":
    y++;
    if (y==ysize) y=0;
    break;
  case "e":
    x++;
    if (x==xsize) x=0;
    break;
  case "w":
    if (x==0) x=xsize;
    x--;
    break;
  case "]":
    /* Interpreting ] as an "if 1 then loop" saves a jump */
    if (pix[y][x] != 0)
      c = bck[c];
    break;
  case "[":
    if (pix[y][x] == 0)
      c = fwd[c];
    break;
  default:
    pix[y][x] = 1-pix[y][x];
  }
  c++;
  totiters++;
  return true;
}

rst();
while(execone());

if(""+pix == ""+[
"1,0,1,1,1,0,1,0,1",
"1,0,1,0,1,0,1,1,1",
"1,0,1,0,1,0,0,0,1",
"1,0,1,1,1,0,0,0,1",
"0,0,0,0,0,0,0,0,0",
"0,0,0,0,0,0,0,0,0",
"0,0,0,0,0,0,0,0,0",
"0,0,0,0,0,0,0,0,0",
"0,0,0,0,0,0,0,0,0"])
  process.stdout.write("104");

