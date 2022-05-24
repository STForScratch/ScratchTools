getapi2(`https://api.${window.location.href.replaceAll('https://', '')}messages/count`)
async function getapi2(url) {
      // Storing response
      const response = await fetch(url);
      
      // Storing data in form of JSON
      var data = await response.json();
      console.log(data);
      var stuff = data["count"]
      document.querySelector(".location").textContent = `${document.querySelector('.location').textContent} | ${stuff} Messages`;
  }
