import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as fs from 'fs';

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
		

	};

	// push output channel
	context.subscriptions.push(Output);
}

export function deactivate() {

}
