import React, { useState, useContext } from "react";
import { ShortcutsContext } from "../context/ShortcutsProvider";

function DropButton({ options , setSelectedOption, selectedOption }) {
  const { allShortcuts } = useContext(ShortcutsContext)

  const [open, setOpen] = useState(false)

  const selectOption = (option) => {
    allShortcuts.forEach(shortcut => shortcut.setShortcut(option))
    setSelectedOption(option);
  }

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <label className="dd" htmlFor="test">
        <p className="dd__placeholder"> 
          { selectedOption }
          <span 
            className={ 
              open 
              ? "dd__placeholder-icon dd__placeholder-icon--open" 
              : "dd__placeholder-icon" 
            }
          ></span>
        </p>

        <input 
          type="checkbox"
          className="dd__input" 
          id="test" 
          onClick={ handleOpen }
        />

        {
          open && (
            <ul className="dd-menu">
            {
              options.map((option, key) => (
                option !== selectedOption && (
                <li 
                  className="dd-menu__item" 
                  key={key}
                  onClick={() => selectOption(option)}
                >
                  { option }
                </li>
                )
              ))
            }
            </ul>
          )
        }
      </label>
    </>
  )
}

export default DropButton