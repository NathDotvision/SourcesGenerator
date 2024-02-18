import React from "react"
import { Link } from "react-router-dom"

class NotFound extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "var(--back)",
          color: "var(--front)",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="body"
      >
        <img
          style={{ filter: "hue-rotate(-30deg)" }}
          src="Hands - Folder Error.png"
          alt="Error"
        />
        <h1 style={{ color: "var(--main_color)" }}>404</h1>
        <p style={{ color: "var(--secondary_color)" }}>
          Désolé, la page que vous cherchez n'existe pas.
        </p>
        <Link
          to="/"
          style={{ color: "var(--main_color)", textDecoration: "none" }}
        >
          <button>Retour à l'accueil</button>
        </Link>
      </div>
    )
  }
}

export default NotFound
