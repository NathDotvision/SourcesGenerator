import React from "react"
import { Data, ImageCard } from "../components"

/**
 * Represents a list of technologies.
 * @typedef {Object} Technology
 * @property {string} title - The title of the technology.
 * @property {string} imagePath - The image path of the technology.
 * @property {string} description - The description of the technology.
 * @property {string} url - The URL of the technology.
 */

/**
 * List of technologies.
 * @type {Technology[]}
 */
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

/**
 * Represents the About page component.
 */
class About extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <h1>Bienvenue sur {Data.name}</h1>
          <p>{Data.ShortDescriptionFrench}</p>
          <p>{Data.LongDescriptionFrench}</p>
          <div className="container">
            <h2 className="text-main_color text-2xl">
              Voici les technologies utilisée
            </h2>
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
