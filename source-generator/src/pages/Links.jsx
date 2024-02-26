import React, { useRef } from "react"
import { Data } from "../components"
import { setDoc, db, doc, getOnSnappLinks } from "./firebase"

const PORT = Data.PORT

function Links() {
  const formRef = useRef()

  function generateRandomString(length) {
    let result = ""
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  const importTxt = () => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = ".txt"
    fileInput.click()

    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0]
      const text = await file.text()
      console.log(text)
      const textArray = text.split("\n")
      textArray.forEach(async (url) => {
        console.log(url)
        let id = generateRandomString(8)
        let data = await reseach_url(url)
        data.id = data.type[0] + data.name + id
        setDoc(doc(db, "links", id), data)
        console.log("Document written with ID: " + data)
      })
    })
  }

  const reseach_url = async (url) => {
    const data = {
      name: "test_name",
      link_name: url,
      icon_logo: "test_icon",
      thumnail_logo: "test_thumnail",
      type: "test",
      date: new Date().toISOString(),
      id: generateRandomString(8),
    }

    console.log(data)

    const baseURL = new URL(`http://localhost:${PORT}/icon?url=${url}`)

    const response = await fetch(baseURL.toString())

    const titleURL = new URL(`http://localhost:${PORT}/title?url=${url}`)
    const responseTitle = await fetch(titleURL.toString())

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    if (!responseTitle.ok) {
      throw new Error(`HTTP Error: ${responseTitle.status}`)
    }

    let dataIcon = await response.json()
    const dataTitle = await responseTitle.json()

    if (dataIcon.favicon !== undefined) {
      if (dataIcon.favicon[0] === "/" || dataIcon.favicon[0] === ".") {
        data.icon_logo =
          url.split("/")[0] +
          "//" +
          url.split("/")[2] +
          "/" +
          dataIcon.favicon.slice(1)
      } else {
        data.icon_logo = dataIcon.favicon
      }
    }

    if (dataIcon.ogImage !== undefined) {
      data.thumnail_logo = dataIcon.ogImage
    }

    data.name = dataTitle.title

    if (url.includes("youtube") || url.includes("youtu.be")) {
      if (url.includes("playlist")) {
        data.type = "Playlist"
      } else {
        data.type = "Video"
      }
    } else {
      data.type = "Site"
    }

    return data
  }

  const ExistInData = (data, url) => {
    let exist = false
    data.forEach((item) => {
      if (item.link_name === url) {
        exist = true
      }
    })
    return exist
  }

  const reseach = async () => {
    if (formRef.current.link_name.value === "") {
      alert("Please enter a link")
      return
    }

    if (ExistInData(getOnSnappLinks, formRef.current.link_name.value)) {
      alert("This link already exist in the database")
      return
    }

    const baseURL = new URL(
      `http://localhost:${PORT}/icon?url=${formRef.current.link_name.value}`
    )
    const response = await fetch(baseURL.toString())

    const titleURL = new URL(
      `http://localhost:${PORT}/title?url=${formRef.current.link_name.value}`
    )
    const responseTitle = await fetch(titleURL.toString())

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    if (!responseTitle.ok) {
      throw new Error(`HTTP Error: ${responseTitle.status}`)
    }
    let data = { favicon: undefined, ogImage: undefined }
    data = await response.json()
    const dataTitle = await responseTitle.json()
    console.log(data)
    const urlName = formRef.current.link_name.value

    // Créez un nouvel élément img
    try {
      let imgElements = document.querySelector("form").querySelectorAll("img")
      imgElements.forEach((imgElement) => {
        imgElement.remove()
      })
    } catch (error) {
      console.log("No image to remove")
    }

    if (data.favicon !== undefined) {
      if (data.ogImage !== undefined) {
        if (data.favicon[0] === "/" || data.favicon[0] === ".") {
          formRef.current.icon_logo.value =
            urlName.split("/")[0] +
            "//" +
            urlName.split("/")[2] +
            "/" +
            data.favicon.slice(1)
        } else {
          formRef.current.icon_logo.value = data.favicon
        }
        formRef.current.thumnail_logo.value = data.ogImage

        // Sélectionnez l'élément form
        let formElement = document.querySelector("form")
        let imgElement = document.createElement("img")
        let imgElement2 = document.createElement("img")

        // Définissez l'attribut src de l'élément img
        imgElement.src = formRef.current.icon_logo.value
        imgElement2.src = formRef.current.thumnail_logo.value

        // Ajoutez l'élément img au DOM juste après l'élément form
        formElement.appendChild(imgElement)
        formElement.appendChild(imgElement2)
      } else {
        formRef.current.icon_logo.value = ""
        formRef.current.thumnail_logo.value = ""
      }
    } else {
      formRef.current.icon_logo.value = ""
      formRef.current.thumnail_logo.value = ""
    }

    formRef.current.name.value = dataTitle.title

    if (
      formRef.current.link_name.value.includes("youtube") ||
      formRef.current.link_name.value.includes("youtu.be")
    ) {
      if (formRef.current.link_name.value.includes("playlist")) {
        console.log('The URL contains "playlist".')
        formRef.current.type.value = "Playlist"
      } else {
        console.log('The URL contains "youtube".')
        formRef.current.type.value = "Video"
      }
    } else {
      console.log('The URL does not contain "youtube".')
      formRef.current.type.value = "Site"
    }
  }

  const cancelForm = () => {
    try {
      let imgElements = document.querySelector("form").querySelectorAll("img")
      imgElements.forEach((imgElement) => {
        imgElement.remove()
      })
    } catch (error) {
      console.log("No image to remove")
    }
    formRef.current.reset()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    let data = Object.fromEntries(formData)
    data = { ...data, date: new Date().toISOString() }
    data = {
      ...data,
      id: data.type[0] + data.name.toLowerCase() + generateRandomString(8),
    }
    if (data.link_name !== "") {
      setDoc(doc(db, "links", data.id), data)
      console.log("Document written with ID: ", data.id)
      cancelForm()
    } else {
      alert("This link already exist in the database")
      cancelForm()
    }
  }

  const importJson = () => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = ".json"
    fileInput.click()

    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = async (e) => {
        const text = e.target.result
        const data = JSON.parse(text)
        console.log(data)
        data.forEach(async (item) => {
          let id = generateRandomString(8)
          let slashNumber = item.name.split("/").length
          let point = item.name.split(".").length - 1
          let tempValue = item.name.toLowerCase()
          for (let i = 0; i < slashNumber; i++) {
            tempValue = tempValue.replace("/", "-")
          }
          for (let i = 0; i < point; i++) {
            tempValue = tempValue.replace(".", "-")
          }
          item.id = item.type[0] + tempValue + id
          setDoc(doc(db, "links", item.id), item)
          console.log("Document written with ID: " + item.id)
        })
      }
      reader.readAsText(file)
    })
  }

  return (
    <div>
      <form
        className="mx-12 mt-12 mb-6"
        id="form"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 ">New Link</h2>
            <p className="mt-1 text-sm leading-6 ">
              this form is to add a new link to the database
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 "
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="text-black block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="link_name"
                  className="block text-sm font-medium leading-6 "
                >
                  Link
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="link_name"
                    id="link_name"
                    className="text-black block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="icon_logo"
                  className="block text-sm font-medium leading-6 "
                >
                  Icon Logo
                </label>
                <div className="mt-2">
                  <input
                    id="icon_logo"
                    name="icon_logo"
                    type="text"
                    className="text-black block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="thumnail_logo"
                  className="block text-sm font-medium leading-6 "
                >
                  Thumnail Logo
                </label>
                <div className="mt-2">
                  <input
                    id="thumnail_logo"
                    name="thumnail_logo"
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
                    <option>Playlist</option>
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
      <div className="mx-12 flex items-center justify-end gap-x-6">
        <button
          className="rounded-md bg-purple-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={reseach}
        >
          Research icon
        </button>
        <button
          className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={importTxt}
        >
          Import Txt
        </button>
        <button
          className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={importJson}
        >
          Import Json
        </button>
      </div>
    </div>
  )
}

export default Links
