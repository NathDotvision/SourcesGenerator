/**
 * Adds an event listener to the "clickme" element and performs various actions when clicked.
 */
document.getElementById("clickme").addEventListener("click", function () {
  console.log("Hello, world!")
  //chrome.tabs.create({ url: "https://www.google.com" })
  chrome.tabs.query(
    { active: true, currentWindow: true },
    async function (tabs) {
      var currentTabUrl = tabs[0].url
      console.log(currentTabUrl)
      const data = await reseach_url(currentTabUrl)
      notifyMe(data.name)
      console.log(data)

      document.getElementById("name").value = data.name
      document.getElementById("url").value = data.link_name
      document.getElementById("logo").value = data.icon_logo
      document.getElementById("thumbnail").value = data.thumnail_logo
      document.getElementById("type").value = data.type

      document.getElementById("logo_image").src = data.icon_logo
      document.getElementById("thumbnail_image").src = data.thumnail_logo
    }
  )
})

/**
 * Notifies the user with a desktop notification.
 * @param {string} message - The notification message.
 */
function notifyMe(message) {
  if (!("Notification" in window)) {
    alert("Ce navigateur ne supporte pas les notifications desktop")
  } else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message)
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message)
      }
    })
  }
}

/**
 * Retrieves data from a given URL.
 * @param {string} url - The URL to retrieve data from.
 * @returns {Promise<Object>} - The retrieved data.
 */
const reseach_url = async (url) => {
  const data = {
    name: "test_name",
    link_name: url,
    icon_logo: "test_icon",
    thumnail_logo: "test_thumnail",
    type: "test",
    date: new Date().toISOString(),
  }

  const PORT = 5001

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

/**
 * Adds an event listener to the "cancel" element and calls the cancel function when clicked.
 */
document.getElementById("cancel").addEventListener("click", function () {
  cancel()
})

/**
 * Adds an event listener to the "msj" element and updates the image sources when clicked.
 */
document.getElementById("msj").addEventListener("click", function () {
  document.getElementById("logo_image").src =
    document.getElementById("logo").value
  document.getElementById("thumbnail_image").src =
    document.getElementById("thumbnail").value
})

/**
 * Resets the values and image sources of the form.
 */
function cancel() {
  document.getElementById("name").value = ""
  document.getElementById("url").value = ""
  document.getElementById("logo").value = ""
  document.getElementById("type").value = ""
  document.getElementById("thumbnail").value = ""
  document.getElementById("logo_image").src = ""
  document.getElementById("thumbnail_image").src = ""
}
