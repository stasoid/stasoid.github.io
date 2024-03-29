print = console.log;

$ = s => document.querySelector(s);
$$ = s => document.querySelectorAll(s);

encode = a => new TextEncoder().encode(a);
decode = a => new TextDecoder().decode(a);

function readfile(url)
{
	let xhr = new XMLHttpRequest;
	xhr.open('GET', url, false); // sync
	xhr.send();
	return xhr.responseText;
}

function error(msg)
{
	console.error(msg);
	internal_error = true;
}

String.prototype.rtrim = function(chars)
{
	let str = this;
	if(!chars) chars = " \r\n\t";
	while(chars.indexOf(str.at(-1)) != -1)
		str = str.slice(0,-1);
	return str;
}

// preserves order; first occurrence is kept
Array.prototype.uniq = function(){ return [...new Set(this)]; }
