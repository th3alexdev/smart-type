import React, { createContext, useState, useEffect } from "react"
import Manager from "../classes/ShortcutsManager";
export const ShortcutsContext = createContext();

export const ShortcutsProvider = ({ children }) => {
  const [allShortcuts, setAllShortcuts] = useState([]);

  useEffect(() => {
    const shortcuts = Manager.getAllShortcuts;
    setAllShortcuts(shortcuts);
  }, []);

  return (
    <ShortcutsContext.Provider value={{ allShortcuts, setAllShortcuts }}>
      { children }
    </ShortcutsContext.Provider>
  )
}

