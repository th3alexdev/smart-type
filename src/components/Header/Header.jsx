import React from 'react'
import { FaBars } from 'react-icons/fa';

function Header({ children }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="brand">
          <a 
            target="_blank"
            href="#"
            className="link"
            >
            SmartTypes
          </a>
        </h1>

        { children }
      </div>
    </header>
  )
}

export default Header
