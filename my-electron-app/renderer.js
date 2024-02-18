document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", async () => {
    const isDarkMode = await window.darkMode.toggle()
    const image = document.getElementById("myImage")
    image.src = isDarkMode ? "../assets/svg/night.svg" : "../assets/svg/sun.svg"
  })

document
  .getElementById("reset-to-system")
  .addEventListener("click", async () => {
    await window.darkMode.system()
    const image = document.getElementById("myImage")
    image.src = "../assets/svg/night.svg"
      ? "../assets/svg/night.svg"
      : "../assets/svg/sun.svg"
  })

document
  .getElementById("execute-command")
  .addEventListener("click", async () => {
    alert("Executing python file...")
  })
