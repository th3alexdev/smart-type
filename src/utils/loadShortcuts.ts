import Manager from "./../classes/ShortcutsManager";location
import { Shortcut } from "./../classes/Shortcut";
import {convertStringToRegex } from "./regexConverter";

// Sets the default shortcuts and saves them in local storage
export const setDefaultShortcuts = (setAllShorcuts: Function): void => { 

    // Converts a regular expression object to its string representation
    const regexToString = (key: string, value: any) => {
      if (value instanceof RegExp) {
        return value.toString();
      }
      return value;
    };

    // Creating a new Shortcut object
    const Testing = new Shortcut({
      name: "testing",
      description: "Proof of SmartTypes works",
      expansion: `This is a proof \nof how this \nextension works 💛`
    });
    
    // console.log(Testing)

    const shortcuts = [Testing]

    // Converts shortcuts array to JSON and converts regular expressions to strings
    const shortcutsJSON = JSON.stringify(shortcuts.map((shortcut) => ({ ...shortcut })), regexToString);

    // Adding the Testing shortcut to the ShortcutsManager
    Manager.addShortcut(Testing);    

    // Saving the shortcuts JSON to local storage
    localStorage.setItem('shortcuts', shortcutsJSON);

    // Calling setAllShortcuts function with the updated shortcuts list
    setAllShorcuts(Manager.getAllShortcuts)
}

// Loads shortcuts from local storage
export function loadShortcuts(setAllShorcuts: Function): void {
  const storedShortcuts = localStorage.getItem("shortcuts");

  if (storedShortcuts) {
    try {
      const parsedShortcuts: any = JSON.parse(storedShortcuts);

      if (Array.isArray(parsedShortcuts)) {
        // Convert string representations of regular expressions to RegExp objects
        parsedShortcuts.forEach((shortcutData: any) => {
          convertStringToRegex(shortcutData);

          // Creates a new Shortcut object from the shortcut data
          const shortcut = new Shortcut(shortcutData);

          // Adding the shortcut to the ShortcutsManager
          Manager.addShortcut(shortcut);

          // console.log(shortcut)
        });
        
        // Calling setAllShortcuts function with the updated shortcuts list
        setAllShorcuts(Manager.getAllShortcuts)

      } else {
        console.error("The stored value is not a valid object or array of shortcuts.");
      }

    } catch (error) {
      console.error("Failed to load shortcuts from local storage: ", error);
    }
  }
}
