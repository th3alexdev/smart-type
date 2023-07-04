import React from "react"
import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md"
import { Link } from "react-router-dom";

function HeaderNav({ setCurrentSection, openNav, setOpenNav, currentSection }) {

  // Toggle the navigation state (open/close)
  const toggleNav = () => {
    setOpenNav(!openNav)
  }

  // Handler for setting the current section and toggling the navigation
  const setSectionHandler = (e) => {
    toggleNav()
    setCurrentSection(e.currentTarget.dataset.section);
  }

  return (
    <nav className={ openNav ? "nav nav--active" : "nav"}>
      <ul className="nav-list">
        <li className="nav-list__item">
          <Link 
            to="/index.html#home" 
            className={`link ${currentSection === "/index.html/home" && "nav-header-active"}`}
            data-section="/index.html/home"
            onClick={((e) => setSectionHandler(e))}
          >Your shortcuts</Link>
        </li>
        <li className="nav-list__item">
          <Link
            to="/index.html#test" 
            className={`link ${currentSection === "/index.html/test" && "nav-header-active"}`}
            data-section="/index.html/test"
            onClick={((e) => setSectionHandler(e))}
          >Test your shortcuts</Link>
        </li>
        <li className="nav-list__item">
          <Link 
            to="/index.html#manage"
            className={ currentSection === "/index.html/manage" ? "link nav-header-active" : "link" }
            data-section="/index.html/manage"
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
