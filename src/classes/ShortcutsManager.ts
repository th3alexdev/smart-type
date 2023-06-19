import { Shortcut } from "./Shortcut";
import { convertRegexToString } from "../utils/regexConverter";

class ShortcutsManager {
    shortcuts: Array<Shortcut>;

    constructor() {
        this.shortcuts = [];
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

const Manager = new ShortcutsManager();


export default Manager;