import React from 'react'
import { IconContext } from 'react-icons';
import { MdAdd } from "react-icons/md"

function HeaderNav({ setCurrentSection, setShowSection, openNav, setOpenNav }) {
  const toggleNav = () => {
    setOpenNav(!openNav)
  }

  const setSectionHandler = (e) => {
    toggleNav()
    setCurrentSection(e.currentTarget.dataset.section);
    setShowSection(true)

    const activeItem = document.querySelector('.nav-list__item a.nav-header-active');
    activeItem?.classList.remove('nav-header-active');
  
    e.target.classList.add('nav-header-active');
  }

  return (
    <nav className={`nav ${openNav && "nav--active"}`}>
      <ul className="nav-list">
        <li className="nav-list__item">
          <a 
            href="#shortcuts" 
            className="link nav-header-active"
            data-section="home"
            onClick={((e) => setSectionHandler(e))}
          >Your shortcuts</a>
        </li>
        <li className="nav-list__item">
          <a 
            href="#test" 
            className="link"
            data-section="test"
            onClick={((e) => setSectionHandler(e))}
          >Test your shortcuts</a>
        </li>
        <li className="nav-list__item">
          <a 
            href="#manage"
            className="link"
            data-section="manage"
            onClick={((e) => setSectionHandler(e))}
          >Manage shortcuts</a>
        </li>
      </ul>
      <IconContext.Provider value={{ color: "#222", className: "icon btn" }}>
        <MdAdd 
          className="btn btn-cross nav__cross-btn"
          onClick={ () => toggleNav() }
        />
      </IconContext.Provider>
    </nav>
  )
}

export default HeaderNav
