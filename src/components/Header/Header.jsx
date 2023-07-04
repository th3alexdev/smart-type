import React from 'react'
import { BarsButton } from "../../routes"

function Header({ children, openNav, setOpenNav }) {
  const toggleNav = () => {
    setOpenNav(!openNav)
  }

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="brand">
          <a 
            target="_blank"
            href="https://smart-type.netlify.app/"
            className="link"
            aria-label="SmartType - Visit homepage"
            >
            SmartType
          </a>
        </h1>

        { children }

        <BarsButton 
          openNavHandler={ toggleNav } 
          aria-label="Toggle menu"
        />
      </div>
    </header>
  )
}

export default Header
