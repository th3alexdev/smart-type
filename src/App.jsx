import React, { useState, useEffect } from "react"
import "./scss/styles.scss"
import {
        Header,
        HeaderNav,
        Section
       } from "./routes"
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation()

  const [currentSection, setCurrentSection] = useState(location.pathname);
  const [openNav, setOpenNav] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const darkModeEnabled = JSON.parse(localStorage.getItem("darkModeEnabled"));

    if (darkModeEnabled === null) setDarkTheme(false)
    else {
      setDarkTheme(darkModeEnabled);
      toggleDarkTheme(darkModeEnabled)
    }
    console.log(currentSection)
  }, []);

  const toggleDarkTheme = (enabled) => {
    const body = document.body;
  
    if (enabled) body.classList.add("dark-mode");
    else body.classList.remove("dark-mode");
  };

  const handleToggleDarkTheme = () => {
    setDarkTheme(!darkTheme)
    toggleDarkTheme(!darkTheme)
    localStorage.setItem("darkModeEnabled", !darkTheme);
  };

  return (
    <>
      <Toaster />
      <Header
        openNav={ openNav }
        setOpenNav={ setOpenNav }
      >
        <HeaderNav 
          openNav={ openNav }
          setOpenNav={ setOpenNav }
          currentSection={ currentSection }
          setCurrentSection={ setCurrentSection }
        />
      </Header> 
      <main className="main">
        <Section 
          toggleDarkTheme={ handleToggleDarkTheme }
          darkTheme={ darkTheme }
        />
      </main>
    </>
  )
}

export default App
