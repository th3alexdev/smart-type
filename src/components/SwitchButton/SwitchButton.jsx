import React from "react"

function SwitchButton({ darkTheme, setDarkTheme }) {
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <label className="switch">
      <input 
        type="checkbox" 
        onChange={ toggleTheme } 
        checked={ darkTheme } 
      />
      <span className="slider round"></span>
    </label>
  )
}

export default SwitchButton
