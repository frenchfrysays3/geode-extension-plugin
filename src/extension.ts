import * as vscode from 'vscode';
import { spawn } from 'child_process';
import fs;

export function activate(context: vscode.ExtensionContext) {
	const commandBuildDefault = 'geodeplugin.builddefault';
	const commandBuildWin = 'geodeplugin.buildwin';
	const commandBuildMac = 'geodeplugin.buildmac';
	const commandBuildIos = 'geodeplugin.buildios';
	const commandBuildAndroid = 'geodeplugin.buildandroid';
	let defaultBuildFolder;
	let winBuildFolder;
	let macBuildFolder;
	let iosBuildFolder;
	let androidBuildFolder;
	if (fs.) {}

	const Output = vscode.window.createOutputChannel('Geode');

	const commandBuildDefaultHandler = () => {


	}

	context.subscriptions.push(Output);
}

export function deactivate() {

}
