import React from "react"
import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md"
import { Link } from "react-router-dom";

function HeaderNav({ setCurrentSection, openNav, setOpenNav, currentSection }) {

  const toggleNav = () => {
    setOpenNav(!openNav)
  }

  const setSectionHandler = (e) => {
    toggleNav()
    setCurrentSection(e.currentTarget.dataset.section);
  }

  return (
    <nav className={ openNav ? "nav nav--active" : "nav"}>
      <ul className="nav-list">
        <li className="nav-list__item">
          <Link 
            to="/home" 
            className={`link ${currentSection === "/home" && "nav-header-active"}`}
            data-section="/home"
            onClick={((e) => setSectionHandler(e))}
          >Your shortcuts</Link>
        </li>
        <li className="nav-list__item">
          <Link
            to="/test" 
            className={`link ${currentSection === "/test" && "nav-header-active"}`}
            data-section="/test"
            onClick={((e) => setSectionHandler(e))}
          >Test your shortcuts</Link>
        </li>
        <li className="nav-list__item">
          <Link 
            to="/manage"
            className={ currentSection === "/manage" ? "link nav-header-active" : "link" }
            data-section="/manage"
            onClick={((e) => setSectionHandler(e))}
          >Manage shortcuts</Link>
        </li>
      </ul>
      <IconContext.Provider value={{ color: "var(--color-icon-color)", className: "icon btn" }}>
        <MdAdd 
          className="btn btn-cross nav__cross-btn"
          onClick={ () => toggleNav() }
        />
      </IconContext.Provider>
    </nav>
  )
}

export default HeaderNav
