import React from 'react'
import { MdSignalCellularAlt } from "react-icons/md"
import { MdOutlineWatchLater } from "react-icons/md"
import { MdKeyboardArrowDown } from "react-icons/md"
import { IconContext } from 'react-icons'


function Card({ shortcut, description, timesUsed, lastUsedDate }) {
  return (
    <div className="card">
        <h3 className="card__shortcut">{ shortcut }</h3>
        <p className="card__command"></p>

        <h2 className="card__description">
          { description }
        </h2> 

        <IconContext.Provider value={{ color: "#000000c6", className: "card-icon" }}>
          <div className="card__stats"> 
            <div 
              className="card-pill"
              title="Times used"
            ><MdSignalCellularAlt/> { timesUsed }</div>
            {
              lastUsedDate && (
                <div 
                  className="card-pill"
                  title="Last used date"
                ><MdOutlineWatchLater/>  { lastUsedDate }</div>
              ) 
            }
          </div>

          <button className="btn btn-edit card__edit-btn"> <MdKeyboardArrowDown style={{ fontSize: "1.5rem"}}/> </button>
        </IconContext.Provider>
    </div>
  )
}

export default Card
