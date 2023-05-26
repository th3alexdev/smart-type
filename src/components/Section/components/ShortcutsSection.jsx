import React from "react"
import { 
  Form,
  Modal,
  Nav,
  MainButton,
  SortedList
} from "../../../routes.js";

import { IconContext } from "react-icons";
import { MdOutlineAdd } from "react-icons/md";

function ShortcutsSection({ sortBy, setSortBy, setIsModalOpen, isModalOpen, selectedOption }) {

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  return (
      <>
        <div className="section-flex">
          <Nav setSortBy={ setSortBy } />
          <MainButton cta="Add New Shortcut" openModal={ handleModalOpen }>
            <IconContext.Provider value={{ color: "white", className: "icon" }}>
              <MdOutlineAdd /> 
            </IconContext.Provider>
          </MainButton>
          {
            isModalOpen && (
              <Modal closeModal={ handleModalClose }>
                <Form 
                  placeholder="Type here"
                  title="Enter your shortcut"
                  renderAdditionalInputs={ true }
                  setIsModalOpen={ setIsModalOpen }
                  selectedOption={ selectedOption }
                />
              </Modal>
          )
        }

        </div>
        <div className="hr"></div>
        <SortedList 
          sortBy={ sortBy }
        ></SortedList>
      </> 
  )
}

export default ShortcutsSection