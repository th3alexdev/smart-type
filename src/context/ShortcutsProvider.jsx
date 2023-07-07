import React, { createContext, useState, useEffect } from "react"
import Manager from "../classes/ShortcutsManager";
import { loadDefaultCommand, setDefaultCommand } from "../utils/loadDefaultCommand";
export const ShortcutsContext = createContext();

export const ShortcutsProvider = ({ children }) => {
  const [allShortcuts, setAllShortcuts] = useState([]);
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);

  useEffect(() => {
    const getAllShortcuts = Manager.getAllShortcuts;
    console.log(getAllShortcuts);

    chrome.runtime.sendMessage({ action: 'sendVariable', data: getAllShortcuts });
  }, [Manager.getAllShortcuts]);

  useEffect(() => {
    Manager.saveInStorage();
    Manager.setCommand(selectedCommand)
    Manager.setRegex(selectedCommand)

    chrome.runtime.sendMessage({ action: 'selectedCommand', data: selectedCommand })
  }, [selectedCommand]);

  useEffect(() => {
    const defaultCommand = localStorage.getItem("defaultCommand");
    if (defaultCommand === null) {
        setDefaultCommand("/");
        setSelectedCommand("/")

        const command =  defaultCommand;
        chrome.storage.sync.set({ command }, () => {
          chrome.runtime.sendMessage({ action: 'sendCommand', command: command });
        });
    }
    else {
        loadDefaultCommand();
        setSelectedCommand(defaultCommand);
        
        const command =  defaultCommand;
        chrome.storage.sync.set({ command }, () => {
          chrome.runtime.sendMessage({ action: 'sendCommand', command: command });
        });
    };

    const shortcuts = Manager.getAllShortcuts;
    setAllShortcuts(shortcuts);
  }, []);

  return (
    <ShortcutsContext.Provider value={{ 
      allShortcuts, 
      setAllShortcuts, 
      cardIsOpen, 
      setCardIsOpen,
      selectedCommand,
      setSelectedCommand
    }}>
      { children }
    </ShortcutsContext.Provider>
  )
}

