import { Shortcut } from "./Shortcut";

class ShortcutsManager {
    shortcuts: Array<Shortcut>;

    constructor() {
        this.shortcuts = [];
    }

    saveInStorage() {
        localStorage
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

const Testing = new Shortcut({
    name: "testing",
    description: "Proof of SmartTypes works",
    expansion: `This is a proof \nof how this \nextension works 💛`
});

Manager.addShortcut(Testing)

export default Manager;