import React, { useState, useContext, useRef, useEffect} from "react";
import { ShortcutsContext } from "../../context/ShortcutsProvider";

function DropButton({ selectedOption, children, className }) {
  const { allShortcuts } = useContext(ShortcutsContext)

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null);

  return (
    <>
      <label className={`dd ${className && className}`} htmlFor="test" ref={ dropdownRef }>
        <p className="dd__placeholder" aria-label="Dropdown Menu"> 
          { selectedOption }
          <span 
            className={ 
              isOpen 
              ? "dd__placeholder-icon dd__placeholder-icon--open" 
              : "dd__placeholder-icon" 
            }
          ></span>
        </p>

        <input 
          type="checkbox"
          className="dd__input" 
          id="test" 
          onClick={ () => setIsOpen(!isOpen) }
          defaultChecked={ isOpen }
        />

        {
          isOpen && (
            <ul className="dd-menu">
              { children }
            </ul>
          )
        }
      </label>
    </>
  )
}

export default DropButton