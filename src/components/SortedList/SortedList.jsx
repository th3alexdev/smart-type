import React from 'react'
import { Card } from "../../routes"

function SortedList({ allShortcuts, sortBy, showItems }) {

    const sortedShortcuts = [...allShortcuts];

    if (sortBy === "recently-used") {
        sortedShortcuts.sort((a, b) => {
            const dateA = new Date(a.lastUsedDate);
            const dateB = new Date(b.lastUsedDate);
            return dateB.getTime() - dateA.getTime();
        });

        if (sortedShortcuts.length === 0 || sortedShortcuts.every((el) => el.   lastUsedDate === undefined)) {
            return null;
        }

    } else if(sortBy === "most-used") {
        sortedShortcuts.sort((a, b) => b.timesUsed - a.timesUsed);
    } 


  return (
    <div className="cards-container">
            <>
                {
                sortedShortcuts.map( (el, key) => (
                    <Card 
                        shortcut={`${el.shortcut}${el.name}`}
                        description={ el.description }
                        lastUsedDate={ el.lastUsedDate !== undefined ? el.formatTime(el.lastUsedDate) : null }
                        timesUsed={ el.timesUsed }
                        key={ key }
                    >
                    </Card>
                ))
                }
            </>

    </div>
  )
}

export default SortedList
