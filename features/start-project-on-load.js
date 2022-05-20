function startProjectOnLoad() {
  if (window.location.href.includes('https://scratch.mit.edu/projects/')) {
    if (document.querySelector('div.stage_green-flag-overlay_gNXnv') === undefined) {
      window.setTimeout(startProjectOnLoad, 50)
    } else {
      document.querySelector('div.stage_green-flag-overlay_gNXnv').click()
    }
  }
}

if (getCookie('ST Features').includes('start-project-on-load')) {
  startProjectOnLoad()
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
