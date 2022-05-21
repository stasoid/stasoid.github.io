$ = s => document.querySelector(s);
$$ = s => document.querySelectorAll(s);

function readfile(url)
{
	let xhr = new XMLHttpRequest;
	xhr.open('GET', url, false);
	xhr.send();
	return xhr.responseText;
}

function error(msg)
{
	console.error(msg);
	internal_error = true;
}

function trim_right(str, chars)
{
	if(!chars) chars = " \r\n\t";
	while(chars.indexOf(str.at(-1)) != -1)
		str = str.slice(0,-1);
	return str;
}

// preserves order; first occurrence is kept
Array.prototype.uniq = function(){ return [...new Set(this)]; }