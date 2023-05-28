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
      <span className="btn-main__text">{ cta }</span>
    </button>
  )
}

export default MainButton
