// Important: I use s/.code.tio/f/g instead of s/\.code\.tio/f/g because the result is the same.
// !Don't forget to escape \ like in \\.agda
// Calling a wrapper: >.input.tio; sed s/.code.tio/f/g /srv/wrappers/cyclone | bash

// Officially switched interps for alphuck, what and ChuckScript.

var langs = [
	,
	{ n:1,	  name: "Python 3", 		type: "tio", 	cmd: "python3 f" },
	{ n:2,	  name: "V(Vim)", 			type: "tio", 	cmd: "/opt/v/v f -v" },
	{ n:3,	  name: "Minkolang",		type: "tio", 	cmd: "mv f f.mkl; python3 /opt/minkolang/minkolang_0.15.py f.mkl" },
	{ n:4,	  name: "><>", 				type: "tio", 	cmd: "python3 /opt/fish/fish.py f" },
	{ n:5,	  name: "Python 2", 		type: "tio", 	cmd: "python2 f" },
	{ n:6,	  name: "SMBF", 			type: "tio", 	cmd: "/opt/smbf/smbf f" },
	{ n:7,	  name: "Japt 1.4", 		type: "tio", 	cmd: "git -C /opt/japt archive 21099dba | tar -x; >.input.tio; cat /srv/wrappers/japt | sed 's/#!.*//; s|/opt/japt|.|g; s/.code.tio/f/g' | node" },
	{ n:8,	  name: "Retina 0.8.4",		type: "tio", 	cmd: "mono /opt/retina/Retina.exe f" },
	{ n:9,	  name: "Perl 5", 			type: "tio", 	cmd: "perl f" },
	{ n:10,	  name: "Befunge-93", 		type: "tio", 	cmd: "mv f f.x; /opt/befunge/bin/bef -q f.x" },
	{ n:11,	  name: "Befunge-98", 		type: "tio", 	cmd: "/opt/befunge-98/bin/fbbi f" },
	{ n:12,	  name: "Fission", 			type: "tio",	cmd: "/opt/fission/fission f" },
	{ n:13,	  name: "Ruby 2.4.1",		type: "local",	cmd: "..\\Ruby\\ruby-2.4.1 tmp" },
	{ n:14,	  name: "Turtled",			type: "tio",	cmd: "python3 /opt/turtled/turtlèd.py < f" },
	{ n:15,	  name: "Haystack",			type: "tio",	cmd: "python3 /opt/haystack/haystack_new.py -f f" },
	{ n:16,	  name: "Pyth",				type: "tio",	cmd: "/opt/pyth/pyth.py f" },
	{ n:17,	  name: "Julia 0.4",		type: "tio",	cmd: "/opt/julia/bin/julia f" },
	{ n:18,	  name: "Cardinal",			type: "tio",	cmd: "python3 /opt/cardinal/cardinal.py f" },
	{ n:19,	  name: "Reng",				type: "tio",	cmd: "NODE_PATH=/usr/lib/node_modules  node --harmony /opt/reng/reng.js f" },
	{ n:20,	  name: "Prelude",			type: "tio",	cmd: "python2 /opt/prelude/prelude.py f" },
	{ n:21,	  name: "Nim",				type: "tio",	cmd: "mv f f.nim; nim c f.nim >&2; ./f" },
	{ n:22,	  name: "Underload",		type: "tio",	cmd: '/opt/underload/bin/stringie "`<f`"' },
	{ n:23,	  name: "Hexagony",			type: "tio",	cmd: "/opt/hexagony/interpreter.rb f" },
	{ n:24,	  name: "Thutu",			type: "tio",	cmd: "/opt/thutu/thutu.pl f | perl" },

	{ n:25,	  name: "Pip",				type: "tio",	cmd: "/opt/pip/pip.py f" },
	{ n:26,	  name: "05AB1E legacy",	type: "tio",	cmd: "python3 /opt/05ab1e/osabie.py f" },
	{ n:27,	  name: "Perl 6",			type: "tio",	cmd: "/opt/rakudo-pkg/bin/perl6 f" },
	{ n:28,	  name: "Brain-Flak",		type: "tio",	cmd: "ruby /opt/brain-flak/brain_flak.rb f" },
	{ n:29,	  name: "Trigger",			type: "tio",	cmd: "/opt/trigger/trigger f" },
	{ n:30,	  name: "Whitespace",		type: "tio",	cmd: "/opt/whitespace/wspace f" },
	{ n:31,	  name: "Modular SNUSP",	type: "tio",	cmd: "python2 /opt/snusp-bloated/snusp.py -m f" },
	{ n:32,	  name: "Whirl",			type: "tio",	cmd: "/opt/whirl/whirl f" },
	{ n:33,	  name: "Incident",			type: "tio",	cmd: "/opt/incident/incident f; gcc -xc -<<< $1; ./a.out f >&2",	arg: "langs/incitok.c" },
	{ n:34,	  name: "Rail",				type: "tio",	cmd: "/opt/rail/rail f" },
	{ n:35,	  name: "INTERCAL",			type: "tio",	cmd: "mv f f.i; /opt/intercal/bin/ick -b f.i; ./f" },
	{ n:36,	  name: "Labyrinth",		type: "tio",	cmd: "ruby /opt/labyrinth/interpreter.rb f" },
	{ n:37,	  name: "C++03-gcc",		type: "tio",	cmd: "g++ -std=c++03 -xc++ f; ./a.out" },
	{ n:38,	  name: "C99-gcc",			type: "tio",	cmd: "gcc -std=c99 -xc f; ./a.out" },
	{ n:39,	  name: "CoffeeScript 1",	type: "tio",	cmd: "/usr/lib/node_modules/coffee-script/bin/coffee f" },
	{ n:40,	  name: "Minimal-2D",		type: "tio",	cmd: "/opt/minimal-2d/minimal-2d f" },
	{ n:41,	  name: "brainfuck",		type: "tio",	cmd: "/opt/brainfuck/brainfuck f" },
	{ n:42,	  name: "evil",				type: "tio",	cmd: "java -cp /opt/evil evil f" },
	{ n:43,	  name: "reticular",		type: "tio",	cmd: "ruby /opt/reticular/reticular.rb f" },
	// Case-insensitive variant of TIO's alphuck is now the primary interpreter for alphuck.
	{ n:44,	  name: "alphuck",			type: "tio",	cmd: "tr A-Z a-z < f > x; /opt/brainfuck/alphuck x" },

	{ n:45,	  name: "PicoLisp-17.12",	type: "tio",	cmd: "base64 -d <<< $1 > x; chmod +x x; ./x f",		arg: "langs/picolisp-17.12.b64" },
	{ n:46,	  name: "Cubix",			type: "tio",	cmd: ">.input.tio; sed 's/#!.*//; s/.code.tio/f/g' /srv/wrappers/cubix | node" },
	{ n:47,	  name: "Lily",				type: "tio",	cmd: "mv f f.lily; /opt/lily/lily f.lily" },
	{ n:48,	  name: "Deadfish~",		type: "tio",	cmd: "python2 /opt/deadfish-/deadfish.py f" },
	{ n:49,	  name: "Octave",			type: "tio",	cmd: "octave f" },
	{ n:50,	  name: "Bash",				type: "tio",	cmd: "bash f" },
	                                	
	{ n:51,	  name: "Assembler-as",		type: "tio",	cmd: "as -ox f; ld x; ./a.out" },

	{ n:52,	  name: "COW",				type: "tio",	cmd: "/opt/cow/cow f" },
	{ n:53,	  name: "Shove",			type: "tio",	cmd: "/opt/shove/shove -f f" },
	{ n:54,	  name: "Zsh",				type: "tio",	cmd: "zsh f" },
	{ n:55,   name: "Brain-Flak Classic",type:"tio",	cmd: "ruby /opt/brain-flak/brain_flak.rb -lclassic f" },
	{ n:56,	  name: "dc",				type: "tio",	cmd: "dc f" },
	{ n:57,	  name: "Wise",				type: "tio",	cmd: "python2 /opt/wise/wise.py f" },
	{ n:58,	  name: "Ksh",				type: "tio",	cmd: "ksh f" },
	{ n:59,	  name: "Tcl",				type: "tio",	cmd: "tclsh f" },
	{ n:60,	  name: "Moorhens 2",		type: "tio",	cmd: "cp /opt/moorhens/* .; python2 moorhens.py f" },
	{ n:61,	  name: "S.I.L.O.S",		type: "tio",	cmd: "java -cp /opt/silos Silos f" },
	{ n:62,	  name: "Grass",			type: "tio",	cmd: "ruby /opt/grass/grass.rb f" },
	{ n:63,	  name: "Brian & Chuck",	type: "tio",	cmd: "ruby /opt/brian-chuck/brian-chuck.rb f" },
	// Increase tape size in Agony interpreter, see answer 163
	{ n:64,	  name: "Agony",			type: "tio",	cmd: "sed s/1500/1000000/ /opt/agony/Agony.java > Agony.java; javac Agony.java; java -cp . Agony f" },

	{ n:65,	  name: "ALGOL 68",			type: "tio",	cmd: "/opt/algol68g/a68g f" },
	{ n:66,	  name: "Surface",			type: "tio",	cmd: "/opt/surface/surface f" },
	{ n:67,	  name: "C11-gcc",			type: "tio",	cmd: "gcc -std=c11 -xc f; ./a.out" },
	{ n:68,	  name: "Python 1",			type: "tio",	cmd: "/opt/python1/python f" },
	{ n:69,	  name: "rk-lang",			type: "tio",	cmd: "/opt/rk/rk f" },
	{ n:70,	  name: "Commercial",		type: "tio",	cmd: "python2 /opt/commercial/commercial.py f" },
	{ n:71,	  name: "what",				type: "tio",	cmd: 'ruby <<< $1 > x; /opt/brainfuck/brainfuck x',	arg: "langs/what.rb" },
	{ n:72,	  name: "Fortran",			type: "tio",	cmd: "mv f f.F08; gfortran f.F08; ./a.out" },

	{ n:73,	  name: "Morse",			type: "tio",	cmd: 'gcc -xc -<<< $1; ./a.out f',					arg: "langs/morse.c" },
	{ n:74,	  name: "Archway",			type: "tio",	cmd: "/opt/archway/archway f" },
	{ n:75,	  name: "C++11-gcc",		type: "tio",	cmd: "g++ -std=c++11 -xc++ f; ./a.out" },
	{ n:76,   name: "Trefunge-98-pyfunge",type:"tio",	cmd: "pyfunge -v98 -3 f" },
	{ n:77,	  name: "C++14-gcc",		type: "tio",	cmd: "g++ -std=c++14 -xc++ f; ./a.out" },
	{ n:78,	  name: "dash",				type: "tio",	cmd: "dash f" },
	{ n:79,	  name: "C++17-gcc",		type: "tio",	cmd: "g++ -std=c++17 -xc++ f; ./a.out" },

	{ n:80,	  name: "Klein 201",		type: "tio",	cmd: "python2 /opt/klein/klein.py f 201" },
	{ n:81,	  name: "Klein 100",		type: "tio",	cmd: "python2 /opt/klein/klein.py f 100" },
	{ n:82,	  name: "Brain-Flueue",		type: "tio",	cmd: "ruby /opt/brain-flak/brain_flak.rb -lflueue f" },
	// Objeck outputs in UTF-16, so expected output is "8\x003\x00"
	{ n:83,	  name: "Objeck",			type: "local",	cmd: "..\\Objeck\\r tmp",							stdout: "8\x003\x00" },
	{ n:84,	  name: "Klein 001",		type: "tio",	cmd: "python2 /opt/klein/klein.py f 001" },
	{ n:85,	  name: "zkl",				type: "tio",	cmd: "mv f f.zkl; zklRoot=/opt/zkl  /opt/zkl/runzkl f.zkl" },

	{ n:86,	  name: "Miniflak",			type: "tio",	cmd: "ruby /opt/brain-flak/brain_flak.rb -lminiflak f" },
	{ n:87,	  name: "Alice",			type: "tio",	cmd: "ruby /opt/alice/interpreter.rb f" },
	{ n:88,	  name: "PingPong",			type: "tio",	cmd: "java -cp /opt/pingpong PingPong f" },
	{ n:89,	  name: "gnuplot",			type: "tio",	cmd: "gnuplot f" },
	{ n:90,	  name: "RunR",				type: "local",	cmd: "..\\RunR\\r tmp" },
	{ n:91,	  name: "Cood",				type: "tio",	cmd: "php /opt/cood/interpreter.php f" },
	{ n:92,	  name: "C89-gcc",			type: "tio",	cmd: "gcc -std=c89 -xc f; ./a.out" },
	{ n:93,	  name: "Set",				type: "tio",	cmd: "python3 /opt/set/set.py f" },
	{ n:94,	  name: "Emotinomicon",		type: "tio",	cmd: "NODE_PATH=/usr/lib/node_modules  node --stack_size=4000 /opt/emotinomicon/emotinomicon.js f" }, // calling a wrapper is even longer
	{ n:95,	  name: "Emoji",			type: "tio",	cmd: "/opt/emoji/emoji.py f" },
	{ n:96,	  name: "EmojiCoder",		type: "tio",	cmd: "node /opt/emojicoder/emojicoder.js f" },
	{ n:97,	  name: "Cubically",		type: "tio",	cmd: "git -C /opt/cubically archive c55e749a | tar -x; make tio >&2; ./rubiks-tio f" },

	{ n:98,	  name: "Archway2",			type: "tio",	cmd: "/opt/archway/archway2 f" },
	{ n:99,	  name: "99",				type: "tio",	cmd: "/opt/99/ninetynine f" },
	{ n:100,  name: "brainbool",		type: "tio",	cmd: "/opt/brainfuck/brainbool f" },
	{ n:101,  name: "K&R C gcc",		type: "tio",	cmd: "gcc -traditional-cpp -xc f; ./a.out" },
	{ n:102,  name: "Symbolic Bf",		type: "tio",	cmd: "mono /opt/sbf/sbf.exe f >&2; mono f.exe" },
	{ n:103,  name: "Unicat",			type: "tio",	cmd: "python /opt/unicat/cat.py f" },
	{ n:104,  name: "Paintfuck",		type: "tio",	cmd: 'node -<<< $1 f',						arg: "langs/paintfuck.js" },
	{ n:105,  name: "Emoji-gramming",	type: "tio",	cmd: "python3 /opt/emoji-gramming/emoji-gramming.py f" },
	{ n:106,  name: "Unlambda",			type: "tio",	cmd: 'python2 -<<< $1 f',					arg: "langs/unlambda.py" },
	{ n:107,  name: "Gol><>",			type: "tio",	cmd: "python3 /opt/golfish/src/golfish.py f" },
	{ n:108,  name: "Ruby 1.8.7",		type: "local",	cmd: "..\\Ruby\\ruby-1.8.7 tmp" },
	{ n:109,  name: "DOBELA",			type: "tio",	cmd: "/opt/dobela/dobelx64 f" },
	{ n:110,  name: "Ruby 1.9.3",		type: "local",	cmd: "..\\Ruby\\ruby-1.9.3 tmp" },
	{ n:111,  name: "Del|m|t",			type: "tio",	cmd: "mv f delimitCode; > delimitInput; java -cp /opt/delimit DelimitInterpreter '#'" },
	{ n:112,  name: "Pyramid Scheme",	type: "tio",	cmd: "ruby /opt/pyramid-scheme/pyra.rb f" },
	{ n:113,  name: "ADJUST",			type: "tio",	cmd: "/opt/adjust/adjust f" },
	{ n:114,  name: "Axo",				type: "tio",	cmd: "/opt/axo/axo f" },
	{ n:115,  name: "xEec",				type: "tio",	cmd: "/opt/xeec/xEec f" },
	{ n:116,  name: "Piet",				type: "tio",	cmd: "mv f f.xpm; convert f.xpm f.png; /opt/piet/npiet f.png" },
	{ n:117,  name: "Stones",			type: "tio",	cmd: "/opt/stones/target/release/stones f" },
	{ n:118,  name: "MarioLANG",		type: "tio",	cmd: 'ruby -<<< $1 f',						arg: "langs/mariolang.rb" },

	{ n:119,  name: "ImageFuck",		type: "local",	cmd: "..\\ImageFuck\\r tmp" },
	{ n:120,  name: "TRANSCRIPT",		type: "tio",	cmd: "perl /opt/transcript/transcript.pl f" },
	{ n:121,  name: "Braincopter",		type: "local",	cmd: "..\\Braincopter\\r tmp" },
	{ n:122,  name: "Monkeys",			type: "tio",	cmd: "/opt/monkeys/monkeys f" },
	{ n:123,  name: "Mycelium",			type: "local",	cmd: "..\\Mycelium\\r tmp" },
	{ n:124,  name: "C-clang",			type: "tio",	cmd: "clang -xc f; ./a.out" },
	{ n:125,  name: "Gammaplex",		type: "local",	cmd: "..\\Gammaplex\\r tmp",				gui: true },

	{ n:126,  name: "Nhohnhehr",		type: "tio",	cmd: "/opt/nhohnhehr/src/nhohnhehr.py f" },
	{ n:127,  name: "Deltaplex",		type: "local",	cmd: "..\\Deltaplex\\r tmp",				gui: true },
	{ n:128,  name: "Haskell",			type: "tio",	cmd: "mv f f.lhs; runghc -cpp f.lhs" },
	{ n:129,  name: "Brainloller",		type: "local",	cmd: "..\\Brainloller\\r tmp" },
	{ n:130,  name: "Boolfuck",			type: "tio",	cmd: "/opt/boolfuck/boof f" },
	{ n:131,  name: "Ext Brainloller",	type: "local",	cmd: "..\\Extended_Brainloller\\r tmp" },
	{ n:132,  name: "YABALL",			type: "tio",	cmd: "/opt/yaball/yaball f" },
	{ n:133,  name: "PATH",				type: "tio",	cmd: "python2 /opt/path/src/path f" },
	{ n:134,  name: "Aheui",			type: "tio",	cmd: "/opt/aheui/esotope-aheui f" },
	{ n:135,  name: "LNUSP",			type: "tio",	cmd: "/opt/lnusp/lnusp f" },
	{ n:136,  name: "Wierd-Chris",		type: "tio",	cmd: 'node -<<< $1 f',						arg: "langs/wierd.js" },
	                                	
	{ n:137,  name: "Bloated SNUSP",	type: "tio",	cmd: "python2 /opt/snusp-bloated/snusp.py -b f" },
	{ n:138,  name: "Braille",			type: "tio",	cmd: "/opt/braille/braille f" },
	{ n:139,  name: "Core SNUSP",		type: "tio",	cmd: "python2 /opt/snusp-bloated/snusp.py -c f" },
	{ n:140,  name: "Gaot++",			type: "tio",	cmd: "python2 /opt/gaotpp/gaot_plus_plus.py --file f" },
	{ n:141,  name: "Floater",			type: "tio",	cmd: "mv f f.xpm; convert f.xpm f.png; java -cp /opt/floater/src org.zomb.floater.FloaterMain f.png" },
	{ n:142,  name: "BitChanger",		type: "tio",	cmd: "/opt/bitchanger/src/egobchi f" },
	{ n:143,  name: "Beatnik",			type: "tio",	cmd: "/opt/beatnik/script/beatnik.py f" },
	{ n:144,  name: "SNUSP-snuspi",		type: "tio",	cmd: "java -cp /opt/snuspi -Djava.library.path=/opt/snuspi SnuspI f" },
	{ n:145,  name: "MiLambda",			type: "tio",	cmd: "node /opt/milambda/milambda.js f" },

	{ n:146,  name: "Curry",			type: "tio",	cmd: "mv f f.lcurry; /opt/curry-pakcs/bin/pakcs :load f.lcurry :save :quit >&2; ./f" },
	{ n:147,  name: "Thue",				type: "tio",	cmd: "/opt/thue/bin/thue f 2>x" },
	{ n:148,  name: "VTFF",				type: "tio",	cmd: 'node -<<< $1 f',						arg: "langs/vtff.js" },
	// prints a space on TIO because Console.ReadKey().Key != ConsoleKey.Enter
	{ n:149,  name: "CSL",				type: "tio",	cmd: "mono /opt/csl/Program.exe f",			stdout: "149 " }, 
	{ n:150,  name: "K-on Fuck",		type: "tio",	cmd: 'perl -<<< $1 f',						arg: "langs/k-on.pl" },
	{ n:151,  name: "Black",			type: "tio",	cmd: "/opt/blak/blak -e0 -t1 f" },
	{ n:152,  name: "ChuckScript",		type: "tio",	cmd: "ruby <<< $1 | node",					arg: "langs/chuckscript.rb" },
	{ n:153,  name: "l33t",				type: "tio",	cmd: "/opt/l33t/l33t f" },
	{ n:154,  name: "cockfuck",			type: "tio",	cmd: 'perl -<<< $1 f',						arg: "langs/cockfuck.pl" },
	{ n:155,  name: "Simula",			type: "tio",	cmd: ">.input.tio; sed s/.code.tio/f/g /srv/wrappers/simula | bash" },
	{ n:156,  name: "Moorhens",			type: "tio",	cmd: "git -C /opt/moorhens archive d2226c5f | tar -x; python2 moorhens.py f" },
	{ n:157,  name: "Haskell-Hugs", 	type: "tio",	cmd: "mv f f.lhs; runhugs f.lhs" },
	{ n:158,  name: "HDBF",				type: "tio",	cmd: "/opt/hdbf/hdbf f" },
	{ n:159,  name: "Agda",				type: "tio",	cmd: ">.input.tio; sed 's/.code.tio/f/g; s|\\.agda|.lagda|g' /srv/wrappers/agda | bash",	timeout:15 },
	{ n:160,  name: "TinCan",			type: "tio",	cmd: "/opt/tincan/tincan f" },
	{ n:161,  name: "2L",				type: "tio",	cmd: "/opt/2l/impl/2l_graue f" },
	{ n:162,  name: "Julia 0.5",		type: "tio",	cmd: "/opt/julia5/bin/julia f" },
	{ n:163,  name: "1L_AOI",			type: "tio",	cmd: "/opt/1l-aoi/1l_aoi -eu f" },
	{ n:164,  name: "CLIPS",			type: "tio",	cmd: "/opt/clips/clips -f2 f" },
	{ n:165,  name: "Ursala",			type: "tio",	cmd: "PATH=/opt/ursala  AVMINPUTS=.:/opt/ursala/avm  /opt/ursala/fun f -s" },
	{ n:166,  name: "yash",				type: "tio",	cmd: "yash f" },
	{ n:167,  name: "Sidef",			type: "tio",	cmd: "/opt/sidef/bin/sidef f" },
	{ n:168,  name: "Mornington Crescent",type:"tio",	cmd: "python3 /opt/mornington-crescent/esoterpret.py -l morningtoncrescent f" },
	{ n:169,  name: "AutoIt",			type: "local",	cmd: "..\\AutoIt\\r tmp",					gui: true },
	{ n:170,  name: "-XNegativeLiterals",type:"tio",	cmd: "mv f f.lhs; runghc -cpp -XNegativeLiterals f.lhs" },
	{ n:171,  name: "Agena 2.9.2",		type: "local",	cmd: "..\\Agena\\r tmp" },
	{ n:172,  name: "-XQuasiQuotes",	type: "tio",	cmd: "mv f f.lhs; runghc -cpp -XQuasiQuotes f.lhs" },
	{ n:173,  name: "Brat",				type: "tio",	cmd: "mv f f.brat; /opt/brat/bin/brat f.brat" },
	{ n:174,  name: "-XMagicHash",		type: "tio",	cmd: "mv f f.lhs; runghc -cpp -XMagicHash f.lhs" },
	{ n:175,  name: "Zephyr",			type: "tio",	cmd: "mv f f.zeph; python3 /opt/zephyr/zephyr.py f",	stdout: "175 " }, // Zephyr always adds a space
	                                	
	{ n:176,  name: "Whispers",			type: "tio",	cmd: "python3 /opt/whispers/whispers.py f" },
	{ n:177,  name: "1L_a",				type: "tio",	cmd: "/opt/1l-a/impl/1l_a_mmi f" },
	{ n:178,  name: "Literate CoffeeScript",type:"tio",	cmd: "coffee -l f" },
	{ n:179,  name: "ORK",				type: "tio",	cmd: "/opt/ork/ork f > f.cpp; g++ -I/opt/ork f.cpp /opt/ork/libork.a; ./a.out" },

	{ n:180,  name: "CoffeeScript",		type: "tio",	cmd: "coffee f" },
	{ n:181,  name: "Ropy",				type: "tio",	cmd: "ruby /opt/ropy/ruby/ropy.rb f" },
	{ n:182,  name: "Bitwise",			type: "tio",	cmd: "/opt/bitwise/bitwise f" },
	{ n:183,  name: "I8080",			type: "local",	cmd: "..\\I8080\\r tmp",					gui: true },
	{ n:184,  name: "Wumpus",			type: "tio",	cmd: "ruby /opt/wumpus/wumpus.rb f" },
	{ n:185,  name: "Make",				type: "tio",	cmd: "make -f f" },
	{ n:186,  name: "Prolog-SWI",		type: "tio",	cmd: "swipl -q -t halt -f f" },
	{ n:187,  name: "GolfScript",		type: "tio",	cmd: "/opt/golfscript/golfscript.rb f" },
	{ n:188,  name: "Z80",				type: "local",	cmd: "..\\Z80\\r tmp",						gui: true },
	{ n:189,  name: "-XBangPatterns",	type: "tio",	cmd: "mv f f.lhs; runghc -cpp -XBangPatterns f.lhs" },
	{ n:190,  name: "Ruby 2.5.0",		type: "tio",	cmd: "ruby f" },
	{ n:191,  name: "PHP",				type: "tio",	cmd: 'php -r "`<f`"' },

	{ n:192,  name: "SQLite",			type: "tio",	cmd: "sqlite3 -init f" },
	{ n:193,  name: "LOWER",			type: "tio",	cmd: "/opt/attache/attache.rb /opt/lower/Lower.@ f" },
	{ n:194,  name: "TemplAt",			type: "tio",	cmd: "/opt/attache/attache.rb -T f" },
	{ n:195,  name: "ZL",				type: "local",	cmd: "..\\ZL\\r2 tmp" },
	{ n:196,  name: "Cyclone",			type: "tio",	cmd: ">.input.tio; sed s/.code.tio/f/g /srv/wrappers/cyclone | bash" },
	{ n:197,  name: "CPY",				type: "tio",	cmd: "mv f f.cpy; /opt/cpy/Source/cpy f.cpy >&2; ./a" },
	{ n:198,  name: "eC",				type: "local",	cmd: "..\\eC\\r2 tmp" },
	{ n:199,  name: "PicoLisp 18.6",	type: "tio",	cmd: "/opt/picolisp/pil f" },
	{ n:200,  name: "Coconut",			type: "tio",	cmd: "coconut-run f" },
	{ n:201,  name: "Julia 0.6",		type: "tio",	cmd: "/opt/julia6/bin/julia f" },
	{ n:202,  name: "x86",				type: "local",	cmd: "..\\x86_boot_image\\autotest-latest tmp",	gui: true },
	{ n:203,  name: "V-FMota",			type: "tio",	cmd: `sed "s/'!'/--/" /opt/v-fmota/V.hs > V.hs; runghc V.hs f` },
	{ n:204,  name: "Seriously",		type: "tio",	cmd: "python2 /opt/seriously/seriously.py -f f" },
	{ n:205,  name: "-XBinaryLiterals",	type: "tio",	cmd: "mv f f.lhs; runghc -cpp -XBinaryLiterals f.lhs" },
	{ n:206,  name: "-XExtendedDefaultRules",type:"tio",cmd: "mv f f.lhs; runghc -cpp -XExtendedDefaultRules f.lhs" },
	{ n:207,  name: "-XApplicativeDo",	type: "tio",	cmd: "mv f f.lhs; runghc -cpp -XApplicativeDo f.lhs" },
	// Latest Pyret has an option to suppress the message about tests, but I am unable to run it. Using old version of Pyret.
	{ n:208,  name: "Pyret",			type: "local",	cmd: "..\\Pyret\\r tmp",	stdout: "208The program didn't define any tests." },
	{ n:209,  name: "-XNumDecimals",	type: "tio",	cmd: "mv f f.lhs; runghc -cpp -XNumDecimals f.lhs" },
	{ n:210,name:"-XNoMonomorphismRestriction",type:"tio",cmd:"mv f f.lhs; runghc -cpp -XNoMonomorphismRestriction f.lhs" },
	{ n:211,  name: "-XMonoLocalBinds",	type: "tio",	cmd: "mv f f.lhs; runghc -cpp -XMonoLocalBinds f.lhs" },
	{ n:212,  name: "-XStrict",			type: "tio",	cmd: "mv f f.lhs; runghc -cpp -XStrict f.lhs" },
	{ n:213,  name: "TapeBagel",		type: "tio",	cmd: "perl /opt/tapebagel/tapebagel.pl f" },
	{ n:214,  name: "-XStrictData",		type: "tio",	cmd: "mv f f.lhs; runghc -cpp -XStrictData f.lhs" },
	{ n:215,  name: "emotifuck",		type: "tio",	cmd: "/opt/emotifuck/emotifuck f" },
	{ n:216,  name: "Silberjoder",		type: "tio",	cmd: "python2 /opt/silberjoder/silberjoder.py f" },
	{ n:217,  name: "-XHexFloatLiterals",type:"ato",	id: "haskell",	opt:["-x", "lhs", "-cpp", "-XHexFloatLiterals"] },

	{ n:218,  name: "C-tcc",			type: "tio",	cmd: "/opt/c-tcc/bin/tcc -run f" },
	{ n:219,  name: "Spoon",			type: "tio",	cmd: "/opt/spoon/spoon -q -0n -1M f" },
	{ n:220,  name: "Ante",				type: "tio",	cmd: "/opt/ante/ante.rb f" },
	{ n:221,  name: "Red",				type: "tio",	cmd: "cp /opt/red/* .; ./red -c f >&2; ./f" },
	{ n:222,  name: "-XOverloadedStrings",type:"tio",	cmd: "mv f f.lhs; runghc -cpp -XOverloadedStrings f.lhs" },

	{ n:223,  name: "REBOL 2",			type: "tio",	cmd: "/opt/rebol/rebol -q f" },
	{ n:224,  name: "Nial",				type: "tio",	cmd: "mv f f.xxx; /opt/nial/binaries/Linux/nial64 -defs f.xxx" },
	{ n:225,  name: "Julia 0.7",		type: "tio",	cmd: "/opt/julia7/bin/julia f" },
	{ n:226,  name: "Canvas",			type: "tio",	cmd: "node /opt/canvas/node.js f" },
	{ n:227,  name: "Julia 1.0",		type: "tio",	cmd: "/opt/julia1x/bin/julia f" },
	{ n:228,  name: "Charcoal",			type: "tio",	cmd: "/opt/charcoal/charcoal.py f" },
	// This is how TIO uses it. InPuzzlang can also execute bf code directly, but that doesn't work with polyglot.
	{ n:229,  name: "Puzzlang",			type: "tio",	cmd: "lua /opt/puzzlang/InPuzzlang.lua f x >&2; /opt/brainfuck/brainfuck x" },
	{ n:230,  name: "COBOL",			type: "tio",	cmd: ">.input.tio; sed s/.code.tio/f/g /srv/wrappers/cobol-gnu | bash" }, // works w/o -facucomment
	{ n:231,  name: "LMBM",				type: "tio",	cmd: "python3 /opt/lmbm/lmbm.py f" },
	{ n:232,  name: "-XRebindableSyntax",type:"tio",	cmd: "mv f f.lhs; runghc -cpp -XRebindableSyntax f.lhs" },
	{ n:233,  name: "Gofer",			type: "tio",	cmd: "mv f f.lhs; >.input.tio; sed 's/.code.tio.c/f.c/g; s/.code.tio/f.lhs/g' /srv/wrappers/haskell-gofer | bash" },
	{ n:234,  name: "shortC",			type: "tio",	cmd: "/opt/shortc/run < f | gcc -xc -lm -; ./a.out" },
	{ n:235,  name: "Perl6-Pugs",		type: "local",	cmd: "..\\Pugs\\r tmp" },
	{ n:236,  name: "Chip",				type: "tio",	cmd: "/opt/chip/chip.py -w f 2>x" },
	{ n:237,  name: "Perl6-Niecza",		type: "tio",	cmd: "/opt/perl6-niecza/mono/bin/mono /opt/perl6-niecza/run/Niecza.exe f" },
	{ n:238,  name: "a-gram",			type: "tio",	cmd: "ruby /opt/a-gram/agram.rb f" },
	{ n:239,  name: "Triple Threat",	type: "tio",	cmd: "python3 /opt/triple-threat/tt.py f" },

	{ n:240,  name: "Nikud",			type: "tio",	cmd: ">.input.tio; sed 's/#!.*//; s/.code.tio/f/g' /srv/wrappers/nikud | node" },
	{ n:241,  name: "Sumerian",			type: "tio",	cmd: "python3 /opt/sumerian/interpreter.py f" },
	{ n:242,  name: "osh",				type: "tio",	cmd: "/opt/osh/bin/osh f" },
	{ n:243,  name: "Re:direction",		type: "tio",	cmd: "perl /opt/re-direction/redirection.pl -A f" },
	{ n:244,  name: "bosh",				type: "tio",	cmd: "/opt/bosh/sh/OBJ/x86_64-linux-gcc/sh f" },
	{ n:245,  name: "RETURN",			type: "tio",	cmd: "python2 /opt/return/return.py f" },
	{ n:246,  name: "-XPostfixOperators",type:"tio",	cmd: "mv f f.lhs; runghc -cpp -XPostfixOperators f.lhs" },
	{ n:247,  name: "Perl5-cperl",		type: "tio",	cmd: "/opt/perl5-cperl/bin/cperl* f" },
	{ n:248,  name: "Granule",			type: "tio",	cmd: "mv f f.md; /opt/granule/bin/gr f.md --no-info --literate-env-name x" },
	{ n:249,  name: "Oration",			type: "tio",	cmd: "python2 /opt/oration/Assorted-Programming-Languages/oration/oration.py f 2" },
	{ n:250,  name: "Retina 1",			type: "tio",	cmd: "/opt/retina1/linux-x64/Retina f" },
	{ n:251,  name: "psPILOT",			type: "tio",	cmd: "pwsh /opt/pilot-pspilot/psPILOT.ps1 f" },

	{ n:252,  name: "Ahead",			type: "local",	cmd: "..\\Ahead\\r tmp" },
	{ n:253,  name: "BrainSpace",		type: "tio",	cmd: "java -jar /opt/brainspace/dist/BS1-CLI.jar f" },
	{ n:254,  name: "DOBELA-dobcon",	type: "tio",	cmd: "/opt/dobela-dobcon/dobcon/dobcon f" },
	{ n:255,  name: "AlphaBeta",		type: "tio",	cmd: "/opt/alphabeta/ab f" },
	{ n:256,  name: "ETA",				type: "tio",	cmd: "/opt/eta/eta f" },
	{ n:257,  name: "Chrome-JS",		type: "local",	cmd: "..\\HTML_JavaScript_Chrome\\r tmp",	gui: true },
	{ n:258,  name: "Chrome-CSS",		type: "local",	cmd: "..\\HTML_CSS_Chrome\\r tmp",			gui: true },
	{ n:259,  name: "Firefox-JS",		type: "local",	cmd: "..\\HTML+JavaScript_Firefox\\r tmp",	gui: true },
	{ n:260,  name: "IE11-CSS",			type: "local",	cmd: "..\\HTML+CSS_IE11\\r tmp",			gui: true },
	{ n:261,  name: "-XUnicodeSyntax",	type: "tio",	cmd: "mv f f.lhs; runghc -cpp -XUnicodeSyntax f.lhs" },
	{ n:262,  name: "IE11-JS",			type: "local",	cmd: "..\\HTML+JavaScript_IE11\\r tmp",		gui: true },
	{ n:263,  name: "-XTemplateHaskell",type: "tio",	cmd: "mv f f.lhs; runghc -cpp -XTemplateHaskell f.lhs" },
	{ n:264,  name: "-XScopedTypeVariables",type:"tio",	cmd: "mv f f.lhs; runghc -cpp -XScopedTypeVariables f.lhs" },
	{ n:265,  name: "IE6-JS",			type: "local",	cmd: "..\\HTML+JavaScript_IE6\\r tmp",		gui: true },
	{ n:266,  name: "Navigator9-CSS",	type: "local",	cmd: "..\\HTML+CSS_Navigator_9\\r tmp",		gui: true },
	{ n:267,  name: "Opera9-JS",		type: "local",	cmd: "..\\HTML+JavaScript_Opera_9.64\\r tmp",gui: true },

	{ n:268,  name: "Versert",			type: "tio",	cmd: "/opt/versert/versert f" },
	{ n:269,  name: "Kipple-cipple",	type: "tio",	cmd: "/opt/kipple-cipple/cipple f" },
	{ n:270,  name: "REBOL 3",			type: "tio",	cmd: "/opt/rebol3/r3 -q f" },
	{ n:271,  name: "Klein 000",		type: "tio",	cmd: "python2 /opt/klein/klein.py -c f 000" },
	{ n:272,  name: "Klein 010",		type: "tio",	cmd: "python2 /opt/klein/klein.py -c f 010" },
	{ n:273,  name: "Alphabetti spaghetti", type:"tio",	cmd: "/opt/alphabetti-spaghetti/as f" },
	{ n:274,  name: "Klein 111",		type: "tio",	cmd: "python2 /opt/klein/klein.py -c f 111" },

	{ n:275,  name: "Safari5-JS",		type: "local",	cmd: "..\\HTML_JS_Safari_5\\r tmp",			gui: true },
	{ n:276,  name: "Safari5-CSS",		type: "local",	cmd: "..\\HTML_CSS_Safari_5\\r tmp",		gui: true },
	{ n:277,  name: "Brainlove",		type: "tio",	cmd: "/opt/brainfuck/brainlove f" },
	{ n:278,  name: "ext bf i",			type: "tio",	cmd: "/opt/brainfuck/extended-brainfuck-type-i f" },
	{ n:279,  name: "Befunge-97-MTFI",	type: "tio",	cmd: "/opt/befunge-97-mtfi/mtfi --funge-97 f" },
	{ n:280,  name: "Befunge-97-MTFI",	type: "tio",	cmd: "/opt/befunge-97-mtfi/mtfi --befunge-96 f" },
	{ n:281,  name: "Wenyan",			type: "local",	cmd: "..\\wenyan-lang\\r tmp" },

	{ n:282,  name: "posh",				type: "local",	cmd: "..\\posh\\r tmp" },
	{ n:283,  name: "Zetaplex",			type: "local",	cmd: "..\\Zetaplex\\r tmp",					gui: true },
	{ n:284,  name: "Befunge-98-pyfunge",type:"tio",	cmd: "pyfunge -v98 f" },
	{ n:285,  name: "Befunge-98-cfunge",type: "local",	cmd: "..\\Befunge-98-cfunge\\r tmp" },
	{ n:286,  name: "Trefunge-98-CCBI",	type: "local",	cmd: "..\\Trefunge-98-CCBI\\r tmp" },
	{ n:287,  name: "Refunge",			type: "local",	cmd: "..\\Refunge\\r tmp" },
	{ n:288,  name: "Pascal",			type: "local",	cmd: "..\\Pascal\\r tmp" },
	{ n:289,  name: "Befunge-98-efunge",type: "local",	cmd: "..\\Befunge-98-efunge\\r tmp" },
	{ n:290,  name: "J-uby",			type: "tio",	cmd: "ruby /opt/j-uby/func.rb f" },
	{ n:291,  name: "Idris2",			type: "local",	cmd: "..\\Idris2\\r tmp" },
	{ n:292,  name: "Pari/GP",			type: "tio",	cmd: "gp -q f" },

	{ n:293,  name: "Sardonyx",			type: "local",	cmd: "..\\Sardonyx\\r tmp" },
	{ n:294,  name: "Ring",				type: "tio",	cmd: ">.input.tio; sed s/.code.tio/f/g /srv/wrappers/ring | bash" },
	{ n:295,  name: "Elixir",			type: "tio",	cmd: "elixir f" },
	{ n:296,  name: "CMake",			type: "tio",	cmd: "cmake -P f" },
	{ n:297,  name: "Onyx",				type: "local",	cmd: "..\\Onyx\\r tmp" },
	{ n:298,  name: "Joy",				type: "tio",	cmd: "cp -r /opt/joy/* .; sed -i s/255/4096/ globals.h 2>x; gcc *.c -lm; ./a.out f" },
	{ n:299,  name: "Wierd-John",		type: "tio",	cmd: 'gcc -xc -<<< $1; ./a.out f',			arg: "langs/wierd.c" },
	{ n:300, name:"↑110010000100110110010",type:"local",cmd: "..\\_110010000100110110010\\r tmp" },

	{ n:301,  name: "HTMLayout",		type: "local",	cmd: "..\\HTML_CSS_HTMLayout\\r tmp",		gui: true },
	{ n:302,  name: "Sciter.TIS",		type: "local",	cmd: "..\\HTML_TIScript_Sciter\\r tmp",		gui: true },
	{ n:303,  name:"-XLexicalNegation",	type: "ato",	id: "haskell",	opt:["-x", "lhs", "-cpp", "-XLexicalNegation"] },
	{ n:304,  name: "IE6-CSS",			type: "local",	cmd: "..\\HTML_CSS_IE6\\r tmp",				gui: true },
	{ n:305,  name: "IE7-CSS",			type: "local",	cmd: "..\\HTML_CSS_IE7\\r tmp",				gui: true },
	{ n:306,  name: "IE7-JS",			type: "local",	cmd: "..\\HTML_JS_IE7\\r tmp",				gui: true },
	{ n:307,  name: "IE8-JS",			type: "local",	cmd: "..\\HTML_JS_IE8\\r tmp",				gui: true },
	{ n:308,  name: "IE4-JS",			type: "local",	cmd: "..\\HTML_JS_IE4\\r tmp",				gui: true },
	{ n:309,  name: "IE4-CSS",			type: "local",	cmd: "..\\HTML_CSS_IE4\\r tmp",				gui: true },
	{ n:310,  name: "IE3.01-CSS",		type: "local",	cmd: "..\\HTML_CSS_IE_3.01\\r tmp",			gui: true },
	{ n:311,  name: "IE5-JS",			type: "local",	cmd: "..\\HTML_JS_IE5\\r tmp",				gui: true },
	{ n:312,  name: "IE5.5-JS",			type: "local",	cmd: "..\\HTML_JS_IE_5.5\\r tmp",			gui: true },
	{ n:313,  name: "Lolwho.Cares",		type: "tio",	cmd: "node -<<< $1 f",						arg: "langs/lolwhocares.js" },
	{ n:314,  name: "IE8-CSS",			type: "local",	cmd: "..\\HTML_CSS_IE8\\r tmp",				gui: true },
	{ n:315,  name: "IE9-JS",			type: "local",	cmd: "..\\HTML_JS_IE9\\r tmp",				gui: true },
	{ n:316,  name: "IE9-CSS",			type: "local",	cmd: "..\\HTML_CSS_IE9\\r tmp",				gui: true },

	{ n:317,  name: "Z80Golf",			type: "tio",	cmd: "/opt/z80golf/src/z80golf f" },
	{ n:318,  name: "05AB1E",			type: "tio",	cmd: "/opt/osabie/osabie f" },
	{ n:319,  name: "Tetr4phobi4",		type: "local",	cmd: "..\\Tetr4phobi4\\r tmp" },
	{ n:320,  name: "Affine Mess",		type: "tio",	cmd: 'python3 -<<< $1 f',					arg: "langs/affine-mess.py" },
	{ n:321,  name: "*><>",				type: "tio",	cmd: "/opt/starfish/go/bin/starfish f" },
	{ n:322,  name: "Twue",				type: "local",	cmd: "..\\Twue\\r tmp" },
	{ n:323,  name: "Maze",				type: "local",	cmd: "..\\Maze\\r tmp" },
	{ n:324,  name: "Befunk",			type: "local",	cmd: "..\\Befunk\\r tmp" },
	{ n:325,  name: "Treehugger",		type: "tio",	cmd: 'node -<<< $1 f',						arg: "langs/treehugger.js" },

	{ n:326,  name: "Bot Engine",		type: "tio",	cmd: "mv f f.x; java -cp /opt/bot-engine/bin BotEngine f.x" },
	{ n:327,  name: "Poetic",			type: "tio",	cmd: 'python3 -<<< $1 f',					arg: "langs/poetic.py" },
	{ n:328,  name: "DipDup",			type: "tio",	cmd: 'echo "$1" > x; runghc x f',			arg: "langs/dipdup.hs" },
	{ n:329,  name: "Befunge-109-cfunge",type:"local",	cmd: "..\\Befunge-109-cfunge\\r tmp" },
	{ n:330,  name: "Batch",			type: "local",	cmd: "..\\BAT\\r tmp" },
	{ n:331,  name: "PowerShell",		type: "tio",	cmd: "pwsh f" },
	{ n:332,  name: "bc -s",			type: "tio",	cmd: "bc -s f" },
	{ n:333,  name: "bc",				type: "tio",	cmd: "bc f" },
	                                	
	{ n:334,  name: "HTA",				type: "local",	cmd: "..\\HTA\\r tmp",						gui: true },
	{ n:335,  name: "OS/2 Batch",		type: "local",	cmd: "..\\OS2_BAT\\r tmp" },
	{ n:336,  name: "WinXP Batch",		type: "local",	cmd: "..\\WindowsXP_BAT\\r tmp" },
	{ n:337,  name: "ReactOS Batch",	type: "local",	cmd: "..\\ReactOS_BAT\\r tmp" },
	{ n:338,  name: "Rexx",				type: "tio",	cmd: "rexx f" },
	{ n:339,  name: "Ruby -x",			type: "tio",	cmd: "ruby -x f" },
	{ n:340,  name: "Perl -x",			type: "tio",	cmd: "perl -x f" },

	{ n:341,  name: "NT4 Batch",		type: "local",	cmd: "..\\NT4_BAT\\r tmp" },
]                                   	
