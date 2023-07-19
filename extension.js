// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "px-rem" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('px-rem.pxToRem', function () {
		// 获取编辑器对象
		const editor = vscode.window.activeTextEditor;
		// 获取编辑器全部文本
		const document = editor.document;
		const text = document.getText();
		// px替换成rem
		const reg = /(\d+)px/g;
		const newText = text.replace(reg, (match, p1) => {
			return p1 + 'rem';
		});


		editor.edit(editBuilder => {
			editBuilder.replace(new vscode.Range(
				new vscode.Position(0, 0),
				new vscode.Position(document.lineCount + 1, 0)
			), newText);
		});

		// vscode.window.showInformationMessage('px已经全部转换成rem了！');
	});
	let disposable2 = vscode.commands.registerCommand('px-rem.formatPsCss', function () {
		// 获取选中的文本
		const editor = vscode.window.activeTextEditor;
		const document = editor.document;
		const selection = editor.selection;
		const text = document.getText(selection);
		// 删除所有回车和空格 z-index和值都去掉
		const newText = text.replace(/[\r\n\s]/g, '').replace(/z-index:\d+;/g, '');;
		// 所有冒号和分号后面加空格
		const newText2 = newText.replace(/[:;]/g, (match) => {
			return match + ' ';
		});
		// ; }间的空格删除
		const newText3 = newText2.replace(/;\s+}/g, (match) => {
			return match.replace(/; }/g, ';}\r\n');
		});
		// url("big-title.png")把里面的双引号去掉，如果路径不是img/开头的，就加上
		// const newText4 = newText3.replace(/url\((.+?)\)/g, (match, p1) => {
		// 	if (p1.indexOf('img/') === -1) {
		// 		return `url("img/${p1.replace(/"/g, '')}")`;
		// 	} else {
		// 		return `url(${p1.replace(/"/g, '')})`;
		// 	}
		// });
		
		// background-image替换成background,并且把url("big-title.png")里面的双引号去掉，如果路径不是img/开头的，就加上,并且设置 no-repeat 0 0 / 100% 100%
		const newText4 = newText3.replace(/background-image:\s*url\((.+?)\)/g, (match, p1) => {
			if (p1.indexOf('img/') === -1) {
				return `background: url("img/${p1.replace(/"/g, '')}") no-repeat 0 0 / 100% 100%;`;
			} else {
				return `background: url(${p1.replace(/"/g, '')}) no-repeat 0 0 / 100% 100%;`;
			}
		});

		// 替换选中的文本
		editor.edit(editBuilder => {
			editBuilder.replace(selection, newText4);
		});
		// vscode.window.showInformationMessage('格式化了ps的css代码');

	})
	let disposable3 = vscode.commands.registerCommand('px-rem.formatPsCssImg', function () {
		// 获取选中的文本
		const editor = vscode.window.activeTextEditor;
		const document = editor.document;
		const selection = editor.selection;
		const text = document.getText(selection);
		// 删除background-image属性和后面的分号和空格
		const newText4 = text.replace(/background-image:\s*url\((.+?)\);/g, () => {
			return '';
		});
		// 删除所有回车和空格 z-index和值都去掉
		const newText = newText4.replace(/[\r\n\s]/g, '').replace(/z-index:\d+;/g, '');;
		// 所有冒号和分号后面加空格
		const newText2 = newText.replace(/[:;]/g, (match) => {
			return match + ' ';
		});
		// ; }间的空格删除
		const newText3 = newText2.replace(/;\s+}/g, (match) => {
			return match.replace(/; }/g, ';}\r\n');
		});

		// 替换选中的文本
		editor.edit(editBuilder => {
			editBuilder.replace(selection, newText3);
		});
		// vscode.window.showInformationMessage('格式化了ps的css代码');

	})
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
