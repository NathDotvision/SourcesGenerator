import React, { useEffect, useState } from "react"
import { Data } from "../components"

export default function Home() {
  const [formUser, setformUser] = useState({
    username: "",
    password: "",
  })

  const fournisseur = [
    {
      name: "Google",
      logo: Data.GoogleLogo,
      action: () => {
        console.log("Google")
      },
      color: "bg-red-500",
      active: true,
    },
    {
      name: "Facebook",
      logo: Data.FacebookLogo,
      action: () => {
        console.log("Facebook")
      },
      color: "bg-blue-500",
      active: false,
    },
    {
      name: "Twitter",
      logo: Data.TwitterLogo,
      action: () => {
        console.log("Twitter")
      },
      color: "bg-blue-400",
      active: false,
    },
    {
      name: "Github",
      logo: Data.GithubLogo,
      action: () => {
        console.log("Github")
      },
      color: "bg-black",
      active: false,
    },
    {
      name: "Microsoft",
      logo: Data.MicrosoftLogo,
      action: () => {
        console.log("Microsoft")
      },
      color: "bg-green-600",
      active: false,
    },
  ]

  return (
    <div className="flex items-center min-h-screen">
      <div className="animate-shadow-pulse rounded-xl m-auto">
        <div className="m-10 text-2xl text-main_color">
          <h1>Bienvenue sur {Data.name}</h1>
        </div>
      </div>
      <div className="animate-shadow-pulse rounded-xl m-auto">
        <div className="flex flex-col justify-center m-10 items-center gap-y-4 ">
          <div className="flex flex-col">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formUser.username}
              onChange={(e) => setformUser(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Mot de passe</label>
            <input
              className="rounded-md border-2 border-main_color"
              type="password"
              id="password"
              name="password"
              value={formUser.password}
              onChange={(e) => setformUser(e.target.value)}
            />
          </div>
          <div className="flex justify-around m-4 gap-3">
            {fournisseur.map((fournisseur) => (
              <button
                className={`text-white rounded-full w-10 h-10 ${fournisseur.color}`}
                key={fournisseur.name}
                onClick={fournisseur.action}
                disabled={fournisseur.active}
              >
                <img
                  className="h-full"
                  src={fournisseur.logo}
                  alt={fournisseur.name}
                />
              </button>
            ))}
          </div>
          <button
            className="bg-main_color text-white p-2 rounded-md"
            onClick={console.log(formUser)}
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  )
}
