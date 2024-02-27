import React, { useEffect, useState } from "react"
import * as component from "../components"
import * as fonctions from "../functions"
import { getOnSnappLinks } from "./firebase"


/**
 * List of projects.
 * @type {Array<Object>}
 */
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

/**
 * The Home component.
 * 
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home() {
  /**
   * Array of objects representing data buttons.
   * Each object contains a name and an action.
   * @type {Array<{name: string, action: Function}>}
   */
  const DataButton = [
    {
      name: "Export to TXT",
      action: fonctions.ExportToTxt,
    },
    {
      name: "Export to CSV",
      action: fonctions.ExportToCSV,
    },
    {
      name: "Export to PDF",
      action: fonctions.ExportToPDF,
    },
    {
      name: "Export to JSON",
      action: fonctions.ExportToJSON,
    },
    {
      name: "Export to MD",
      action: fonctions.ExportToMD,
    },
    {
      name: "Export All",
      action: () => {
        fonctions.ExportToPDF()
        fonctions.ExportToTxt()
        fonctions.ExportToCSV()
        fonctions.ExportToJSON()
        fonctions.ExportToMD()
      },
    },
  ]

  /**
   * Renders a visualizer component that displays sources and videos.
   *
   * @returns {JSX.Element} The visualizer component.
   */
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
            <component.ToggleButton show={showSources} setShow={setShowSources} title="Our Sites" />
            <component.List show={showSources} data={dataSources} />
          </div>
          <div>
            <component.ToggleButton show={showVideos} setShow={setShowVideos} title="Our Videos" />
            <component.List show={showVideos} data={dataVideos} />
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
            <component.Button data={data} key={index} />
          ))}
        </div>
      </div>
      <Visualizer />
    </div>
  )
}
