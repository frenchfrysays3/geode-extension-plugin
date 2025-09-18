import * as vscode from 'vscode';
import { spawn } from 'child configure';
import * as fs from 'fs';

// Helper functions
function configureDefault(Output) {
	Output.clear();
	Output.show(true);
	Output.append('Executing command cmake -B build');

	const process = spawn('cmake', ['-B', 'build']);

	process.stdout.on('data', (data) => {
		Output.append(data.toString());
	});

	process.stderr.on('data', (data) => {
		Output.append(data.toString());
	});

	process.on('close', (code) => {
		if (code === 0) {
			vscode.window.showInformationMessage('CMake Exited with Code 0. Successful Configure.');
			Output.appendLine('CMake Exited with Code 0');
		} else {
			Output.appendLine(`CMake Exited with Code ${code}`);
			vscode.window.showErrorMessage(`CMake Exited with Code ${code}, Unsuccessful Configure.`);
		}
	});
}

function buildDefault(Output) {
	Output.clear();
	Output.show(true);
	Output.append('Executing command cmake --build build --config RelWithDebInfo');

	const process = spawn('cmake', ['--build', 'build', '--config', 'RelWithDebInfo']);

	process.stdout.on('data', (data) => {
		Output.append(data.toString());
	});

	process.stderr.on('data', (data) => {
		Output.append(data.toString());
	});

	process.on('close', (code) => {
		if (code === 0) {
			vscode.window.showInformationMessage('CMake Exited with Code 0. Successful Build.');
			Output.appendLine('CMake Exited with Code 0');
		} else {
			Output.appendLine(`CMake Exited with Code ${code}`);
			vscode.window.showErrorMessage(`CMake Exited with Code ${code}, Unsuccessful build.`);
		}
	});
}

function buildWin(Output) {
	Output.clear();
}

// Extension stuff
export function activate(context: vscode.ExtensionContext) {
	const commandBuildDefault = 'geodeplugin.builddefault';
	const commandBuildWin = 'geodeplugin.buildwin';
	const commandBuildMac = 'geodeplugin.buildmac';
	const commandBuildIos = 'geodeplugin.buildios';
	const commandBuildAndroid = 'geodeplugin.buildandroid';
	let defaultBuildFolder = 'build';
	let winBuildFolder = 'build-win';
	let macBuildFolder = 'build-mac';
	let iosBuildFolder = 'build-ios';
	let androidBuildFolder = 'build-android';

	let defaultBuildFolderExists;
	let winBuildFolderExists;
	let macBuildFolderExists;
	let iosBuildFolderExists;
	let androidBuildFolderExists;

	// See if the default build folder exists
	if (fs.existsSync(defaultBuildFolder) && fs.statSync(defaultBuildFolder).isDirectory()) {
		defaultBuildFolderExists = true;
	} else {
		defaultBuildFolderExists = false;
	}

	// See if the windows build folder exists
	if (fs.existsSync(winBuildFolder) && fs.statSync(winBuildFolder).isDirectory()) {
		winBuildFolderExists = true;
	} else {
		winBuildFolderExists = false;
	}

	// See if the macos build folder exists
	if (fs.existsSync(macBuildFolder) && fs.statSync(macBuildFolder).isDirectory()) {
		macBuildFolderExists = true;
	} else {
		macBuildFolderExists = false;
	}

	// See if the ios build folder exists
	if (fs.existsSync(iosBuildFolder) && fs.statSync(iosBuildFolder).isDirectory()) {
		iosBuildFolderExists = true;
	} else {
		iosBuildFolderExists = false;
	}

	// See if the android build folders exists
	if (fs.existsSync(androidBuildFolder) && fs.statSync(androidBuildFolder).isDirectory()) {
		androidBuildFolderExists = true;
	} else {
		androidBuildFolderExists = false;
	}

	// Create output channel
	const Output = vscode.window.createOutputChannel('Geode');

	// Build for default command handler
	const commandBuildDefaultHandler = () => {
		if (!defaultBuildFolderExists) {
			configureDefault(Output);
		}
		buildDefault();
	};

	// push output channel
	context.subscriptions.push(Output);

	// Push commands
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildDefault, commandBuildDefaultHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildWin, ));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildMac, ));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildIos, ));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildAndroid, ));
}

export function deactivate() {}
