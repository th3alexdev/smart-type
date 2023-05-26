import React from 'react'
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons'

function BarsButton({ openNavHandler }) {
  return (
    <button 
    className="btn header__bars-btn"
    onClick={ openNavHandler }
  > 
    <IconContext.Provider value={{ color: "var(--color-icon-color)", className: "icon" }}>
      <FaBars />
    </IconContext.Provider>
  </button>
  )
}

export default BarsButton
