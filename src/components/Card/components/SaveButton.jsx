import React from "react"
import { AiOutlineSave } from "react-icons/ai"


function SaveButton() {
  return (
    <button 
        className="btn btn-card card__save-btn" 
        type="submit">
        <AiOutlineSave style={{ color: "#fff", fontSize: "1.2rem"}}/>
    </button>
  )
}

export default SaveButton
