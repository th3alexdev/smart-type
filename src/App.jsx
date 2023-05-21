import React, { useState, useEffect} from "react"
import "./scss/styles.scss"
import {
        Header,
        HeaderNav,
        Section
       } from "./routes"
      
function App() {
  const [section, setSection] = useState("home");
  const [showSection, setShowSection] = useState(false);

  return (
    <>
      <Header>
        <HeaderNav 
          setSection={ setSection }
          setShowSection={ setShowSection }
        />
      </Header> 
      <main className="main">
        <Section 
          section={ section }
          showSection={ showSection }
        />
      </main>
    </>
  )
}

export default App
