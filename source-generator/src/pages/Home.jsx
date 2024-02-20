import React, { useEffect, useState } from "react"
import { Data } from "../components"
import { saveAs } from "file-saver"
import { jsPDF } from "jspdf"
import { getDataLinks } from "./firebase"
import { Link } from "react-router-dom"
import { Links } from "../pages"

export default function Home() {
  const ExportToTxt = () => {
    let data = []
    getDataLinks.forEach((doc) => {
      data.push(doc.data())
    })

    // Convertissez les données en JSON
    const json = JSON.stringify(data, null, 2)
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
    getDataLinks.forEach((doc) => {
      data.push(doc.data())
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
    getDataLinks.forEach((doc) => {
      data.push(doc.data())
    })

    // Convertissez les données en JSON
    const json = JSON.stringify(data, null, 2)

    // Créez un Blob avec les données
    const blob = new Blob([json], { type: "text/csv" })

    // Utilisez saveAs pour enregistrer le fichier
    saveAs(blob, "data.csv")
  }

  const ExportToMD = () => {
    let dataSources = []
    let dataVideos = []
    getDataLinks.forEach((doc) => {
      if (doc.data().type === "Site") {
        dataSources.push(doc.data())
      } else {
        dataVideos.push(doc.data())
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
    getDataLinks.forEach((doc) => {
      if (doc.data().type === "Site") {
        dataSources.push(doc.data())
      } else {
        dataVideos.push(doc.data())
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

    doc.setFontSize(16)
    doc.text("Video", x, (y += 10))
    y += 10

    y = await processItems(doc, dataVideos, x, y)

    const widthInMM = doc.internal.pageSize.getWidth()
    const heightInMM = doc.internal.pageSize.getHeight()
    console.log("widthInMM", widthInMM)
    console.log("heightInMM", heightInMM)

    doc.save("data.pdf")
  }

  const Options_item = (id) => {
    return (
      <div className="m-2 flex gap-4">
        <button
          onClick={() => {
            alert("You clicked on " + id.id)
            console.log("You clicked on ", id.id)
          }}
          className="text-main_color hover:bg-main_color_light hover:text-black p-2 rounded-md border border-white"
        >
          Edit
        </button>
        <button
          onClick={() => {
            alert("You clicked on " + id.id)
            console.log("You clicked on ", id.id)
          }}
          className="text-main_color hover:bg-main_color_light hover:text-black p-2 rounded-md border border-white"
        >
          Delete
        </button>
      </div>
    )
  }

  const DataItem = ({ data }) => (
    <li id={data.id} name={data.link_name}>
      <div className="flex justify-between items-center gap-x-6 bg-secondary_color_light p-6 rounded-md">
        <img className="h-auto w-16 sm:h-16" src={data.icon_logo} alt="" />
        <div>
          <Link className="text-main_color" to={data.link_name}>
            {data.name}
          </Link>
        </div>
        <img
          className="h-16 w-auto 2xl:hidden"
          src={data.thumnail_logo}
          alt=""
        />
        <Options_item id={data.id} />
      </div>
    </li>
  )

  const Visualizer = () => {
    const [dataSources, setDataSources] = useState([])
    const [dataVideos, setDataVideos] = useState([])

    useEffect(() => {
      const sources = []
      const videos = []
      getDataLinks.forEach((doc) => {
        if (doc.data().type === "Site") {
          sources.push(doc.data())
        } else {
          videos.push(doc.data())
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
              Our Sources
            </h2>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-main_color_light sm:text-2xl">
              Our Sites
            </h2>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-16 xl:grid-cols-3 tele:grid-cols-4"
            >
              {dataSources.map((source, index) => (
                <DataItem data={source} key={index} />
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-main_color_light sm:text-2xl">
              Our Videos
            </h2>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-16 xl:grid-cols-3 tele:grid-cols-4"
            >
              {dataVideos.map((source, index) => (
                <DataItem data={source} key={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="body">
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={ExportToTxt}
          >
            Export to TXT
          </button>
          <button
            onClick={ExportToCSV}
            className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export to CSV
          </button>
          <button
            onClick={ExportToPDF}
            className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export to PDF
          </button>
          <button
            onClick={ExportToJSON}
            className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export to JSON
          </button>
          <button
            onClick={ExportToMD}
            className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export to MD
          </button>
        </div>
      </div>
      <Visualizer />
    </div>
  )
}
