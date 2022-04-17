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
        }
      }
    
      if (getCookie('ST Features').includes('settings-footer')) {
        if (document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)') !== null) {
          var elements = document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)').cloneNode(true)
          var elementsappended = document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)').parentNode.appendChild(elements)
          elementsappended.firstChild.firstChild.textContent = 'ScratchTools Settings'
          elementsappended.firstChild.href = 'https://scratch.mit.edu/ScratchTools/'
        }
      }

      function stufftodo() {
        if (document.querySelector('#navigation > div > ul > li.link.right.account-nav > div > ul > li:nth-child(3) > a > span') !== null || document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown.open > span') !== null) {
          if (document.querySelector('#footer > div > ul.clearfix.footer-col > li:nth-child(3) > ul > li:nth-child(4)') !== null) {
            document.querySelector('#topnav > div > div > ul.account-nav.logged-in > li.logged-in-user.dropdown.open > div > ul > li:nth-child(3) > a').textContent = 'Settings'
          }
                if (document.querySelector('#footer > div > div > dl:nth-child(3) > dd:nth-child(5)') !== null) {
            document.querySelector('#navigation > div > ul > li.link.right.account-nav > div > ul > li:nth-child(3) > a > span').textContent = 'Settings'
          }
        } else {
          window.setTimeout(stufftodo, 100)
        }
      }
      if (getCookie('ST Features').includes('accountsettings')) {
      stufftodo()
      }
if (getCookie('ST Features').includes('stsettingsaccount')) {
      if (window.location.href.includes('https://scratch.mit.edu/accounts/')) {
        var settings = document.querySelector('#content > div.cols > div.col-4 > div > div > ul > li:nth-child(3)').cloneNode(true)
settings.firstChild.textContent = 'ScratchTools Settings'
settings.firstChild.href = 'https://scratch.mit.edu/ScratchTools/'
document.querySelector('#content > div.cols > div.col-4 > div > div > ul').appendChild(settings)
settings.className = ''
      }
    }
