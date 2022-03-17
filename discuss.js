// get cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
// get cookie
function replacealllinks() {
  if (getCookie('ST Features').includes('forum-asterisk')) {
const highlightedItems2 = document.querySelectorAll("a");

highlightedItems2.forEach(function(item) {
  if (item.href.includes('https://scratch.mit.edu/users/')) {
if (item.className === 'black username') {
    console.log('hi')
replacelinks(item)
}
  }
})
                         }
    async function replacelinks(item) {
    
    // Storing response
    const response = await fetch(`https://api.${item.href.replace('https://', '')}`);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
if(data.hasOwnProperty('scratchteam')){
    if (data['scratchteam'] === true) {
item.textContent = `${item.textContent}*`
}
    }
}
}
replacealllinks()
