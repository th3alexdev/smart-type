import { Shortcut } from "./Shortcut";
import { convertRegexToString } from "../utils/regexConverter";

class ShortcutsManager {
    shortcuts: Array<Shortcut>;
    command: string;
    regex: RegExp;

    constructor({ command = "/", regex = /(\w+|[^\w\s]*\/\w+[^\w\s]*|[^\w\s]+|\s+)/g }: 
    { command?: string, regex?: RegExp }) {
        this.shortcuts = [];
        this.command = command;
        this.regex = regex;
    }

    saveInStorage() {
        const shortcuts = Manager.getAllShortcuts.map((shortcut) => ({ ...shortcut }));
        // console.log(shortcuts);
      
        shortcuts.forEach((shortcut) => {
          convertRegexToString(shortcut);
        });

        // console.log(JSON.stringify(shortcuts))
      
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    }

    addShortcut( shortcut: Shortcut ): void {
        this.shortcuts.push( shortcut );
    }

    removeShortcut( shortcutName: string ): void {
        this.shortcuts = this.shortcuts.filter((shortcut) => {
            return shortcut.getName !== shortcutName;
        });
    }

    removeAllShortcuts():void {
        this.shortcuts = [];
    }

    editShortcut({ 
        fullShortcut,
        name,
        description,
        expansion
    }: {
        fullShortcut: Shortcut;
        name?: string;
        description?: string;
        expansion?: string
    }): void {

        name && (fullShortcut.setName = name);
        description && (fullShortcut.setDescription = description);
        expansion && (fullShortcut.setExpansion = expansion);
        fullShortcut.resetShortcutsValues();
    }

    setCommand(command: string) {
        this.command = command;
    }

    setRegex(command: string) {
        const RegExp = {
            "/": /(\w+|[^\w\s]*\/\w+[^\w\s]*|[^\w\s]+|\s+)/g,
            "//": /(\w+|[^\w\s]*\/\w+[^\w\s]*|[^\w\s]+|\s+)/g,
            "-": /(\w+|[^\w\s]*\-\w+[^\w\s]*|[^\w\s]+|\s+)/g,
            "--": /(\w+|[^\w\s]*\--\w+[^\w\s]*|[^\w\s]+|\s+)/g,
            "#": /(\w+|[^\w\s]*\#\w+[^\w\s]*|[^\w\s]+|\s+)/g
        }
    
        this.regex = RegExp[command];
    }

    get getRegex(): RegExp {
        // console.log(this.regex)
        return this.regex;
    }

    get getCommand(): string {
        return this.command;
    }


    importShortcuts(shortcuts: any): void {
        this.shortcuts = shortcuts;
    }

    exportShortcuts(): void {
        return
    }

    get getAllShortcuts(): Array<Shortcut> {
        return this.shortcuts;
    }

    showShortcuts(): void {
        return console.log(this.shortcuts)
    }

    showLength(): void {
        return console.log(this.shortcuts.length)
    }
}

const Manager = new ShortcutsManager({ command: "/" });


export default Manager;