import React, { useState } from "react"
import * as components from "../components"
import {
  ChevronDownIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
  ArchiveBoxIcon,
  ShareIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"


const DataOptions = [
  {
    id: 1,
    name: "Edit",
    icon: PencilSquareIcon,
    action: null,
    color: "text-gray-700",
  },
  {
    id: 2,
    name: "Duplicate",
    icon: DocumentDuplicateIcon,
    action: null,
    color: "text-gray-700",
  },
  {
    id: 3,
    name: "Archive",
    icon: ArchiveBoxIcon,
    action: null,
    color: "text-gray-700",
  },
  {
    id: 4,
    name: "Share",
    icon: ShareIcon,
    action: null,
    color: "text-gray-700",
  },
  {
    id: 5,
    name: "Favorite",
    icon: HeartIcon,
    action: null,
    color: "text-orange-600",
  },
  {
    id: 5,
    name: "Delete",
    icon: TrashIcon,
    action: null,
    color: "text-red-600",
  },
]

const OptionsItem2 = () => {
  return (
    <div className="absolute mt-2 w-auto origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="none">
        {DataOptions.map((option) => (
          <div
            onClick={option.action}
            key={option.id}
            className={`flex items-center justify-between w-full px-4 py-2 text-sm ${option.color} hover:bg-gray-100`}
          >
            <option.icon className="w-5 h-5 mr-2" aria-hidden="true" />
            <span>{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

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
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex">
              Open options
              <ChevronDownIcon className="w-5 h-5 ml-2" />
            </span>
            {isOpen && <OptionsItem2 id={data.id} />}
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
  const [showDetails, setShowDetails] = useState(false)

  const handleClose = () => {
    setShowNotification(false)
  }


  return (
    <div>
      {showNotification && (
        <components.SavedNotification
          message="Successfully saved!"
          onClose={handleClose}
        />
      )}
      {showDetails && <components.ProfileComponent />}
      <button onClick={() => setShowDetails(!showDetails)}>Show Details</button>
      <Test />
    </div>
  )
}

export default Projets
