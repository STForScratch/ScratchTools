function roundProfile() {
    document.querySelectorAll('img').forEach(function(el) {
        if (el.src !== undefined) {
            if (el.src.includes('scratch.mit.edu/get_image/user/')) {
                el.style.borderRadius = '50%'
            }
        }
    })
    window.setTimeout(roundProfile, 80)
}

if (getCookie('ST Features').includes('round-profile-pictures')) {
  roundProfile()
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
