import React from "react"
import { NavBar, Data } from "../components"
import { saveAs } from "file-saver"
import { jsPDF } from "jspdf"
import { getDataLinks } from "./firebase"

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
        doc.addImage(image, "JPEG", 0, y, 32, 32)
      }

      doc.textWithLink(item.name, x, y, { url: item.link_name })

      imageData = item.thumnail_logo
      if (imageData !== undefined) {
        const image = await getImage(imageData)
        doc.addImage(image, "JPEG", x, y, 1080 / 25, 1920 / 25)
      }

      y += 10
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

    doc.setFontSize(20)
    y += 10
    doc.text("Sites", (x += 10), (y += 10))
    y += 10

    y = await processItems(doc, dataSources, x, y)

    doc.text("Video", x, (y += 10))
    y += 10

    y = await processItems(doc, dataVideos, x, y)

    doc.save("data.pdf")
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
    </div>
  )
}
