var style = document.createElement('style')
style.innerHTML = `
    .box {
transition: box-shadow .1s;
}
  .box:hover {
    box-shadow: 0 0 5px #999999;
  }
`
document.body.appendChild(style)
