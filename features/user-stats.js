if (!document.querySelector(".location").className.includes(" scratchtools")) {
    var data = ""
    getapi2(
      `https://scratchdb.lefty.one/v3/user/info/${window.location.href.replaceAll(
        "https://scratch.mit.edu/users/",
        ""
      )}`
    );
    async function getapi2(url) {
      // Storing response
      const response = await fetch(url);
  
      // Storing data in form of JSON
      data = await response.json();
    
    if(data.statistics != undefined){
    function image(url){return(`<img src='${url}' width='25' height='25' style='vertical-align:middle; margin:10px'></img>`)};
    function space(){return("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")};
    function commafy(num){
      return(parseInt(num).toLocaleString())};
    document.getElementsByClassName("activity-stream")[0].remove();
    var box = document.getElementsByClassName("doing")[0];
    var table = `${"<div style='margin:10px'>#" + commafy(data.statistics.ranks.followers) + " (#" + commafy(data.statistics.ranks.country.followers) + ")"+space()+"</div>"}${image('https://scratch.mit.edu/svgs/messages/follow.svg')}${commafy(data.statistics.followers)}${space()}<br>${image('https://scratch.mit.edu/svgs/messages/love.svg')}${commafy(data.statistics.loves)}${space()}<br>${image('https://scratch.mit.edu/svgs/messages/favorite.svg')}${commafy(data.statistics.favorites)}${space()}<br>${image('https://scratch.mit.edu/svgs/project/views-gray.svg')}${commafy(data.statistics.views)}${space()}<br>`;
    var scratchstats = `<a href="https://scratchstats.com/${window.location.href.replaceAll("https://scratch.mit.edu/users/","")}" style="color:white;font-size:10px">View on Scratchstats</a>`
    box.innerHTML = `<h3>Statistics</h3><div id='statistics' style='text-align:center; font-size:20px; padding:10px; background-color: var(--darkWww-box, white);border-radius: 8px;border: 1px solid var(--darkWww-border-15, #d9d9d9);'>${table}${scratchstats}</div>`.replaceAll("undefined","0")
  	}};
  }

