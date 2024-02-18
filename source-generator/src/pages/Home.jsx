import React from "react"
import { NavBar } from "../components"

class Home extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="body">
          <h1>Bienvenue sur la page d'accueil</h1>
          <p>Ceci est la page d'accueil de notre application React.</p>
        </div>
      </div>
    )
  }
}

export default Home
