import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as fs from 'fs';

// Helper functions
function configureDefault(Output: vscode.OutputChannel) {
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

function buildDefault(Output: vscode.OutputChannel) {
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

function buildWin(Output: vscode.OutputChannel) {
	Output.clear();
	Output.show();
	Output.append('Executing geode build -p windows');

	const process = spawn('geode', ['build', '-p', 'windows']);

	process.stdout.on('data', (data) => {
		Output.append(data.toString());
	});

	process.stderr.on('data', (data) => {
		Output.append(data.toString());
	});

	process.on('close', (code) => {
		if (code === 0) {
			vscode.window.showInformationMessage('Build finished with Code 0.');
		} else {
			vscode.window.showErrorMessage(`Build finished with exit code ${code}`);
		}
	});
}

function buildMac(Output: vscode.OutputChannel) {
	Output.clear();
	Output.show(true);
	Output.append('Executing command: geode build -p mac-os');

	const process = spawn('geode', ['build', '-p', 'mac-os']);

	process.stdout.on('data', (data) => {
		Output.append(data.toString());
	});

	process.stderr.on('data', (data) => {
		Output.append(data.toString());
	});

	process.on('close', (code) => {
		if (code === 0) {
			vscode.window.showInformationMessage('Build finished with Code 0.');
		} else {
			vscode.window.showErrorMessage(`Build finished with exit code ${code}`);
		}
	});
}

function buildIos(Output: vscode.OutputChannel) {
	Output.clear();
	Output.show(true);
	Output.append('Executing command: geode build -p ios');

	const process = spawn('geode', ['build', '-p', 'ios']);

	process.stdout.on('data', (data) => {
		Output.append(data.toString());
	});

	process.stderr.on('data', (data) => {
		Output.append(data.toString());
	});

	process.on('close', (code) => {
		if (code === 0) {
			vscode.window.showInformationMessage('Build finished with Code 0.');
		} else {
			vscode.window.showErrorMessage(`Build finished with exit code ${code}`);
		}
	});
}

function buildAndroid(Output: vscode.OutputChannel) {
	Output.clear();
	Output.show(true);
	Output.append('Executing command: geode build -p android');

	const process = spawn('geode', ['build', '-p', 'android']);

	process.stdout.on('data', (data) => {
		Output.append(data.toString());
	});

	process.stderr.on('data', (data) => {
		Output.append(data.toString());
	});

	process.on('close', (code) => {
		if (code === 0) {
			vscode.window.showInformationMessage('Build finished with Code 0.');
		} else {
			vscode.window.showErrorMessage(`Build finished with exit code ${code}`);
		}
	});
}

// Extension stuff
export function activate(context: vscode.ExtensionContext) {
	const commandBuildDefault = 'geodeplugin.builddefault';
	const commandBuildWin = 'geodeplugin.buildwin';
	const commandBuildMac = 'geodeplugin.buildmac';
	const commandBuildIos = 'geodeplugin.buildios';
	const commandBuildAndroid = 'geodeplugin.buildandroid';
	let defaultBuildFolder = 'build';

	let defaultBuildFolderExists;

	// See if the default build folder exists
	if (fs.existsSync(defaultBuildFolder) && fs.statSync(defaultBuildFolder).isDirectory()) {
		defaultBuildFolderExists = true;
	} else {
		defaultBuildFolderExists = false;
	}

	// Create output channel
	const Output = vscode.window.createOutputChannel('Geode/build');

	// Build for default command handler
	const commandBuildDefaultHandler = () => {
		if (!defaultBuildFolderExists) {
			configureDefault(Output);
		}
		buildDefault(Output);
	};

	// Build for Windows command handler
	const commandBuildWinHandler = () => {
		buildWin(Output);
	};

	// Build for Mac command handler
	const commandBuildMacHandler = () => {
		buildMac(Output);
	};

	const commandBuildIosHandler = () => {
		buildIos(Output);
	};

	const commandBuildAndroidHandler = () => {
		buildAndroid(Output);
	};

	// push output channel
	context.subscriptions.push(Output);

	// Push commands
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildDefault, commandBuildDefaultHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildWin, commandBuildWinHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildMac, commandBuildMacHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildIos, commandBuildIosHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildAndroid, commandBuildAndroidHandler));

	// Execute configure command
	configureDefault(Output);
}

export function deactivate() {}
