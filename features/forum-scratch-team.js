document.querySelectorAll('a').forEach(async function(item) {
    if (item.className === 'black username') {
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
})
