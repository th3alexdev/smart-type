import React from 'react'

function HeaderNav({ setSection, setShowSection }) {

  const sectionHandler = (e) => {
    setSection(e.target.dataset.section)
    setShowSection(true)

    const navItems = document.querySelectorAll('.nav-list__item');
    navItems.forEach(item => {
      item.querySelector('a').classList.remove('nav-active');
    });
  
    e.target.classList.add('nav-active');
  }

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list__item">
          <a 
            href="#shortcuts" 
            className="link nav-active"
            data-section="home"
            onClick={((e) => sectionHandler(e))}
          >Your shortcuts</a>
        </li>
        <li className="nav-list__item">
          <a 
            href="#test" 
            className="link"
            data-section="test"
            onClick={((e) => sectionHandler(e))}
          >Test your shortcuts</a>
        </li>
        <li className="nav-list__item">
          <a 
            href="#manage"
            className="link"
            data-section="manage"
            onClick={((e) => sectionHandler(e))}
          >Manage shortcuts</a>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderNav
