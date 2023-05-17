import React from 'react'

function Form({ title, placeholder }) {

  const enterHandler = (e) => {
    if(e.keyCode === 13) {
      e.preventDefault();
      document.execCommand('insertLineBreak', false, null);
    }
  }

  return (
    <form className="form">
      <h1 className="title title-principal">
        <label className="form__label" htmlFor="test">{ title }</label>
      </h1>
      
      <div
        contentEditable
        type="text"
        data-placeholder={ placeholder }
        id="test"
        className="form__input"
        onInput={(e) => {
          // Testing.expandShortcut(e.target, Manager.getAllShorcuts())
        }}
        onKeyDown={(e) => enterHandler(e)}
      ></div>
    </form>
  )
}

export default Form
