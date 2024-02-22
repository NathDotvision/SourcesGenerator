import React, { useState } from "react"
import { Link } from "react-router-dom"

const Projet = (data) => {
  const [isOpen, setIsOpen] = useState(false)

  let name = data.name.length > 10 ? data.name.substring(0, 10) + "..." : data.name;


  return (
    <div className="flex flex-col mb-4 bg-gray-100 rounded-lg p-4" id={data.id} name={data.link_name}>
            <img src={data.thumnail_logo}/>
        <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center">
        <img
          src={data.icon_logo}
          alt="Tuple"
          className="w-12 h-12 object-contain"
        />
        <Link className="ml-4 font-semibold text-main_color" to={data.link_name}>
        {name}
          </Link>
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
    name : "Projet 1",
    link_name : "https://www.youtube.com/watch?v=EgqXbIZFCUs&list=PLT2KSPhMMiqp0jwqSCKaOjJHjl8ZFS2tI&index=4",
    icon_logo : "https://yt3.ggpht.com/VoVN_l-8s0Wd3NFl_ef0aFnA_JBHWE5yui_XIj1Mh8g5df5nBZWoihMYcDugK5ugr0wtMbD4Mw=s88-c-k-c0x00ffffff-no-rj",
    thumnail_logo : "https://i.ytimg.com/vi/EgqXbIZFCUs/hqdefault.jpg",
  }
]

const Projets = () => {

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-7">
      {DataProjets.map((data) => (
        <Projet {...data} />
      ))}
</div>
  )
}

export default Projets
