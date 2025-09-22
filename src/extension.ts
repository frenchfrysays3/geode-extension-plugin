import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';

// Helper functions

function getOS(): string {
	return os.platform();
}
function configureDefault(Terminal: vscode.Terminal) {
	if (getOS() === 'win32') {
		Terminal.sendText('cls', true);
	} else {
		Terminal.sendText('clear', true);
	}

	Terminal.show();
	Terminal.sendText('cmake -B build', true);
}

function buildDefault(Terminal: vscode.Terminal) {
	if (getOS() === 'win32') {
		Terminal.sendText('cls', true);
	} else {
		Terminal.sendText('clear', true);
	}

	Terminal.show();
	Terminal.sendText('cmake --build build --config RelWithDebInfo', true);
}

function buildWin(Terminal: vscode.Terminal) {
	if (getOS() === 'win32') {
		Terminal.sendText('cls', true);
	} else {
		Terminal.sendText('clear', true);
	}

	Terminal.show();
	Terminal.sendText('geode build -p windows', true);
}

function buildMac(Terminal: vscode.Terminal) {
	if (getOS() === 'win32') {
		Terminal.sendText('cls', true);
	} else {
		Terminal.sendText('clear', true);
	}

	Terminal.show();
	Terminal.sendText('geode build -p mac-os');
}

function buildIos(Terminal: vscode.Terminal) {
	if (getOS() === 'win32') {
		Terminal.sendText('cls', true);
	} else {
		Terminal.sendText('clear', true);
	}

	Terminal.show();
	Terminal.sendText('geode build -p ios', true);
}

function buildAndroid(Terminal: vscode.Terminal) {
	if (getOS() === 'win32') {
		Terminal.sendText('cls', true);
	} else {
		Terminal.sendText('clear', true);
	}

	Terminal.sendText(
		'geode build -p android',
		true
	);
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

	// Build for default command handler
	const commandBuildDefaultHandler = () => {
		configureDefault(Terminal);
		buildDefault(Terminal);
		Output.appendLine('Building for the Default Platform...');
	};

	// Build for Windows command handler
	const commandBuildWinHandler = () => {
		buildWin(Terminal);
		Output.appendLine('Building for Windows...');
	};

	// Build for Mac command handler
	const commandBuildMacHandler = () => {
		buildMac(Terminal);
		Output.appendLine('Building for macOS...');
	};

	const commandBuildIosHandler = () => {
		buildIos(Terminal);
		Output.appendLine('Building for iOS...');
	};

	const commandBuildAndroidHandler = () => {
		buildAndroid(Terminal);
		Output.appendLine('Building for android...');
	};

	const commandActivateHandler = () => {
		Output.appendLine('Extension Activated.');
		Output.show(true);
	};

	// Push commands
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildDefault, commandBuildDefaultHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildWin, commandBuildWinHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildMac, commandBuildMacHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildIos, commandBuildIosHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandBuildAndroid, commandBuildAndroidHandler));
	context.subscriptions.push(vscode.commands.registerCommand(commandActivate, commandActivateHandler));

	// Push output window for logging
	context.subscriptions.push(Output);
}

export function deactivate() {}
