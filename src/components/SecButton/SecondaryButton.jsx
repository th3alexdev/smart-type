import React, { useContext } from "react"
import { ShortcutsContext } from '../context/ShortcutsProvider';
import { handleImportExport } from "../../helpers/handleImportExport";
import Manager from "../../classes/ShortcutsManager";

function SecButton({ cta }) {
  const { allShortcuts, setAllShortcuts } = useContext(ShortcutsContext);
  
  const handleClick = () => {
    handleImportExport(cta, allShortcuts);
    setAllShortcuts(Manager.getAllShortcuts)
  }

  return (
    <button 
      className="btn btn-secondary"
      onClick={ (e) => handleClick(cta, allShortcuts) }
    >
      { cta }
    </button>
  )
}

export default SecButton
