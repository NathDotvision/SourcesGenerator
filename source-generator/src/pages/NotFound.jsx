import React, { useState } from "react"
import Links from "./Links"

function MyComponent() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={handleClick}>Ajouter un lien</button>
      {Array(count)
        .fill()
        .map((_, i) => (
          <Links key={i} />
        ))}
    </div>
  )
}

class NotFound extends React.Component {
  render() {
    return (
      <div>
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
          <MyComponent />
        </div>
      </div>
    )
  }
}

export default NotFound
