document.getElementById("clickme").addEventListener("click", function () {
  console.log("Hello, world!")
  //chrome.tabs.create({ url: "https://www.google.com" })
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTabUrl = tabs[0].url
    console.log(currentTabUrl)
    alert("Vous vous trouver sur la page: " + currentTabUrl)
    var Notif = new Notification("Hello", {
      body: "Hello, world!",
      icon: "https://www.gstatic.com/mobilesdk/230906_mobilesdk/github-mark-white.svg",
    })
  })
})
