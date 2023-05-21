import React from 'react'

function MainButton({ cta, children, setOpenModal }) {

  const modalHandler = () => {
    setOpenModal(true)
  }

  return (
    <button 
      className="btn btn-main"
      onClick={ setOpenModal ? () => { modalHandler() } : null }
    >
      {
        children
      }
      { 
        cta 
      }
    </button>
  )
}

export default MainButton
