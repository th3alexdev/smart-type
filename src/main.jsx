import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { ShortcutsProvider } from "./context/ShortcutsProvider"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <ShortcutsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ShortcutsProvider>
)