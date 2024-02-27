import { getOnSnappLinks } from "../../pages/firebase"
import { Data } from "../../components"
import { jsPDF } from "jspdf"

/**
 * Retrieves an image from a given URL.
 * @param {string} imageData - The URL of the image to retrieve.
 * @returns {Promise<string>} - The retrieved image data.
 */
const getImage = async (imageData) => {
    const titleURL = new URL(
        `http://localhost:${Data.PORT}/image?url=${imageData}`
    )
    const responseImage = await fetch(titleURL.toString())

    if (!responseImage.ok) {
        return ""
    }

    const dataImage = await responseImage.json()
    return dataImage.image
}

/**
   * Processes items and adds them to the document.
   * @param {Object} doc - The document object.
   * @param {Array} items - The array of items to process.
   * @param {number} x - The x-coordinate for positioning the items.
   * @param {number} y - The y-coordinate for positioning the items.
   * @returns {number} - The updated y-coordinate after processing the items.
   */
const processItems = async (doc, items, x, y) => {
    for (const item of items) {
        if (y + 5 > doc.internal.pageSize.getHeight() - 20) {
            doc.addPage()
            y = 20 // Réinitialisez la position y pour la nouvelle page
        }

        let imageData = item.icon_logo
        if (imageData !== undefined) {
            const image = await getImage(imageData)
            doc.addImage(image, "JPEG", 10, y, 32 / 2, 32 / 2)
        }

        let fontSize = 12
        doc.setFontSize(fontSize)
        if (item.name.length * fontSize / 5 > doc.internal.pageSize.getWidth() - x) {
            item.name = item.name.substring(0, 75) + "..."
        }
        doc.textWithLink(item.name, x, y, { url: item.link_name })

        y += 5
        imageData = item.thumnail_logo
        if (imageData !== undefined) {
            const image = await getImage(imageData)
            let factor = 50
            let Image = [1920 / factor, 1080 / factor]
            doc.addImage(image, "JPEG", x + Image[0] * 3, y, Image[0], Image[1])
            y += Image[1] + 5
        } else {
            y += 5
        }
    }

    return y
}

/**
   * Export data to PDF.
   * @async
   * @function ExportToPDF
   */
const ExportToPDF = async () => {
    let dataSources = []
    let dataVideos = []
    getOnSnappLinks.forEach((doc) => {
        if (doc.type === "Site") {
            dataSources.push(doc)
        } else {
            dataVideos.push(doc)
        }
    })

    const doc = new jsPDF()
    let x = 10
    let y = 20
    doc.setFontSize(22)
    doc.text("My Sources", (x += 10), (y += 10))

    doc.setFontSize(16)
    y += 10
    doc.text("Sites", (x += 10), (y += 10))
    y += 10

    y = await processItems(doc, dataSources, x, y)

    // Vérifiez si le contenu suivant dépassera la limite de la page
    if (y > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage()
        y = 20 // Réinitialisez la position y pour la nouvelle page
    }

    doc.setFontSize(16)
    doc.text("Video", x, (y += 10))
    y += 10

    y = await processItems(doc, dataVideos, x, y)

    // Vérifiez à nouveau pour le débordement de page
    if (y > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage()
        y = 20
    }

    doc.save("data.pdf")
}

export default ExportToPDF