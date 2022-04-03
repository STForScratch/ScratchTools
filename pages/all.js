// get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // get cookie

if (getCookie('ST Features').includes('settings-footer')) {
    if (document.querySelector('#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul > li:nth-child(4)') !== null) {
      var elements = document.querySelector('#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul > li:nth-child(4)').cloneNode(true)
      var elementsappended = document.querySelector('#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul').parentNode.appendChild(elements)
      elementsappended.firstChild.textContent = 'ScratchTools Settings'
      elementsappended.firstChild.href = 'https://scratch.mit.edu/ScratchTools/'
      document.querySelector('#topnav > div > div > a > span').style.backgroundImage = 'url(/static/assets/11b9f4fc432abfafecf0e25e1cfb1d87.svg)'
    }
  }

  if (getCookie('ST Features').includes('settings-footer')) {
    if (document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)') !== null) {
      var elements = document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)').cloneNode(true)
      var elementsappended = document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)').parentNode.appendChild(elements)
      elementsappended.firstChild.firstChild.textContent = 'ScratchTools Settings'
      elementsappended.firstChild.href = 'https://scratch.mit.edu/ScratchTools/'
      document.querySelector('a').style.backgroundImage = 'url(/static/assets/11b9f4fc432abfafecf0e25e1cfb1d87.svg)'
    }
  }
