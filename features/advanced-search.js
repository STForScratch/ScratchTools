
if (window.location.href.includes("https://scratch.mit.edu/search/")) {
var user = document.querySelector('#frc-q-1088').value
checkfor(user)
async function checkfor(user) {
    const response = await fetch(`https://api.scratch.mit.edu/users/${user}/`);
    
    // Storing data in form of JSON
    var data = await response.json();
    if(data.hasOwnProperty('profile')){
    var logo = data['profile']['images']['90x90'];
var userbox = document.createElement('div')
userbox.className = 'scratchtoolsAdvancedSearch'
var useravatar = document.createElement('img')
var username = document.createElement('a')
username.textContent = `${user} is a user.`
username.href = `https://scratch.mit.edu/users/${user}/`
useravatar.src = logo
useravatar.style.height = '60px'
useravatar.style.borderRadius = '4px'
useravatar.style.padding = '10px'
useravatar.style.float = 'left'
username.style.float = 'right'
userbox.appendChild(useravatar)
username.style.padding = '30px'
userbox.appendChild(username)
userbox.style.backgroundColor = 'white'
userbox.style.margin = 'auto'
userbox.style.height = '80px'
userbox.style.width = '50vw'
userbox.style.borderRadius = '10px'
document.querySelector('#projectBox').prepend(userbox)
}
ScratchTools.setDisable('advanced-search', ()=> {
    document.querySelector('.scratchtoolsAdvancedSearch').remove()
})
    }
}
