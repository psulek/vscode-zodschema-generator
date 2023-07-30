# Typescript to Zod schema generator for Visual Studio Code

A `vscode` extension which generates [Zod][zod] schemas from typescript source code (using [ts-to-zod][tz2zod] package).

## Features

### Generate Zod schema
This extension will generate `Zod` schema together with inferred types into new `vscode` readonly panel.

**Source typescript code:**
![][demo1-ts]

**Generated Zod schema:**
![][demo1-zod]

## Commands

Available commands from command pallete:

| Command                              | Keybinding  |
| -------------------------------------| ----------- |
| Generate Zod schema from Typescript  | none        |

> press `F1` or `Ctrl+Shift+P` to open `Command palette`

<!-- Links -->
[changelog]: https://github.com/psulek/vscode-zodschema-generator/blob/main/CHANGELOG.md
[zod]: https://www.npmjs.com/package/zod
[tz2zod]: https://www.npmjs.com/package/ts-to-zod

<!-- Demo images -->
[demo1-ts]: https://github.com/psulek/vscode-zodschema-generator/blob/main/docs/demo/demo1-ts.png?raw=true
[demo1-zod]: https://github.com/psulek/vscode-zodschema-generator/blob/main/docs/demo/demo1-zod.png?raw=true
