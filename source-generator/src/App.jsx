import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home, About, NotFound } from "./pages"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
