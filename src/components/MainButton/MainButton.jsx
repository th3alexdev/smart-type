import React from 'react'

function MainButton({ cta, children, openModal }) {

  const modalHandler = () => {
    openModal(true)
  }

  return (
    <button 
      className="btn btn-main"
      onClick={ openModal ? () => { modalHandler() } : null }
    >
      { children }
      { cta }
    </button>
  )
}

export default MainButton
