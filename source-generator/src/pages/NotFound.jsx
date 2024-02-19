import React from "react"
import { NavBar } from "../components"

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
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
        </div>
      </div>
    )
  }
}

export default NotFound
