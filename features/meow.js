if (getCookie('ST Features').includes('meow')) {
var elements = document.querySelector('#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul > li:nth-child(4)').cloneNode(true)
          var elementsappended = document.querySelector('#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul').parentNode.appendChild(elements)
          elementsappended.firstChild.textContent = 'meow'
          elementsappended.firstChild.href = 'https://genrandom.com/cats/'
}
