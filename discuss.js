function replacealllinks() {
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
replacealllinks()
