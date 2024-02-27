import { getOnSnappLinks } from "../../pages/firebase"
import { saveAs } from "file-saver"

/**
   * Export data to a text file.
   */
const ExportToTxt = () => {
    let data = []
    getOnSnappLinks.forEach((doc) => {
        data.push(doc)
    })

    // Convertissez les données en JSON
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

export default ExportToTxt