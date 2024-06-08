import * as vscode from 'vscode';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { getReadmeContentFromAI } from './api.utils';


export function getCurrentDir() {
    if (vscode.workspace.workspaceFolders) {
        // Obtém o primeiro workspace (podem existir vários, mas vamos pegar apenas o primeiro)
        const workspaceFolder = vscode.workspace.workspaceFolders[0];
        // Obtém o caminho do diretório do workspace
        const workspaceFolderPath = workspaceFolder.uri.fsPath;
        // Exibe uma mensagem com o caminho do diretório do workspace
        return workspaceFolderPath;
    }
    return undefined;

}

export function listDirectories(directoryPath?: string) {
    const directoryObject: any = {};

    if (!directoryPath) {
        return "No dir path given!";
    }

    const items = readdirSync(directoryPath);

    items.forEach(item => {
        if (item !== "node_modules") {
            const itemPath = join(directoryPath, item);
            const stats = statSync(itemPath);

            if (stats.isDirectory()) {
                // Item é um diretório, cria um objeto vazio para representá-lo
                directoryObject[item] = listDirectories(itemPath);
            } else {
                // Item é um arquivo, apenas adiciona ao objeto
                directoryObject[item] = 'Arquivo';
            }
        }
    });

    return JSON.stringify(directoryObject);
}


export async function createReadmeArchive(context: vscode.ExtensionContext) {
    const filename = 'Readme.md';
    const workspaceFolderPath = getCurrentDir();

    if (workspaceFolderPath) {

        const token = context.globalState.get('apiToken');

        if (!token) {
            return vscode.window.showErrorMessage("Can't create Readme file because the Api token was not configured!");
        }




        try {
            const filePath = join(workspaceFolderPath, filename);

            const markdownContent = await getReadmeContentFromAI(context, listDirectories(getCurrentDir()));
            const readmeTextEncoded = new TextEncoder().encode(markdownContent);

            const fileUri = vscode.Uri.file(filePath);
            await vscode.workspace.fs.writeFile(fileUri, readmeTextEncoded);

            vscode.window.showInformationMessage('Readme created sucefully!');

        } catch (error: any) {
            vscode.window.showErrorMessage(`There is an error when it tried to create file:${error.message}`);
        }

    } else {
        vscode.window.showErrorMessage("Can't find any workspace. Please, open or create one");
    }


}