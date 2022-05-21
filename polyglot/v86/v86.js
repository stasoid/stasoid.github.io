function v86_create()
{
	let bin = "https://raw.githubusercontent.com/stasoid/polyglot-v86-binaries/main/";
	emulator = new V86Starter({
		wasm_path: bin + "v86.wasm",
		bios:      { url: bin + "seabios.bin" },
		vga_bios:  { url: bin + "vgabios.bin" },
		bzimage:   { url: bin + "buildroot-bzimage.bin" },
		filesystem: { basefs: bin + "mnt/fs.json", baseurl: bin + "mnt/" },
		//screen_container: screen_container,
		autostart: true
	});

	emulator.add_listener("serial0-output-char", first_time_listener);
}

let serial_data = "";
function first_time_listener(ch)
{
	serial_data += ch;
	if(serial_data.endsWith("~% ")) on_linux_booted();
	else if(serial_data.endsWith("install finished\r\nmnt% ")) on_install_finished();
}

function on_linux_booted()
{
	console.log("v86: linux booted");
	emulator.serial0_send("cd /mnt\nsh install\n");
}

let install_finished = false;
let autostart_commands = false;
function on_install_finished()
{
	console.log("v86: install finished");
	emulator.remove_listener("serial0-output-char", first_time_listener);
	emulator.add_listener("serial0-output-char", command_listener);
	install_finished = true;
	if(autostart_commands) v86_run_next();
}

function command_listener(ch)
{
	serial_data += ch;
	// all commands are executed in /mnt
	if(serial_data.endsWith("mnt% ")) on_command_finished();
}

function on_command_finished()
{
	Promise.all([
		emulator.fs9p.read_file("stdout"),
		emulator.fs9p.read_file("stderr"),
	]).then(([stdout, stderr]) => {
		let decode = a => new TextDecoder().decode(a);
		// read_file returns null if file is empty, decode fails on null
		stdout = stdout ? decode(stdout) : "";
		stderr = stderr ? decode(stderr) : "";
		onfinish(cur_lang, stdout, stderr, "", v86_run_next);
	});
}

function v86_run(cmd, timeout)
{
	emulator.serial0_send(cmd + ">stdout 2>stderr\n");
}

async function v86_run_all(code)
{
	let data = new TextEncoder().encode(code);
	await v86_write_file("f", data);

	// if install is finished just run the first command
	if(install_finished)
		v86_run_next();
	// otherwise tell to run first command after install is finished
	else
		autostart_commands = true;
}

let cur_lang = 0; // language currently being processed

// run next untested lang
function v86_run_next()
{
	let n = v86_queue.shift();
	if(n)
	{
		cur_lang = n;
		let lang = langs[n];
		let t = lang.timeout || 5;
		v86_run(lang.cmd, t);
	}
	else
		cur_lang = 0;
}

// based on create_file in starter.js; this version returns a promise
function v86_create_file(file, data)
{
	let name = file.split("/").at(-1);
	let parent_id = emulator.fs9p.SearchPath(file).parentid;
	let not_found = name === "" || parent_id === -1;

	if(!not_found)
		return emulator.fs9p.CreateBinaryFile(name, parent_id, data);
	else
		return Promise.reject(new FileNotFoundError());
};


// based on read_file in filesystem.js
function v86_write_file(file, data)
{
	let p = emulator.fs9p.SearchPath(file);

	if(p.id === -1)
		return v86_create_file(file, data);

	return emulator.fs9p.Write(p.id, 0, data.length, data);
};
