import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

// Function to analyze code smells with OpenAI
async function analyzeCodeSmellsWithOpenAI(folderPath: string, apiKey: string): Promise<
  Array<{
    fileName: string;
    issues: Array<{ lineNumber: number; description: string }>; // Array for the line number and the description
  }>
> {
  try {
    // Read all TypeScript files in the folder
    const files = fs.readdirSync(folderPath);
    const codeFiles = files.filter((file) => file.endsWith('.ts')); // Only TypeScript files

    const results = [];

    // Process each file individually
    for (const file of codeFiles) {
      const filePath = path.join(folderPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // This will construct the prompt for the file
      const prompt = `Analyze the following TypeScript code and detect code smells or bugs. For each issue, specify:
- Line number
- Description of the issue

File: ${file}
Code:
${content}`;

      // Send request to OpenAI API
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', //Model we want to use for our commands
          messages: [
            { role: 'system', content: 'A code reviewer that identifies code smells/bugs in TypeScript code.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 1500,
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Parse response
      const responseText = response.data.choices[0].message.content;

      // Extract issues from response
      interface CodeIssue {
        lineNumber: number;
        description: string;
      }

      // responseText is a string containing lines with code smells
      const issues: CodeIssue[] = responseText
        .split('\n')
        .filter((line: string) => line.trim() !== '') // Remove empty lines
        .map((entry: string): CodeIssue => {
          const match = entry.match(/Line (\d+):\s*(.*)/);
          if (match) {
            return { lineNumber: parseInt(match[1], 10), description: match[2].trim() };
          } else {
            return { lineNumber: 0, description: entry.trim() };
          }
        });

      // Add to results
      results.push({
        fileName: file,
        issues,
      });
    }

    return results;

  } catch (error) {
    throw new Error(`Failed to analyze code: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Function to generate code smells report and save it as a JSON file
async function analyzeProjectForSmellsAndExport(folderPath: string) {
  try {
    //api key
    const apiKey = 'OPEN_AI_KEY';

    if (!apiKey) {
      //error with the key
      vscode.window.showErrorMessage('OpenAI API key is not set.');
      return; // Exit if API key is missing
    }

    const analysisResults = await analyzeCodeSmellsWithOpenAI(folderPath, apiKey);

    if (!analysisResults || analysisResults.length === 0) {
      throw new Error('No analysis results were generated.');
    }

    const filePath = path.join(folderPath, 'codeSmellsReport.json');
    fs.writeFileSync(filePath, JSON.stringify(analysisResults, null, 2));
    vscode.window.showInformationMessage('Code smells report generated successfully!');
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to generate report: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Function to generate unit tests (existing functionality)
async function analyzeCode(codeSnippet: string, taskType: "smells" | "tests"): Promise<string> {
  //api key
  const apiKey = 'OPEN_AI_KEY';
  const url = 'https://api.openai.com/v1/chat/completions';

  const promptMessage =
    taskType === "smells"
      ? `Analyze the following Angular code and detect any code smells or architectural issues:\n\n${codeSnippet}`
      : `Write unit tests for the following Angular code using the Jasmine framework. Include edge cases and ensure proper coverage:\n\n${codeSnippet}`;

  try {
    const response = await axios.post(url, {
      model: "gpt-3.5-turbo",
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

//This function appends the unit test code to the .spec.tsfile
async function writeTestsToFile(uri: vscode.Uri, testCases: string): Promise<void> {
  const fileName = path.basename(uri.fsPath);
  const specFileName = fileName.replace('.ts', '.spec.ts');
  const specFilePath = path.join(path.dirname(uri.fsPath), specFileName);

  //try catch block to check if an file exists for test cases
  try {
    if (fs.existsSync(specFilePath)) {
      // Append the test cases to an existing spec file
      fs.appendFileSync(specFilePath, `\n\n${testCases}`);
      vscode.window.showInformationMessage(`Tests appended to ${specFileName}`);
    } else {
      // If spec file doesn't exist, create it and write the test cases
      fs.writeFileSync(specFilePath, testCases);
      vscode.window.showInformationMessage(`Test file ${specFileName} created successfully`);
    }
  } catch (err) {
    //output the error when it fails to write test cases
    console.error("Error writing to spec file:", err);
    vscode.window.showErrorMessage(`Failed to write test cases to ${specFileName}`);
  }
}

// Registering both commands in the activate function
export function activate(context: vscode.ExtensionContext) {
  console.log('Your extension "FoodFinds" is now active!');

  // Command to analyze code smells
  let disposableSmells = vscode.commands.registerCommand('foodfinds.analyzeCodeSmells', async () => {
    const folderUri = vscode.workspace.workspaceFolders?.[0]?.uri;
    if (!folderUri) {
      //This will show an error if you do not open a folder in the workspace when the extension is active
      vscode.window.showErrorMessage('No folder is open in the workspace.');
      return;
    }

    const folderPath = folderUri.fsPath;
    await analyzeProjectForSmellsAndExport(folderPath);
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
