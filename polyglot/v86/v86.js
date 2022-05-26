//eval(readfile("v86/libv86.js")); // import libv86

function v86_start()
{
	let bin = "https://raw.githubusercontent.com/stasoid/polyglot-v86-binaries/main/";
	emulator = new V86Starter({
		wasm_path: bin + "v86.wasm",
		bios:      { url: bin + "seabios.bin" },
		vga_bios:  { url: bin + "vgabios.bin" },
		bzimage:   { url: bin + "buildroot-bzimage.bin" },
		filesystem: { basefs: bin + "mnt/fs.json", baseurl: bin + "mnt/" },
		//screen_container: screen_container,
		disable_mouse: true,
		autostart: true
	});

	let serial_data = "";
	emulator.add_listener("serial0-output-char", function(ch) {
		serial_data += ch;
		if(serial_data.endsWith("~% ")) on_linux_booted();
		else if(serial_data.endsWith("install finished\r\nmnt% ")) on_install_finished();
		// all commands are executed in /mnt
		else if(serial_data.endsWith("mnt% ")) on_command_finished();
	});
}

function on_linux_booted()
{
	print("v86: linux booted");
	emulator.serial0_send("cd /mnt && sh install\n");
}

let install_finished = false;
let autostart_commands = false;
function on_install_finished()
{
	print("v86: install finished");
	install_finished = true;
	if(autostart_commands) v86_run_next();
}

async function on_command_finished()
{
	print(`v86: command \`${langs[cur_lang].cmd}\` finished`);

	let stdout = await v86_read_file("stdout");
	let stderr = await v86_read_file("stderr");

	// stdout/stderr may be null, see https://github.com/copy/v86/issues/659
	stdout = stdout ? decode(stdout) : "";
	stderr = stderr ? decode(stderr) : "";

	onfinish(cur_lang, stdout, stderr, "", v86_run_next);
}

function v86_run(lang)
{
	let timeout = lang.timeout || 5;
	emulator.serial0_send(lang.cmd + ">stdout 2>stderr\n");
}

async function v86_run_all(code)
{
	await v86_write_file("f", encode(code));
	// verify
	if(decode(await v86_read_file("f")) != code) { error("v86_write_file failed"); return; }

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
		v86_run(langs[n]);
	}
	else
		cur_lang = 0;
}

// based on create_file in starter.js
// this version returns a promise so it is usable from v86_write_file
function v86_create_file(file, data)
{
	let name = file.split("/").at(-1);
	let parent_id = emulator.fs9p.SearchPath(file).parentid;
	let not_found = name === "" || parent_id === -1;

	if(!not_found)
		return emulator.fs9p.CreateBinaryFile(name, parent_id, data);
	else
		return Promise.reject(new FileNotFoundError());
}


// based on read_file in filesystem.js
async function v86_write_file(file, data)
{
	let p = emulator.fs9p.SearchPath(file);

	if(p.id === -1)
		return v86_create_file(file, data);

	await emulator.fs9p.ChangeSize(p.id, data.length);
	return emulator.fs9p.Write(p.id, 0, data.length, data);
}

v86_read_file = f => emulator.fs9p.read_file(f);
