import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

async function analyzeCodeSmellsWithOpenAI(folderPath: string, apiKey: string): Promise<
  Array<{
    fileName: string;
    issues: Array<{ lineNumber: number; description: string }>;
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

      // Construct prompt for the file
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
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a code reviewer that identifies code smells and bugs in TypeScript code.' },
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

      // Assuming `responseText` is a string containing lines with code smells
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


async function analyzeProjectForSmellsAndExport(folderPath: string) {
  try {
    const apiKey = process.env.API_KEY;    if (!apiKey) {
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




export function activate(context: vscode.ExtensionContext) {
  const analyzeProjectCommand = vscode.commands.registerCommand('foodfinds.analyzeCodeSmells', async () => {
    const folderUri = vscode.workspace.workspaceFolders?.[0]?.uri;

    if (!folderUri) {
      vscode.window.showErrorMessage('No folder is open in the workspace.');
      return;
    }

    const folderPath = folderUri.fsPath;
    await analyzeProjectForSmellsAndExport(folderPath);
  });

  context.subscriptions.push(analyzeProjectCommand);
}

export function deactivate() {}
