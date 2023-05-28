import React from "react"

function SwitchButton({ checked, onChange }) {
  const handleToggle = () => {
    onChange(checked);
  };

  return (
    <label className="switch">
      <input 
        type="checkbox" 
        onChange={ handleToggle } 
        checked={ checked } 
      />
      <span className="slider round"></span>
    </label>
  )
}

export default SwitchButton
