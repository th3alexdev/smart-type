import Shortcut from "./Shortcut";

export default class ShortcutsManager {
    shortcuts: Array<Shortcut>;

    constructor() {
        this.shortcuts = [];
    }

    addShortcut( shortcut: Shortcut ): void {
        this.shortcuts.push( shortcut );
    }

    removeShortcut( shortcutName: string ): void {
        // this.shortcuts = this.shortcuts.filter(
            // (shortcut) => shortcut.name !== shortcutName
        // );
    }

    importShorcuts(): void {
        return
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