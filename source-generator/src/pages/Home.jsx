import React from "react"
import { NavBar, Data } from "../components"
import { saveAs } from "file-saver"
import { jsPDF } from "jspdf"
import { getDataLinks } from "./firebase"
import { Link } from "react-router-dom"

export default function Home() {
  const ExportToTxt = () => {
    let data = []
    getDataLinks.forEach((doc) => {
      data.push(doc.data())
    })

    // Convertissez les données en JSON
    const json = JSON.stringify(data, null, 2)

    // Créez un Blob avec les données
    const blob = new Blob([json], { type: "text/plain;charset=utf-8" })

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

  const getImage = async (imageData) => {
    const titleURL = new URL(
      `http://localhost:${Data.PORT}/image?url=${imageData}`
    )
    const responseImage = await fetch(titleURL.toString())

    if (!responseImage.ok) {
      throw new Error(`HTTP Error: ${responseImage.status}`)
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

  const Visualizer = () => {
    let dataSources = []
    let dataVideos = []
    getDataLinks.forEach((doc) => {
      if (doc.data().type === "Site") {
        dataSources.push(doc.data())
      } else {
        dataVideos.push(doc.data())
      }
    })

    return (
      <div>
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-main_color sm:text-4xl">
              Our Sources
            </h2>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-main_color_light sm:text-2xl">
            Our Sites
          </h2>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {dataSources.map((source) => (
              <li key={source.name}>
                <div className="flex items-center gap-x-6 bg-secondary_color_light p-6 rounded-md">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={source.icon_logo}
                    alt=""
                  />
                  <div>
                    <Link className="text-main_color" to={source.link_name}>
                      {" "}
                      {source.name}
                    </Link>
                  </div>
                  <img
                    className="h-16 w-auto"
                    src={source.thumnail_logo}
                    alt=""
                  />
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold tracking-tight text-main_color_light sm:text-2xl">
            Our Videos
          </h2>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {dataVideos.map((source) => (
              <li key={source.name}>
                <div className="flex items-center gap-x-6 bg-secondary_color_light p-6 rounded-md">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={source.icon_logo}
                    alt=""
                  />
                  <div>
                    <Link className="text-main_color" to={source.link_name}>
                      {" "}
                      {source.name}
                    </Link>
                  </div>
                  <img
                    className="h-16 w-auto"
                    src={source.thumnail_logo}
                    alt=""
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div>
      <NavBar />
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
        </div>
      </div>
      <Visualizer />
    </div>
  )
}
