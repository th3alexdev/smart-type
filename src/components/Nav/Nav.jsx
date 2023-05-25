import React from "react"

function Nav({ setSortBy }) {

  const sectionHandler = (e) => {
    setSortBy(e.target.dataset.nav)

    const navItems = document.querySelectorAll(".nav-list__item");
    navItems.forEach(item => {
      item.querySelector("a").classList.remove("nav-active");
    });
  
    e.target.classList.add("nav-active");
  }

  return (
    <nav className="nav-secondary">
      <ul className="nav-list nav-list-secondary">
        <li className="nav-list__item nav-list__item--short">
          <a 
            href="#" 
            className="link nav-active"
            data-nav="recently-added"
            onClick={((e) => sectionHandler(e))}
          >Recently Added</a>
        </li>
        <li className="nav-list__item nav-list__item--short">
          <a 
            href="#" 
            className="link"
            data-nav="recently-used"
            onClick={((e) => sectionHandler(e))}
          >Recently Used</a>
        </li>
        <li className="nav-list__item nav-list__item--short">
          <a 
            href="#"
            className="link"
            data-nav="most-used"
            onClick={((e) => sectionHandler(e))}
          >Most used</a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
