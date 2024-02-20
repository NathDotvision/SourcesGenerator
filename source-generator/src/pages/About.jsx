import React from "react"
import { Data, ImageCard, NavBar } from "../components"

const Technologies = [
  {
    title: "React",
    imagePath: Data.ReactImage,
    description:
      "Une bibliothèque JavaScript pour la construction d'interfaces utilisateur.",
    url: "https://fr.reactjs.org/",
  },
  {
    title: "NPM",
    imagePath: Data.NPMImage,
    description: "Un gestionnaire de paquets pour Node.js.",
    url: "https://www.npmjs.com/",
  },
  {
    title: "Firebase",
    imagePath: Data.FirebaseImage,
    description:
      "Une plateforme de développement d'applications mobiles et web de Google.",
    url: "https://console.firebase.google.com/u/0/project/generatorsource-c3ea4/firestore/data/~2Fprojets~2F2Klpwu1FiaaZYLtMx7pm",
  },
  {
    title: "Tailwind CSS",
    imagePath: Data.TailwindImage,
    description:
      "Un framework CSS utilitaire pour la construction d'interfaces utilisateur personnalisées.",
    url: "https://tailwindcss.com/",
  },
  {
    title: "Flat Ui Colors",
    imagePath: Data.FlatUIColorsImage,
    url: "https://flatuicolors.com/palette/fr",
    description:
      "Une collection de couleurs plates pour les concepteurs et les développeurs.",
  },
  {
    title: "BlobMaker",
    imagePath: Data.BlobMakerImage,
    url: "https://www.blobmaker.app/",
    description: "Un outil pour générer des formes de blob aléatoires.",
  },
]

class About extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <h1>Bienvenue sur {Data.name}</h1>
          <p>{Data.ShortDescriptionFrench}</p>
          <p>{Data.LongDescriptionFrench}</p>
          <div className="container">
            {Technologies.map((technology, index) => (
              <ImageCard
                key={index}
                title={technology.title}
                imagePath={technology.imagePath}
                description={technology.description}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default About
