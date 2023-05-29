import React, { useState, useContext } from "react"
import { DropButton } from "../../routes";
import { SORT_TYPES } from "../../constants/sortTypes";
import { ShortcutsContext } from "../../context/ShortcutsProvider";

function Nav({ setSortBy }) {
  const { setCardIsOpen } = useContext(ShortcutsContext)

  const sectionHandler = (e) => {
    setCardIsOpen(false)
    setSortBy(e.target.dataset.nav)

    const navItems = document.querySelectorAll(".nav-list__item");
    navItems.forEach(item => {
      item.querySelector("a").classList.remove("nav-active");
    });
  
    e.target.classList.add("nav-active");
  }

  const links = [
    { label: "Recently Added", nav: SORT_TYPES.RECENTLY_ADDED, url: "/link1"},
    { label: "Recently Used", nav: SORT_TYPES.RECENTLY_USED, url: "/link2" },
    { label: "Most Used", nav: SORT_TYPES.MOST_USED, url: "/link3" },
  ];

  const [selectedOption, setSelectedOption] = useState(links[0].label)

  const selectOption = (link) => {
    setSelectedOption(link);
  };

  return (
    <div>
      <DropButton 
          selectedOption={ selectedOption }
          className="dd-nav"
        >
          {
            links.map((link, index) => (
              link.label !== selectedOption && (
                <li 
                  className="dd-menu__item" 
                  key={ index } 
                  onClick={ () => selectOption(link.label) }
                >
                  <a 
                    className="link" 
                    href="/"
                    onClick={ (e) => sectionHandler(e) }
                    data-nav={ link.nav }
                  >{ link.label }</a>
                </li>
              )
            ))
          }
      </DropButton>
      <nav className="nav-secondary">
        <ul className="nav-list nav-list-secondary">
          <li className="nav-list__item nav-list__item--short">
            <a 
              href="#" 
              className="link nav-active"
              data-nav={ SORT_TYPES.RECENTLY_ADDED }
              onClick={((e) => sectionHandler(e))}
            >Recently Added</a>
          </li>
          <li className="nav-list__item nav-list__item--short">
            <a 
              href="#" 
              className="link"
              data-nav={ SORT_TYPES.RECENTLY_USED }
              onClick={((e) => sectionHandler(e))}
            >Recently Used</a>
          </li>
          <li className="nav-list__item nav-list__item--short">
            <a 
              href="#"
              className="link"
              data-nav={ SORT_TYPES.MOST_USED }
              onClick={((e) => sectionHandler(e))}
            >Most used</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
