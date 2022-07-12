if (window.location.href.includes('https://scratch.mit.edu/users/')) {
replacealllinks()
const targetNode = document.querySelector('ul.comments');

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationList, observer) {
    // Use traditional 'for loops' for IE 11
    for(const mutation of mutationList) {
        if (mutation.type === 'childList') {
            replacealllinks()
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);


  function replacealllinks() {
  const highlightedItems = document.querySelector('ul.comments').querySelectorAll("a");
  
  highlightedItems.forEach(function(item) {
      if (item.href.includes('https://scratch.mit.edu/projects/')) {
  if (!item.className.includes('scratchtools')) {
      item.className = item.className+' scratchtools'
  replacelinks(item)
  }
      }
  });
  
  async function replacelinks(item) {
      
      // Storing response
      const response = await fetch(`https://api.${item.href.replace('https://', '')}`);
      
      // Storing data in form of JSON
      var data = await response.json();
      console.log(data);
  if(data.hasOwnProperty('title')){
      var stuff = data["title"]
  item.textContent = stuff
  }
      }

    }

  }
