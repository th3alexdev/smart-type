import React, { useState } from "react"
import "./scss/styles.scss"
import {
        Header,
        HeaderNav,
        Section
       } from "./routes"
import { Toaster } from "react-hot-toast"; 
      
function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [showSection, setShowSection] = useState(false);
  const [openNav, setOpenNav] = useState(false);

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
          setCurrentSection={ setCurrentSection }
          setShowSection={ setShowSection }
        />
      </Header> 
      <main className="main">
        <Section 
          currentSection={ currentSection }
          showSection={ showSection }
        />
      </main>
    </>
  )
}

export default App
