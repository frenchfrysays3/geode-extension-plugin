// Import VSCode API
import * as vscode from 'vscode';

// Import Node.js modules
import { spawn } from 'child_process';
import * as fs from 'fs';

// Helper functions

function getWorkspacePath(): string | undefined {
    // Check if any workspace folders are open and return the path of the first one.
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        return vscode.workspace.workspaceFolders[0].uri.fsPath;
    }
    return undefined;
}

function buildDefault(Output: vscode.OutputChannel) {
	if (getWorkspacePath() === undefined) {
		vscode.window.showErrorMessage('This command required at least one workspace folder open.');
	}

	Output.clear();
	Output.show();
	Output.appendLine('Executing command: cmake -B build');

	const configureProcess = spawn('geode', ['build'], { cwd: getWorkspacePath() });

	configureProcess.stdout.on('data', (data) => {
		Output.append(data.toString());
	});

	configureProcess.stderr.on('data', (data) => {
		Output.append(DataView.toString());
	});

	configureProcess.on('close', (code) => {
		if (code === 0) {
			vscode.window.showInformationMessage('Configure completed.');
			Output.appendLine('Configure completed. CMake exited with code 0.');
		} else {
			vscode.window.showErrorMessage(`Configure incomplete. CMake Exited with Code ${code}`);
			Output.appendLine(`Configure incomplete. CMake Extied with Code ${code}`);
		}
	});
}

function buildWin(Output: vscode.OutputChannel) {
	if (getWorkspacePath() === undefined) {
		vscode.window.showErrorMessage('A folder is required for this command.');
	}

	Output.clear();
	Output.show();
	Output.appendLine('Executing Command: geode build -p windows');

	const buildProcess = spawn(
		'geode', 
		[
			'build', 
			'-p',
			'windows'
		],
		{
			cwd: getWorkspacePath()
		}
	);

	buildProcess.stdout.on('data', (data) => {
		Output.append(data.toString());
	});

	buildProcess.stderr.on('data', (data) => {
		Output.append(data.toString());
	});

	buildProcess.on('close', (code) => {
		if (code === 0) {
			vscode.window.showInformationMessage('Build finished. Code 0.');
			Output.append('Build Finished with Code 0.');
		} else {
			vscode.window.showErrorMessage(`Build finished with code ${code}. Unsuccessful build.`);
		}
	});
}

function buildMac(Output: vscode.OutputChannel) {
	if (getWorkspacePath() === undefined) {
		vscode.window.showErrorMessage('A folder is required for this command.');
	}

	Output.clear();
	Output.show();
	Output.appendLine('Executing Command: geode build -p mac-os');

	const buildProcess = spawn(
		'geode', 
		[
			'build', 
			'-p',
			'mac-os'
		],
		{
			cwd: getWorkspacePath()
		}
	);

	buildProcess.stdout.on('data', (data) => {
		Output.append(data.toString());
	});

	buildProcess.stderr.on('data', (data) => {
		Output.append(data.toString());
	});

	buildProcess.on('close', (code) => {
		if (code === 0) {
			vscode.window.showInformationMessage('Build finished. Code 0.');
			Output.append('Build Finished with Code 0.');
		} else {
			vscode.window.showErrorMessage(`Build finished with code ${code}. Unsuccessful build.`);
			Output.append(`Build finished with code ${code}. Unsuccessful build.`);
		}
	});
}

function buildIos(Output: vscode.OutputChannel) {
	if (getWorkspacePath() === undefined) {
		vscode.window.showErrorMessage('A folder is required for this command.');
	}

	Output.clear();
	Output.show();
	Output.appendLine('Executing Command: geode build -p ios');

	const buildProcess = spawn(
		'geode', 
		[
			'build', 
			'-p',
			'ios'
		],
		{
			cwd: getWorkspacePath()
		}
	);

	buildProcess.stdout.on('data', (data) => {
		Output.append(data.toString());
	});

	buildProcess.stderr.on('data', (data) => {
		Output.append(data.toString());
	});

	buildProcess.on('close', (code) => {
		if (code === 0) {
			vscode.window.showInformationMessage('Build finished. Code 0.');
			Output.append('Build Finished with Code 0.');
		} else {
			vscode.window.showErrorMessage(`Build finished with code ${code}. Unsuccessful build.`);
			Output.append(`Build finished with code ${code}. Unsuccessful build.`);
		}
	});
}

function buildAndroid(Output: vscode.OutputChannel) {
	if (getWorkspacePath() === undefined) {
		vscode.window.showErrorMessage('A folder is required for this command.');
	}

	Output.clear();
	Output.show();
	Output.appendLine('Executing Command: geode build -p android');

	const buildProcess = spawn(
		'geode', 
		[
			'build', 
			'-p',
			'android'
		],
		{
			cwd: getWorkspacePath()
		}
	);

	buildProcess.stdout.on('data', (data) => {
		Output.append(data.toString());
	});

	buildProcess.stderr.on('data', (data) => {
		Output.append(data.toString());
	});

	buildProcess.on('close', (code) => {
		if (code === 0) {
			vscode.window.showInformationMessage('Build finished. Code 0.');
			Output.append('Build Finished with Code 0.');
		} else {
			vscode.window.showErrorMessage(`Build finished with code ${code}. Unsuccessful build.`);
			Output.append(`Build finished with code ${code}. Unsuccessful build.`);
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
	const commandActivate = 'geodeplugin.activateextension';
	let defaultBuildFolder = 'build';

	let defaultBuildFolderExists;

	// See if the default build folder exists
	if (fs.existsSync(defaultBuildFolder) && fs.statSync(defaultBuildFolder).isDirectory()) {
		defaultBuildFolderExists = true;
	} else {
		defaultBuildFolderExists = false;
	}

	// Create terminal
	const Terminal = vscode.window.createTerminal('Build');
	// Create Output channel for logging
	const Output = vscode.window.createOutputChannel('Geode Plugin');
	const Build = vscode.window.createOutputChannel('Geode Plugin/build');

	// Build for default command handler
	const commandBuildDefaultHandler = () => {
		buildDefault(Build);
		Output.appendLine('Building for the Default Platform...');
	};

	// Build for Windows command handler
	const commandBuildWinHandler = () => {
		buildWin(Build);
		Output.appendLine('Building for Windows...');
	};

	// Build for Mac command handler
	const commandBuildMacHandler = () => {
		buildMac(Build);
		Output.appendLine('Building for macOS...');
	};

	const commandBuildIosHandler = () => {
		buildIos(Build);
		Output.appendLine('Building for iOS...');
	};

	const commandBuildAndroidHandler = () => {
		buildAndroid(Build);
		Output.appendLine('Building for android...');
	};

	const commandActivateHandler = () => {
		if (fs.existsSync('CMakeLists.txt') === false && fs.existsSync('mod.json') === false) {
			vscode.window.showErrorMessage('Please make sure that a CMakeLists.txt and a mod.json file are present.');
			deactivate();
		}
		vscode.window.showInformationMessage('Extension is active.');
		Output.appendLine('Extension activated.');
	};

	// Push commands
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildDefault, commandBuildDefaultHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildWin, commandBuildWinHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildMac, commandBuildMacHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildIos, commandBuildIosHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildAndroid, commandBuildAndroidHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandActivate, commandActivateHandler));

	// Push output windows for logging
	context.subscriptions.push(Output);
	context.subscriptions.push(Build);
}

export function deactivate() {}
