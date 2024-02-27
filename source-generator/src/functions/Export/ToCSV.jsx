import { getOnSnappLinks } from "../../pages/firebase"
import { saveAs } from "file-saver"
import Papa from "papaparse"

/**
   * Export data to CSV format.
   */
const ExportToCSV = () => {
    let data = []
    getOnSnappLinks.forEach((doc) => {
        data.push(doc)
    })

    // Convertissez les données en CSV
    const csv = Papa.unparse(data)

    // Créez un Blob avec les données
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })

    // Utilisez saveAs pour enregistrer le fichier
    saveAs(blob, "data.csv")
}

export default ExportToCSV