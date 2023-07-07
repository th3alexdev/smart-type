import React, { useContext } from "react"
import { ShortcutsContext } from "../../../context/ShortcutsProvider";
import Manager from "../../../classes/ShortcutsManager";
import notify from "../../../utils/notify";
import { BiTrash } from "react-icons/bi"

function RemoveButton({ shortcutName, setOpenCards }) {
  const { setAllShortcuts } = useContext(ShortcutsContext)
  
  const handleDeleteShortcut = (shortcutName) => {
    notify("Shortcut was eliminated", "🗑️")
    setOpenCards({})
    Manager.removeShortcut(shortcutName)
    setAllShortcuts(Manager.getAllShortcuts)
    Manager.saveInStorage();

    const shortcuts = Manager.getAllShortcuts;

    chrome.runtime.sendMessage({ action: 'sendVariable', data: shortcuts });

    chrome.storage.sync.set({ shortcuts }, () => {
      // console.log("Los datos de los atajos se han almacenado en chrome.storage");
    });
  };

  return (
    <button 
      className="btn btn-card card__remove-btn"
      onClick={ () => handleDeleteShortcut(shortcutName) }
    >
      <BiTrash style={{ fontSize: "1.1rem"}}/>
    </button> 
  )
}

export default RemoveButton
