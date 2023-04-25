var themeColor = "white"

function theme(val){
  var dark = document.getElementById('dark')
  var light = document.getElementById('light')
  var img = document.getElementById('theme-image')
  if (val == "dark"){
    dark.classList.add('theme-select')
    dark.classList.remove('theme-noselect')
    img.src='themes/dark.svg'
    if (light.classList.contains('theme-select')){
      light.classList.remove('theme-select')
      light.classList.add('theme-noselect')
    }
  }
  if (val == "light"){
    light.classList.add('theme-select')
    light.classList.remove('theme-noselect')
    img.src='themes/light.svg'
    if (dark.classList.contains('theme-select')){
      dark.classList.remove('theme-select')
      dark.classList.add('theme-noselect')
    }
  }
}