import React from 'react'

function Nav({ setItems, setShowItems }) {

  const sectionHandler = (e) => {
    setItems(e.target.dataset.section)
    setShowItems(true)

    const navItems = document.querySelectorAll('.nav-list__item');
    navItems.forEach(item => {
      item.querySelector('a').classList.remove('nav-active');
    });
  
    e.target.classList.add('nav-active');
  }

  return (
    <nav className="nav-secondary">
      <ul className="nav-list nav-list-secondary">
        <li className="nav-list__item nav-list__item--short">
          <a 
            href="#" 
            className="link nav-active"
            data-section="recently-added"
            onClick={((e) => sectionHandler(e))}
          >Recently Added</a>
        </li>
        <li className="nav-list__item nav-list__item--short">
          <a 
            href="#" 
            className="link"
            data-section="recently-used"
            onClick={((e) => sectionHandler(e))}
          >Recently Used</a>
        </li>
        <li className="nav-list__item nav-list__item--short">
          <a 
            href="#"
            className="link"
            data-section="most-used"
            onClick={((e) => sectionHandler(e))}
          >Most used</a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
