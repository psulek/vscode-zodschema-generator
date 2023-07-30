# Zod schema generator for Visual Studio Code

A `vscode` extension which generates [Zod][zod] schemas from typescript source code (using [ts-to-zod][tz2zod] package).

## Features

### Generate Zod schema
This extension will generate `Zod` schema together with inferred types into new `vscode` readonly panel.

#### Example
Source typescript code:
```ts
export interface HeroContact {
    /**
     * The email of the hero.
     *
     * @format email
     */
    email: string;

    /**
     * energy status of the hero
     */
    energy: 'positive' | 'negative';
  
    /**
     * Does the hero has super power?
     *
     * @default true
     */
    hasSuperPower?: boolean;
  
    /**
     * The age of the hero
     *
     * @minimum 0
     * @maximum 500
     */
    age: number;
  }
```

Generated Zod schema:
```ts
// Generated by ts-to-zod (https://www.npmjs.com/package/ts-to-zod)
import { z } from "zod";

export const heroContactSchema = z.object({
    /**
     * The email of the hero.
     *
     * @format email
     */
    email: z.string(),
    /**
     * energy status of the hero
     */
    energy: z.union([z.literal("positive"), z.literal("negative")]),
    /**
     * Does the hero has super power?
     *
     * @default true
     */
    hasSuperPower: z.boolean().optional(),
    /**
     * The age of the hero
     *
     * @minimum 0
     * @maximum 500
     */
    age: z.number()
});

// inferred types:
export type HeroContact = z.infer<typeof heroContactSchema>;
```

## Commands

Available commands from command pallete:

| Command                              | Keybinding  |
| -------------------------------------| ----------- |
| Generate Zod schema from Typescript  | none        |

> press `F1` or `Ctrl+Shift+P` to open `Command palette`


## Install

1. Open **Extensions** sideBar panel in Visual Studio Code and choose the menu options for **View → Extensions**
1. Search for `zodschema-generator`
1. Click **Install**
1. Click **Reload**, if required

### Marketplace
Marketplace extension page - [Zod schema generator][marketplace_ext]

## Release Notes
[Have a look at our CHANGELOG][changelog] to get the details of all changes.

### 1.0.0

Initial release of `Zod schema generator` extension

<!-- Links -->
[changelog]: https://github.com/psulek/vscode-zodschema-generator/blob/main/CHANGELOG.md
[zod]: https://www.npmjs.com/package/zod
[tz2zod]: https://www.npmjs.com/package/ts-to-zod
[marketplace_ext]: https://marketplace.visualstudio.com/items?itemName=psulek-solo.zodschema-generator
