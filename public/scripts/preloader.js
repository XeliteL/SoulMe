;(function () {
  function hide() {
    var el = document.getElementById("preloader")
    if (!el) return
    el.classList.add("preloader--hidden")
    setTimeout(function () {
      el.remove()
    }, 400)
  }
  if (document.readyState === "complete") {
    hide()
  } else {
    window.addEventListener("load", hide)
  }
})()
