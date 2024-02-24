import React, { useEffect, useState } from "react"
import { Data } from "../components"
import { saveAs } from "file-saver"
import { jsPDF } from "jspdf"
import { deleteLinks, getOnSnappLinks } from "./firebase"
import { Link } from "react-router-dom"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import Papa from "papaparse"

const ProjetsList = [
  {
    name: "Bibliographic",
    author: "Nathan",
    license: "MIT",
  },
  {
    name: "DotVisionUnreal",
    author: "Nathan",
    license: "MIT",
  },
]

export default function Home() {
  const ExportToTxt = () => {
    let data = []
    getOnSnappLinks.forEach((doc) => {
      data.push(doc)
    })

    // Convertissez les données en JSON
    let SuperString = ""
    data.forEach((doc) => {
      console.log(doc)
      SuperString += doc.link_name + "\n"
    })

    // Créez un Blob avec les données
    const blob = new Blob([SuperString], { type: "text/plain;charset=utf-8" })

    // Utilisez saveAs pour enregistrer le fichier
    saveAs(blob, "data.txt")
  }

  const ExportToJSON = () => {
    let data = []
    getOnSnappLinks.forEach((doc) => {
      data.push(doc)
    })

    // Convertissez les données en JSON
    const json = JSON.stringify(data, null, 2)

    // Créez un Blob avec les données
    const blob = new Blob([json], { type: "application/json" })

    // Utilisez saveAs pour enregistrer le fichier
    saveAs(blob, "data.json")
  }

  const ExportToCSV = () => {
    let data = []
    getOnSnappLinks.forEach((doc) => {
      data.push(doc)
    })

    // Convertissez les données en CSV
    const csv = Papa.unparse(data)

    // Créez un Blob avec les données
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })

    // Utilisez saveAs pour enregistrer le fichier
    saveAs(blob, "data.csv")
  }

  const ExportToMD = () => {
    let dataSources = []
    let dataVideos = []
    getOnSnappLinks.forEach((doc) => {
      if (doc.type === "Site") {
        dataSources.push(doc)
      } else {
        dataVideos.push(doc)
      }
    })

    let md = "# My Sources\n\n"
    md += "## Sites\n\n"
    dataSources.forEach((source) => {
      md += `### [${source.name}](${source.link_name})\n\n`
      md += `![${source.name}](${source.thumnail_logo})\n\n`
    })

    md += "## Videos\n\n"
    dataVideos.forEach((source) => {
      md += `### [${source.name}](${source.link_name})\n\n`
      md += `![${source.name}](${source.thumnail_logo})\n\n`
    })

    // Créez un Blob avec les données
    const blob = new Blob([md], { type: "text/markdown" })

    // Utilisez saveAs pour enregistrer le fichier
    saveAs(blob, "data.md")
  }

  const getImage = async (imageData) => {
    const titleURL = new URL(
      `http://localhost:${Data.PORT}/image?url=${imageData}`
    )
    const responseImage = await fetch(titleURL.toString())

    if (!responseImage.ok) {
      return ""
    }

    const dataImage = await responseImage.json()
    return dataImage.image
  }

  const processItems = async (doc, items, x, y) => {
    for (const item of items) {
      if (y > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage()
        y = 20 // Réinitialisez la position y pour la nouvelle page
      }

      let imageData = item.icon_logo
      if (imageData !== undefined) {
        const image = await getImage(imageData)
        doc.addImage(image, "JPEG", 10, y, 32 / 2, 32 / 2)
      }

      doc.setFontSize(12)
      doc.textWithLink(item.name, x, y, { url: item.link_name })

      y += 5
      imageData = item.thumnail_logo
      if (imageData !== undefined) {
        const image = await getImage(imageData)
        let factor = 50
        let Image = [1920 / factor, 1080 / factor]
        doc.addImage(image, "JPEG", x + Image[0] * 3, y, Image[0], Image[1])
        y += Image[1] + 5
      } else {
        y += 5
      }
    }

    return y
  }

  const ExportToPDF = async () => {
    let dataSources = []
    let dataVideos = []
    getOnSnappLinks.forEach((doc) => {
      if (doc.type === "Site") {
        dataSources.push(doc)
      } else {
        dataVideos.push(doc)
      }
    })

    const doc = new jsPDF()
    let x = 10
    let y = 20
    doc.setFontSize(22)
    doc.text("My Sources", (x += 10), (y += 10))

    doc.setFontSize(16)
    y += 10
    doc.text("Sites", (x += 10), (y += 10))
    y += 10

    y = await processItems(doc, dataSources, x, y)

    // Vérifiez si le contenu suivant dépassera la limite de la page
    if (y > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage()
      y = 20 // Réinitialisez la position y pour la nouvelle page
    }

    doc.setFontSize(16)
    doc.text("Video", x, (y += 10))
    y += 10

    y = await processItems(doc, dataVideos, x, y)

    // Vérifiez à nouveau pour le débordement de page
    if (y > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage()
      y = 20
    }

    doc.save("data.pdf")
  }

  const Options_item = (id) => {
    return (
      <div className="absolute bg-white rounded-md shadow-lg">
        <div className="flex flex-col p-2">
          <button
            onClick={() => {
              alert("Want to edit " + id.id)
              console.log("You clicked on ", id.id)
            }}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          <button
            onClick={() => {
              const strint = "Want to Delete " + id.id
              alert(strint)
              console.log(strint)
              deleteLinks(id.id)
            }}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Delete
          </button>
        </div>
      </div>
    )
  }

  const DataItem = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false)

    let name =
      data.name.length > 10 ? data.name.substring(0, 10) + "..." : data.name

    return (
      <div
        className="flex flex-col m-2 bg-gray-100 rounded-lg p-4 justify-between items-center"
        id={data.id}
        name={data.link_name}
      >
        <div className="flex flex-col items-center justify-center text-center h-full">
          {data.thumnail_logo === "test_thumnail" ? (
            <img src={data.icon_logo} className="h-20" />
          ) : (
            <img src={data.thumnail_logo} className="max-h-20" />
          )}
        </div>
        <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center">
            <img
              src={data.icon_logo}
              alt="Tuple"
              className="w-12 h-12 object-contain"
            />
            <Link
              className="ml-4 font-semibold text-main_color"
              to={data.link_name}
            >
              {name}
            </Link>
          </div>
          <div>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Open options</span>
              {isOpen && <Options_item id={data.id} />}
            </button>
          </div>
        </li>
      </div>
    )
  }

  const DataButton = [
    {
      name: "Export to TXT",
      action: ExportToTxt,
    },
    {
      name: "Export to CSV",
      action: ExportToCSV,
    },
    {
      name: "Export to PDF",
      action: ExportToPDF,
    },
    {
      name: "Export to JSON",
      action: ExportToJSON,
    },
    {
      name: "Export to MD",
      action: ExportToMD,
    },
    {
      name: "Export All",
      action: () => {
        ExportToPDF()
        ExportToTxt()
        ExportToCSV()
        ExportToJSON()
        ExportToMD()
      },
    },
  ]

  const ButtonItem = ({ data }) => (
    <button
      onClick={data.action}
      className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {data.name}
    </button>
  )

  const Visualizer = () => {
    const [dataSources, setDataSources] = useState([])
    const [dataVideos, setDataVideos] = useState([])
    const [showSources, setShowSources] = useState(false)
    const [showVideos, setShowVideos] = useState(false)

    useEffect(() => {
      const sources = []
      const videos = []
      getOnSnappLinks.forEach((doc) => {
        if (doc.type === "Site") {
          sources.push(doc)
        } else {
          videos.push(doc)
        }
      })

      setDataSources(sources)
      setDataVideos(videos)
    }, [])

    return (
      <div>
        <div className="mx-auto flex flex-col max-w-7xl gap-x-8 gap-y-10 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl flex justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-main_color sm:text-4xl">
              Our Sources of
              <select
                id="type"
                name="type"
                autoComplete="type"
                className="text-black block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {ProjetsList.map((project, index) => (
                  <option key={index} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            </h2>
          </div>
          <div>
            <button
              className="text-xl font-bold tracking-tight text-main_color_light sm:text-2xl flex jutify-center items-center"
              onClick={() => setShowSources(!showSources)}
            >
              <h1>Our Sites </h1>
              {showSources ? (
                <ChevronDownIcon className="ml-2 block h-6 w-6 flex" />
              ) : (
                <ChevronUpIcon className="ml-2 block h-6 w-6 flex" />
              )}
            </button>
            {showSources && (
              <ul
                role="list"
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7"
              >
                {dataSources.map((source, index) => (
                  <DataItem data={source} key={index} />
                ))}
              </ul>
            )}
          </div>
          <div>
            <button
              className="text-xl font-bold tracking-tight text-main_color_light sm:text-2xl flex jutify-center items-center"
              onClick={() => setShowVideos(!showVideos)}
            >
              <h1>Our Video </h1>
              {showVideos ? (
                <ChevronDownIcon className="ml-2 block h-6 w-6 flex" />
              ) : (
                <ChevronUpIcon className="ml-2 block h-6 w-6 flex" />
              )}
            </button>
            {showVideos && (
              <ul
                role="list"
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7"
              >
                {dataVideos.map((source, index) => (
                  <DataItem data={source} key={index} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="body">
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {DataButton.map((data, index) => (
            <ButtonItem data={data} key={index} />
          ))}
        </div>
      </div>
      <Visualizer />
    </div>
  )
}
