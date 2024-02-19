import React, { useRef } from "react"
import { NavBar } from "../components"
import { addDoc, links, getDocs, getDataLinks } from "./firebase"
import { saveAs } from "file-saver"
import {jsPDF} from 'jspdf'

export default function Links() {
  const formRef = useRef()

  const existInDatabase = async (url) => {
    const querySnapshot = await getDocs(links)
    querySnapshot.forEach((doc) => {
      console.log(doc.data().link_name, url)
      console.log(doc.data().link_name === url)
      if (doc.data().link_name === url) {
        return true
      }
    })
    return false
  }

  const reseach = async () => {
    alert("Reseach icon for" + formRef.current.link_name.value)
    if (formRef.current.link_name.value === "") {
      alert("Please enter a link")
      return
    }
    const baseURL = new URL(`http://localhost:5000/icon?url=${formRef.current.link_name.value}`)
    const response = await fetch(baseURL.toString());

    const titleURL = new URL(`http://localhost:5000/title?url=${formRef.current.link_name.value}`)
    const responseTitle = await fetch(titleURL.toString());

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
      return;
    }

    if (!responseTitle.ok) {
      throw new Error(`HTTP Error: ${responseTitle.status}`);
      return;
    }
  
    const data = await response.json();
    const dataTitle = await responseTitle.json();
    console.log(data)
    if (data.favicon != undefined || data.ogImage != undefined) {
      formRef.current.icon_logo.value = data.favicon
      formRef.current.thumnail_logo.value = data.ogImage

      // Sélectionnez l'élément form
      let formElement = document.querySelector('form');

      // Créez un nouvel élément img
      try {
        let imgElement = document.querySelector('form').querySelectorAll('img');
        imgElement.remove()
      } catch (error) {
        console.log("No image to remove")
      }
      let imgElement = document.createElement('img');
      let imgElement2 = document.createElement('img');

      // Définissez l'attribut src de l'élément img
      imgElement.src = data.favicon;
      imgElement2.src = data.ogImage;

      // Ajoutez l'élément img au DOM juste après l'élément form
      formElement.appendChild(imgElement);
      formElement.appendChild(imgElement2);
    }
    formRef.current.name.value = dataTitle.title
    
    

    if (formRef.current.link_name.value.includes('youtube')) {
      console.log('The URL contains "youtube".');
      formRef.current.type.value = "Video"
    } else {
      console.log('The URL does not contain "youtube".');
      formRef.current.type.value = "Site"
    }
  }

  const cancelForm = () => {
    try {
      let imgElements = document.querySelector('form').querySelectorAll('img');
      imgElements.forEach((imgElement) => { imgElement.remove(); });
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
    if (data.link_name !== "") {
      addDoc(links, data).then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
        cancelForm()
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

  const ExportToCSV =  () => {
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

  const ExportToPDF = async () => {
    let data = [];
    getDataLinks.forEach((doc) => {
      data.push(doc.data());
    });

    // Convert the data to JSON
    const json = JSON.stringify(data);

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.setFontSize(22);
    let y = 30;
    doc.text("My Title", 10, 20);

    // Add the JSON data to the PDF
    doc.setFontSize(16);

    data.forEach((item) => {
      // Convert the item to a string
      const itemString = JSON.stringify(item);
      
      for (let key in item) {
        // Affichez la clé et la valeur
        if (item[key].startsWith('http')) {
          doc.textWithLink(item[key], 10, y, { url: item[key] });
        }else {
          doc.text(item[key], 10, y);
        }
        y += 10;
      }
  
      // Move to the next line
      y += 10;
    });

    // Add an image to the PDF
    const imageData = "https://www.youtube.com/s/desktop/87423d78/img/favicon_32x32.png"
    const titleURL = new URL(`http://localhost:5000/image?url=${imageData}`)
    const responseImage = await fetch(titleURL.toString());

    if (!responseImage.ok) {
      throw new Error(`HTTP Error: ${responseImage.status}`);
      return;
    }
    const dataImage = await responseImage.json();
    doc.addImage(dataImage.image, 'JPEG', 10, 40, 180, 160);

    // Save the PDF
    doc.save("data.pdf");
  };


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
      <div className="mt-6 flex items-center justify-end gap-x-6">
      <button onClick={reseach}>Research icon</button>
        <button
          className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={ExportToTxt}
        >
          Export to TXT
        </button>
        <button 
        onClick={ExportToCSV}
        className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Export to CSV
        </button>
        <button 
        onClick={ExportToPDF}
        className="rounded-md bg-main_color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main_color_light hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
  )
}
