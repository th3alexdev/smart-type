import React, { useContext } from "react"

import { ShortcutsContext } from "../../../context/ShortcutsProvider";
import { MdKeyboardArrowDown } from "react-icons/md"
import { StatsPills } from "../../../routes"
 
function CardPreview({ cardKey, name, shortcut, description, expansion, timesUsed, lastUsedDate, openCard }) {
  const { setCardIsOpen } = useContext(ShortcutsContext)

  return (
    <div 
      className="card"
      onClick={ () => { 
        openCard()
        setCardIsOpen(true)
      }}
      key={ cardKey }
    >
        <h3 className="card__shortcut">{`${shortcut}${name}`}</h3>
          <h2 className="card__description">{ description }</h2>
          <div className="card__command"> 
          <p className="card__command-text">
              { expansion } 
          </p>
        </div>

          <StatsPills
            { ...{ timesUsed, lastUsedDate } }
          />

          <button 
            className="btn btn-card card__edit-btn"
          > 
            <MdKeyboardArrowDown style={{ fontSize: "1.5rem"}}/>
          </button>
    </div>
  )
}

export default CardPreview
