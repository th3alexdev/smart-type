import React, { useState, useEffect, useContext } from "react"
import "./css/styles.min.css"
import {
        Header,
        HeaderNav,
        Section
       } from "./routes"
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { setDefaultShortcuts, loadShortcuts } from "./utils/loadShortcuts";
import { ShortcutsContext } from "./context/ShortcutsProvider";

function App() {
  const location = useLocation();
  const { allShortcuts, setAllShortcuts } = useContext(ShortcutsContext);

  const [currentSection, setCurrentSection] = useState(location.pathname);
  const [openNav, setOpenNav] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const storedShortcuts = JSON.parse(localStorage.getItem("shortcuts"));
    if (storedShortcuts === null) setDefaultShortcuts(setAllShortcuts);
    else { 
      loadShortcuts(setAllShortcuts)
    }

    const darkModeEnabled = JSON.parse(localStorage.getItem("darkModeEnabled"));
    if (darkModeEnabled === null) setDarkTheme(false)
    else {
      setDarkTheme(darkModeEnabled);
      toggleDarkTheme(darkModeEnabled)
    }
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
          setCurrentSection={ setCurrentSection }
          toggleDarkTheme={ handleToggleDarkTheme }
          darkTheme={ darkTheme }
        />
      </main>
    </>
  )
}

export default App
