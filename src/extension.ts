
import * as vscode from 'vscode';
import { createReadmeArchive, getCurrentDir } from './utils/utils';
import { setApiToken, getApiToken, resetToken } from './utils/api.utils';



export function activate(context: vscode.ExtensionContext) {

	const setApi = vscode.commands.registerCommand("extension.setApiToken", () => setApiToken(context));
	const getApi = vscode.commands.registerCommand("extension.getApiToken", () => getApiToken(context));
	const resetApi = vscode.commands.registerCommand("extension.resetApiToken", () => resetToken(context));
	const generateReadme = vscode.commands.registerCommand('extension.generateReadme', () => {
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Criando Readme",
			cancellable: false
		}, (progress, token) => {
			token.onCancellationRequested(() => {
				vscode.window.showWarningMessage("Operação cancelada pelo usuário");
			});

			return createReadmeArchive(context);
		});

	});

	const getCurrentDirCMD = vscode.commands.registerCommand("extension.getCurrentDir", () => getCurrentDir());

	context.subscriptions.push(setApi, getApi, resetApi, getCurrentDirCMD, generateReadme);
}


export function deactivate() { }
