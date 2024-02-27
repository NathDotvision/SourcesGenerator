import { getOnSnappLinks } from "../../pages/firebase"
import { saveAs } from "file-saver"

/**
* ExportToMD function generates a Markdown file containing the data from dataSources and dataVideos arrays.
* The Markdown file includes a list of sites and videos with their respective names, links, and thumbnail logos.
* The generated Markdown file is then saved as "data.md".
*/
const ExportToMD = () => {
    let dataSources = []
    let dataVideos = []
    getOnSnappLinks.forEach((doc) => {
        if (doc.type === "Site") {
            dataSources.push(doc)
        } else {
            dataVideos.push(doc)
        }
    })

    let md = "# My Sources\n\n"
    md += "## Sites\n\n"
    dataSources.forEach((source) => {
        md += `### [${source.name}](${source.link_name})\n\n`
        md += `![${source.name}](${source.thumnail_logo})\n\n`
    })

    md += "## Videos\n\n"
    dataVideos.forEach((source) => {
        md += `### [${source.name}](${source.link_name})\n\n`
        md += `![${source.name}](${source.thumnail_logo})\n\n`
    })

    // Créez un Blob avec les données
    const blob = new Blob([md], { type: "text/markdown" })

    // Utilisez saveAs pour enregistrer le fichier
    saveAs(blob, "data.md")
}

export default ExportToMD