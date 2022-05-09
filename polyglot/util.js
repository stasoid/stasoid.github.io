function readurl(url)
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
	while(chars.indexOf(str.slice(-1)) != -1)
		str = str.slice(0,-1);
	return str;
}
