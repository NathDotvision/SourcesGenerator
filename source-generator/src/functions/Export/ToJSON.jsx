import { getOnSnappLinks } from "../../pages/firebase"
import { saveAs } from "file-saver"

/**
* Export the data to JSON format.
*/
const ExportToJSON = () => {
    let data = []
    getOnSnappLinks.forEach((doc) => {
        data.push(doc)
    })

    // Convertissez les données en JSON
    const json = JSON.stringify(data, null, 2)

    // Créez un Blob avec les données
    const blob = new Blob([json], { type: "application/json" })

    // Utilisez saveAs pour enregistrer le fichier
    saveAs(blob, "data.json")
}

export default ExportToJSON