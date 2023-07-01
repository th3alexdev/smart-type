import { Card } from "../routes"

export const createCardElement = ({ 
    el, 
    key, 
    openCards, 
    setOpenCards, 
    setAllShortcuts 
}) => {

    const isOpen = openCards[key];
  
    const toggleCard = () => {
      if (!isOpen) {
        setOpenCards((prevState) => ({
          ...prevState,
          [key]: !prevState[key],
        }));
      }
    };
  
    const closeOtherCards = (currentKey) => {
      setOpenCards((prevState) => {
          const updatedOpenCards = {};
          for (const key in prevState) {
            if (key !== currentKey) {
              updatedOpenCards[key] = false;
            }
          }
          return updatedOpenCards;
      });
    };
  
    const handleClick = () => {
      if (!isOpen) {
        closeOtherCards();
      }
      toggleCard();
    };
  
    return (
      <Card
        name={ el.getName }
        shortcut={ el.getShortcut }
        description={ el.getDescription }
        lastUsedDate={ el.lastUsedDate !== 0 ? el.formatTime(el.lastUsedDate) : null }
        expansion={ el.getExpansion }
        timesUsed={ el.timesUsed }
        key={ key }
        isOpen={ isOpen }
        toggleCard={ handleClick }
        setOpenCards={ setOpenCards }
        setAllShortcuts={ setAllShortcuts }
      ></Card>
    );
  };