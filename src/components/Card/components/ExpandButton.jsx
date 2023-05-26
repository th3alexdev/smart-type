import React from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

function ExpandButton({ hideCardHandler }) {

  const closeCard = () => {
    hideCardHandler()
  }

  return (
    <button 
        className="btn btn-card card__edit-btn card__edit-btn--active"
        onClick={ closeCard }
    > 
        <MdKeyboardArrowDown style={{ fontSize: "1.5rem"}}/>
    </button>
  )
}

export default ExpandButton
