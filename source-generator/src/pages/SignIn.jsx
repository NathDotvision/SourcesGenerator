import React, { useEffect, useState } from "react"
import { Data } from "../components"

export default function Home() {
  return (
    <div>
      <div className="body">
        <h1>Bienvenue sur {Data.name}</h1>
        <p>{Data.ShortDescriptionFrench}</p>
        <p>{Data.LongDescriptionFrench}</p>
      </div>
    </div>
  )
}
