import React, { useState, useContext } from "react"

import { SORT_TYPES } from "../../constants/sortTypes";
import { createCardElement } from "../../helpers/cardHelpers";
import { EmptyCardList } from "../../routes"
import { ShortcutsContext } from "../context/ShortcutsProvider";

function SortedList({ sortBy }) {
    const { allShortcuts, setAllShortcuts } = useContext(ShortcutsContext);
    const [openCards, setOpenCards] = useState({});

    const sortedShortcuts = [...allShortcuts];
    
    const isListEmpty = sortedShortcuts.length === 0;

    const sortShortcuts = () => {
        if(sortBy === SORT_TYPES.RECENTLY_USED) {
            sortedShortcuts.sort((a, b) => {
                const dateA = new Date(a.lastUsedDate);
                const dateB = new Date(b.lastUsedDate);
                return dateB.getTime() - dateA.getTime();
            }); 

        } else if(sortBy === SORT_TYPES.MOST_USED) {
            sortedShortcuts.sort((a, b) => b.timesUsed - a.timesUsed);
        }
    } 

    sortShortcuts()

  return (
    <>
        {
            isListEmpty ? (
                <EmptyCardList 
                    title="No shortcuts to show!"
                />
            ) : (

            <div className="cards-container">
                {
                    sortedShortcuts.map((el, key) => (
                        sortBy === SORT_TYPES.RECENTLY_USED && el.lastUsedDate === undefined 
                            ? <EmptyCardList 
                                title="No shortcuts used yet!"
                              />
                            : createCardElement({ el, key, openCards, setOpenCards, setAllShortcuts })
                        )
                    )
                }
            </div>
            )
        }
    </>
  )
}

export default SortedList