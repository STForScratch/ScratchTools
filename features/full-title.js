  // add full title to profile projects
  
  replacealllinks2()
  function replacealllinks2() {
  const highlightedItems2 = document.querySelectorAll("a");
  
  highlightedItems2.forEach(function(item) {
    if (item.href.includes('https://scratch.mit.edu/projects/')) {
  if (item.parentNode.className === 'title') {
      console.log('hi')
  replacelinks2(item)
  }
    }
  })
                           }
      async function replacelinks2(item) {
      
      // Storing response
      const response = await fetch(`https://api.${item.href.replace('https://', '')}`);
      
      // Storing data in form of JSON
      var data = await response.json();
      console.log(data);
  if(data.hasOwnProperty('title')){
      var stuff = data["title"]
  item.title = `${stuff} by @${data['author']['username']}`
  }
      }
