import React from "react"
import { MdSignalCellularAlt, MdOutlineWatchLater } from "react-icons/md"

function StatsPills({ timesUsed, lastUsedDate }) {
  return (
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
            >
              <MdOutlineWatchLater/>  { lastUsedDate }
            </div>
          ) 
        }
    </div>
  )
}

export default StatsPills
