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
import Manager from "./classes/ShortcutsManager";

function App() {
  const location = useLocation();
  const { allShortcuts, setAllShortcuts } = useContext(ShortcutsContext);

  const [currentSection, setCurrentSection] = useState(location.pathname);
  const [openNav, setOpenNav] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const originalShortcuts = JSON.parse(localStorage.getItem('shortcuts'));
    if (originalShortcuts === null) { 
      setDefaultShortcuts(setAllShortcuts) 
      chrome.storage.sync.remove("shortcuts")
    } else { 
      loadShortcuts(setAllShortcuts)
    }

    // Obtener los shortcuts modificados de chrome.storage.sync
    chrome.storage.sync.get("shortcuts", function(result) {
      let storedShortcuts = result.shortcuts;

      if (storedShortcuts) {
        if (!Array.isArray(storedShortcuts)) {
          storedShortcuts = [storedShortcuts];
        }

        const storedShortcutsString = JSON.stringify(storedShortcuts);
        const originalShortcutsString = JSON.stringify(originalShortcuts);

        if (storedShortcutsString !== originalShortcutsString) {
          localStorage.removeItem("shortcuts");
          localStorage.setItem("shortcuts", storedShortcutsString);
          chrome.storage.sync.remove("shortcuts");
          // loadShortcuts(setAllShortcuts);
        }

    } else {

      const shortcuts = Manager.getAllShortcuts;
      chrome.runtime.sendMessage({ action: 'sendVariable', data: shortcuts });
      chrome.storage.sync.set({ shortcuts });
    }
  });

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
