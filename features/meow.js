if (getCookie('ST Features').includes('meow')) {
if (document.querySelector('#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul > li:nth-child(4)') !== null) {
          var elements = document.querySelector('#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul > li:nth-child(4)').cloneNode(true)
          var elementsappended = document.querySelector('#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul').parentNode.appendChild(elements)
          elementsappended.firstChild.textContent = 'ScratchTools Settings'
          elementsappended.firstChild.href = 'https://genrandom.com/cats/'
        }
    
        if (document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)') !== null) {
          var elements = document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)').cloneNode(true)
          var elementsappended = document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)').parentNode.appendChild(elements)
          elementsappended.firstChild.firstChild.textContent = 'Cat'
          elementsappended.firstChild.href = 'https://genrandom.com/cats/'
        }
}
