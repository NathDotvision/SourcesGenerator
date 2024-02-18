import React, { useRef } from "react"
import { NavBar } from "../components"
import { addDoc, links, getDocs, getDataLinks } from "./firebase"
import { saveAs } from "file-saver"

export default function Links() {
  const formRef = useRef()

  const existInDatabase = async (url) => {
    const querySnapshot = await getDocs(links)
    querySnapshot.forEach((doc) => {
      if (doc.data().link_name === url) {
        return true
      }
    })
    return false
  }

  const cancelForm = () => {
    formRef.current.reset()
  }

  async function getFavicon() {
    alert("test Pas disponible pour le moment")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    let data = Object.fromEntries(formData)
    data = { ...data, date: new Date().toISOString() }
    if (data.link_name !== "" && existInDatabase(data.link_name) === false) {
      if (data.icon_logo === "") {
        data.icon_logo = getFavicon(data.link_name)
      }
      addDoc(links, data).then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
        formRef.current.reset()
      })
    } else {
      alert("This link already exist in the database")
      cancelForm()
    }
  }

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

  return (
    <div>
      <NavBar />
      <form className="m-12" id="form" ref={formRef} onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 ">New Link</h2>
            <p className="mt-1 text-sm leading-6 ">
              this form is to add a new link to the database
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="link-name"
                  className="block text-sm font-medium leading-6 "
                >
                  Link
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="link-name"
                    id="link-name"
                    autoComplete="given-name"
                    className="text-black block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="icon-logo"
                  className="block text-sm font-medium leading-6 "
                >
                  Icon Logo
                </label>
                <div className="mt-2">
                  <input
                    id="icon-logo"
                    name="icon-logo"
                    type="text"
                    className="text-black block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 "
                >
                  Type
                </label>
                <div className="mt-2">
                  <select
                    id="type"
                    name="type"
                    autoComplete="type"
                    className="text-black block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Site</option>
                    <option>Video</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={cancelForm}
            className="rounded-md bg-secondary_color px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-secondary_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={ExportToTxt}
        >
          Export to TXT
        </button>
        <button className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Export to CSV
        </button>
        <button className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Export to PDF
        </button>
        <button
          onClick={ExportToJSON}
          className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Export to JSON
        </button>
        <button
          onClick={getFavicon}
          className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Test
        </button>
      </div>
    </div>
  )
}
