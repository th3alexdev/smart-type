import React from "react"
import ReactDOM from "react-dom";
import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md"

function Modal({ children, closeModal }) {

  const handleModalClose = () => {
    closeModal && closeModal();
  };
 
  return ReactDOM.createPortal (
    <>
      <div className="modal">
      <IconContext.Provider value={{ color: "#222", className: "icon btn" }}>
        <MdAdd 
          className="btn btn-cross"
          onClick={ handleModalClose }
        />
      </IconContext.Provider>
        { children }
      </div>
      <div 
        className="shadow"
        onClick={ handleModalClose }
      ></div>
    </>,
    document.getElementById("modal")
  )
}

export default Modal
