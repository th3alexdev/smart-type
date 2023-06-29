import React, { createContext, useState, useEffect } from "react"
import Manager from "../classes/ShortcutsManager";
import { loadDefaultCommand, setDefaultCommand } from "../utils/loadDefaultCommand";
export const ShortcutsContext = createContext();

export const ShortcutsProvider = ({ children }) => {
  const [allShortcuts, setAllShortcuts] = useState([]);
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);

  useEffect(() => {
    Manager.saveInStorage();
    Manager.setCommand(selectedCommand)
    Manager.setRegex(selectedCommand)
  }, [selectedCommand]);

  useEffect(() => {
    const defaultCommand = localStorage.getItem("defaultCommand");
    if (defaultCommand === null) {
        setDefaultCommand("/");
        setSelectedCommand("/")
    }
    else {
        loadDefaultCommand();
        setSelectedCommand(defaultCommand);
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

