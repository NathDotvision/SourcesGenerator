import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home, About, NotFound, Links, SignIn, Projets } from "./pages"
import { NavBar, Footer } from "./components"
import "./App.css"

/**
 * Renders the main application component.
 * @returns {JSX.Element} The rendered application component.
 */
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
              <Footer />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div>
              <NavBar />
              <About />
              <Footer />
            </div>
          }
        />
        <Route
          path="/links"
          element={
            <div>
              <NavBar />
              <Links />
              <Footer />
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div>
              <NavBar />
              <NotFound />
              <Footer />
            </div>
          }
        />
        <Route
          path="/signIn"
          element={
            <div>
              <NavBar />
              <SignIn />
              <Footer />
            </div>
          }
        />
        <Route
          path="/projets"
          element={
            <div>
              <NavBar />
              <Projets />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
