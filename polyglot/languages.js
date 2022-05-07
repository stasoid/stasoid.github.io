// Important: I use s/.code.tio/f/g instead of s/\.code\.tio/f/g because the result is the same.
// !Don't forget to escape \ like in \\.agda
// Calling a wrapper: >.input.tio; sed s/.code.tio/f/g /srv/wrappers/cyclone | bash

// Officially switched interps for alphuck, what and ChuckScript.

var langs = [
	,
	{ n:1,	  name: "Python-3", 		type: "tio", 	cmd: "python3 f" },
	{ n:2,	  name: "V(Vim)", 			type: "tio", 	cmd: "/opt/v/v f -v" },
	{ n:3,	  name: "Minkolang",		type: "tio", 	cmd: "mv f f.mkl; python3 /opt/minkolang/minkolang_0.15.py f.mkl" },
	{ n:4,	  name: "><>", 				type: "tio", 	cmd: "python3 /opt/fish/fish.py f" },
//	{ n:5,	  name: "Python 2", 		type: "tio", 	cmd: "python2 f" },
//	{ n:6,	  name: "SMBF", 			type: "tio", 	cmd: "/opt/smbf/smbf f" },
//	{ n:7,	  name: "Japt 1.4", 		type: "tio", 	cmd: "git -C /opt/japt archive 21099dba | tar -x; >.input.tio; cat /srv/wrappers/japt | sed 's/#!.*//; s|/opt/japt|.|g; s/.code.tio/f/g' | node" },
//	{ n:8,	  name: "Retina 0.8.4",		type: "tio", 	cmd: "mono /opt/retina/Retina.exe f" },
//	{ n:9,	  name: "Perl 5", 			type: "tio", 	cmd: "perl f" },
//	{ n:10,	  name: "Befunge-93", 		type: "tio", 	cmd: "mv f f.x; /opt/befunge/bin/bef -q f.x" },
]                                   	
