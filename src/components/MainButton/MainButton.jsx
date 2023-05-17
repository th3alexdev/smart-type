import React from 'react'

function MainButton({ cta, children }) {
  return (
    <button className="btn btn-main">
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
