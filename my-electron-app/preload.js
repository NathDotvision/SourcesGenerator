const { contextBridge, ipcRenderer } = require('electron')

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    /**
     * Replaces the text content of an element or a collection of elements with the specified text.
     * @param {string} selector - The selector of the element(s) to be replaced.
     * @param {string} text - The text to replace the element(s) content with.
     */
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
      let elements = document.getElementsByClassName(selector)
      for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = text
      }
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
    replaceText("title", 'Generator App')

    const isDarkMode = window.darkMode
    const image = document.getElementById('myImage');
    image.src = isDarkMode ? "../assets/svg/night.svg" : "../assets/svg/sun.svg"
  })

contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system')
})