import React from 'react'
import emptyFolderIMG from "./../../../public/assets/img/empty.png";

function EmptyCardList({ title }) {
  return (
    <div className="empty">
      <div className="empty-container">
        <img className="empty__img" src={ emptyFolderIMG } />
        <h3 className="empty__title">{ title }</h3>
      </div>
    </div>
  )
}

export default EmptyCardList
