import React, { useState } from "react"
import { SavedNotification } from "../components"

const Projet = (data) => {
  const [isOpen, setIsOpen] = useState(false)

  let name =
    data.name.length > 10 ? data.name.substring(0, 10) + "..." : data.name

  return (
    <div
      className="flex flex-col m-2 bg-gray-100 rounded-lg p-4"
      id={data.id}
      name={data.link_name}
    >
      <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center">
          <h1 className="ml-4 font-semibold text-main_color">{name}</h1>
        </div>
        <div>
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>Open options</span>
            {isOpen && (
              <div className="absolute bg-white rounded-md shadow-lg">
                <div className="flex flex-col p-2">
                  <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </button>
        </div>
      </li>
    </div>
  )
}

const DataProjets = [
  {
    id: 1,
    name: "Projet 1",
  },
  {
    id: 2,
    name: "Projet 2",
  },
  {
    id: 3,
    name: "Projet 3",
  },
  {
    id: 4,
    name: "Projet 4",
  },
  {
    id: 5,
    name: "Projet 5",
  },
]

const Test = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-7">
      {DataProjets.map((data) => (
        <Projet {...data} />
      ))}
    </div>
  )
}

const Projets = () => {
  const [showNotification, setShowNotification] = useState(true)

  const handleClose = () => {
    setShowNotification(false)
  }

  return (
    <div>
      {showNotification && (
        <SavedNotification
          message="Successfully saved!"
          onClose={handleClose}
        />
      )}
      <Test />
    </div>
  )
}

export default Projets
