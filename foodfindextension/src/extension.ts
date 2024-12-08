import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

async function analyzeCode(codeSnippet: string, taskType: "smells" | "tests"): Promise<string> {
    const apiKey = process.env.API_KEY;
    const url = 'https://api.openai.com/v1/chat/completions';

    const promptMessage =
        taskType === "smells"
            ? `Analyze the following Angular code and detect any code smells or architectural issues:\n\n${codeSnippet}`
            : `Write unit tests for the following Angular code using the Jasmine framework. Include edge cases and ensure proper coverage:\n\n${codeSnippet}`;

    try {
        const response = await axios.post(url, {
            model: "gpt-3.5-turbo", // Or "gpt-4" if available
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant skilled in Angular development."
                },
                {
                    role: "user",
                    content: promptMessage
                }
            ],
            max_tokens: 500,
            temperature: 0.3,
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.choices && response.data.choices[0]) {
            return response.data.choices[0].message.content.trim();
        } else {
            throw new Error("Unexpected API response structure");
        }
    } catch (error) {
        console.error("Failed to analyze code:", error);

        if (axios.isAxiosError(error)) {
            console.error("Axios error details:", error.response?.data || error.message);
        }

        return "Error analyzing code: " + (error as Error).message;
    }
}

async function writeTestsToFile(uri: vscode.Uri, testCases: string): Promise<void> {
    const fileName = path.basename(uri.fsPath);
    const specFileName = fileName.replace('.ts', '.spec.ts');
    const specFilePath = path.join(path.dirname(uri.fsPath), specFileName);

    try {
        if (fs.existsSync(specFilePath)) {
            // Append the test cases to an existing spec file
            fs.appendFileSync(specFilePath, `\n\n${testCases}`);
            vscode.window.showInformationMessage(`Tests appended to ${specFileName}`);
        } else {
            // Create a new spec file and write the test cases
            fs.writeFileSync(specFilePath, testCases);
            vscode.window.showInformationMessage(`Test file ${specFileName} created successfully`);
        }
    } catch (err) {
        console.error("Error writing to spec file:", err);
        vscode.window.showErrorMessage(`Failed to write test cases to ${specFileName}`);
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Your extension "FoodFinds" is now active!');

    // Command to analyze code smells
    let disposableSmells = vscode.commands.registerCommand('foodfinds.analyzeCodeSmells', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("No editor is active.");
            return;
        }

        const selection = editor.selection;
        const codeSnippet = editor.document.getText(selection.isEmpty ? undefined : selection);

        const result = await analyzeCode(codeSnippet, "smells");

        const outputChannel = vscode.window.createOutputChannel("Code Smells Analysis");
        outputChannel.show();
        outputChannel.appendLine("Code Smells Analysis Result:");
        outputChannel.appendLine(result);
    });

    // Command to generate unit tests
    let disposableTests = vscode.commands.registerCommand('foodfinds.generateUnitTests', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("No editor is active.");
            return;
        }

        const selection = editor.selection;
        const codeSnippet = editor.document.getText(selection.isEmpty ? undefined : selection);

        const result = await analyzeCode(codeSnippet, "tests");

        const uri = editor.document.uri;
        await writeTestsToFile(uri, result);
    });

    context.subscriptions.push(disposableSmells, disposableTests);
}

export function deactivate() {}
