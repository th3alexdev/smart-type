import React from 'react'

function EmptyCardList() {
  return (
    <div className="empty">
      <div className="empty-container">
        <img className="empty__img" src="../../../src/assets/img/empty.png" />
        <h3 className="empty__title">No shortcuts to show!</h3>
      </div>
    </div>
  )
}

export default EmptyCardList
