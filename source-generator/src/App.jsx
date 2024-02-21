import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home, About, NotFound, Links, SignIn } from "./pages"
import { NavBar } from "./components"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavBar />
              <Home />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div>
              <NavBar />
              <About />
            </div>
          }
        />
        <Route
          path="/links"
          element={
            <div>
              <NavBar />
              <Links />
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div>
              <NavBar />
              <NotFound />
            </div>
          }
        />
        <Route
          path="/signIn"
          element={
            <div>
              <NavBar />
              <SignIn />
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
