import React, { useContext } from "react"
import { ShortcutsContext } from "../../../context/ShortcutsProvider";
import { loadDefaultCommand, setDefaultCommand } from "../../../utils/loadDefaultCommand";
import Manager from "../../../classes/ShortcutsManager";

import {
    DropButton,
    SecButton,
    SwitchButton
} from "../../../routes";

function ManageSection({ setSelectedOption, selectedOption, darkTheme, toggleDarkTheme }) {

  const { selectedCommand, setSelectedCommand, allShortcuts } = useContext(ShortcutsContext);

  const selectCommand = (command) => {
    setSelectedCommand(command);
    setDefaultCommand(command);
    allShortcuts.map(shortcut => {
        shortcut.setShortcut(command);
    })
  }

  const options = [
      "/",
      "//",
      "-",
      "--",
      "#"
  ]

  return (
    <div className="section-center">
        <h1 className="title title--principal  settings__title">Settings</h1>
        <div className="settings-container">
            <div className="settings__item">
                <h2 className="title title--subtitle"> Command </h2>
                <DropButton 
                    selectedOption={ selectedCommand }
                >
                {
                    options.map((option, index) => (
                        option !== selectedCommand && (
                        <li 
                            key={ index }
                            className="dd-menu__item" 
                            onClick={ () => { selectCommand(option) }}
                        >
                        { option }
                        </li>
                        )
                    ))
                }                    
                </DropButton>
            </div>    
            <div className="settings__item">
                <h2 className="title title--subtitle"> Night Mode </h2>
                <SwitchButton 
                    checked={ darkTheme }
                    onChange={ toggleDarkTheme }
                />
            </div>    
            <div className="settings__item">
                <h2 className="title title--subtitle"> Import Shortcuts </h2>
                <SecButton
                    cta="Import"
                />
            </div>                 
            <div className="settings__item">
                <h2 className="title title--subtitle"> Export Shortcuts </h2>
                <SecButton
                    cta="Export"
                />
            </div>                 
        </div>
    </div>
  )
}

export default ManageSection
