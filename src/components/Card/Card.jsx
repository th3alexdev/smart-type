import React, { useContext }from "react"
import { IconContext } from "react-icons"

import { CardEditor, CardPreview } from "./components/routes"
import { ShortcutsContext } from "../../context/ShortcutsProvider";

function Card( props ) {
  
  const { cardIsOpen } = useContext(ShortcutsContext);
  const { isOpen, setOpenCards, toggleCard, ...restProps } = props;
  
  const hideCardHandler = () => {
    setOpenCards({})
  }

  return (
   <>
    <IconContext.Provider value={{ color: "var(--color-icon-color)", className: "card-icon" }}>
    {
      isOpen && cardIsOpen ? (
        <CardEditor
          { ...props }
          setOpenCards={ setOpenCards }
          closeCard={ hideCardHandler }
        />
      ) : (
        <CardPreview
          { ...props }
          openCard={ toggleCard }
        />
      )
    }
    </IconContext.Provider>
   </>
  )
}

export default Card
