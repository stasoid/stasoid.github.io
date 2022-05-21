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
		let d = a => new TextDecoder().decode(a);
		v86_onfinish(d(stdout), d(stderr));
	});
}

let cur_lang; // language currently being processed

function v86_onfinish(stdout, stderr)
{
	//stderr = stderr ? " stderr=" + stderr : "";
	//console.log("on_command_finished: stdout=" + stdout + stderr);
	onfinish(cur_lang, stdout, stderr, "", v86_run_next);
}

function v86_run(cmd, timeout)
{
	emulator.serial0_send(cmd + ">stdout 2>stderr\n");
}

async function v86_run_all(code)
{
	let data = new TextEncoder().encode(code);
	await emulator.fs9p.write_file("f", data);

	// if install is finished just run the first command
	if(install_finished)
		v86_run_next();
	// otherwise tell to run first command after install is finished
	else
		autostart_commands = true;
}

// find and run next untested lang
function v86_run_next()
{
	while(1)
	{
		if(v86_queue.length == 0) break;
	
		let n = v86_queue.shift();
		if(langs[n].processed) continue;

		cur_lang = n;
		let lang = langs[n];
		lang.processed = true;
		let t = lang.timeout || 5;
		v86_run(lang.cmd, t);
		break;
	}
}

// based on create_file in starter.js; this version returns a promise
FS.prototype.create_file = function(file, data)
{
    let name = file.split("/").at(-1);
    let parent_id = this.SearchPath(file).parentid;
    let not_found = name === "" || parent_id === -1;

    if(!not_found)
        return this.CreateBinaryFile(name, parent_id, data);
    else
		return Promise.reject(new FileNotFoundError());
};


// based on read_file in filesystem.js
FS.prototype.write_file = function(file, data)
{
    let p = this.SearchPath(file);

    if(p.id === -1)
        return this.create_file(file, data);

    return this.Write(p.id, 0, data.length, data);
};