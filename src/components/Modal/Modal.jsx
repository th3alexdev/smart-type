import React from 'react'
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons';
import { MdAdd } from "react-icons/md"

function Modal({ children, setOpenModal }) {

  const closeModal = () => {
    setOpenModal(false)
  }
 
  return ReactDOM.createPortal (
    <>
      <div className="modal">
      <IconContext.Provider value={{ color: "#222", className: "icon btn" }}>
        <MdAdd 
          className="modal__close-btn"
          onClick={ closeModal }
        />
      </IconContext.Provider>
        { children }
      </div>
      <div 
        className="shadow"
        onClick={ closeModal }
      ></div>
    </>,
    document.getElementById('modal')
  )
}

export default Modal
