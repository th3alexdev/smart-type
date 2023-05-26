import React from "react"
import { IconContext } from "react-icons"

import { CardEditor, CardPreview } from "./components/routes"

function Card( props ) {

  const { isOpen, setOpenCards, toggleCard, ...restProps } = props;
  
  const hideCardHandler = () => {
    setOpenCards({})
  }

  return (
   <>
    <IconContext.Provider value={{ color: "var(--color-icon-color)", className: "card-icon" }}>
    {
      isOpen ? (
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
