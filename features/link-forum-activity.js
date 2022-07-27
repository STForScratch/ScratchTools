if (window.location.href.startsWith('https://scratch.mit.edu/discuss')) {
  document.querySelectorAll('span.byuser').forEach(function(el) {
      var user = el.textContent.replace('by ', '')
      el.textContent = 'by '
      var a = document.createElement('a')
      a.textContent = user
      a.href = `https://scratch.mit.edu/users/${user}/`
      el.appendChild(a)
  }) 
}
