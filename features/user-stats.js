async function getStats()
{
  if (window.location.href.includes("https://scratch.mit.edu/users/")) {
  var response = await fetch(`https://scratchdb.lefty.one/v3/user/info/${window.location.href.replaceAll("https://scratch.mit.edu/users/","")}`)
  var data = await response.json()
  if(data.statistics != undefined){
    function image(url,alt){return(`<img src='${url}' width='25' height='25' title='${alt}' style='vertical-align:middle; margin:10px'></img>`)};
    function space(){return("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")};
    function commafy(num){
      if(num == undefined){return("0")}else
      {return(parseInt(num).toLocaleString())}};
    if(replaceIt == true)
    {
      var mode = "stats"
      var activity = document.getElementById("activity-feed")
      activity.style.display = "none" //remove();
      var box = document.getElementsByClassName("doing")[0];
      var table = `${"<div style='margin:10px'>#" + commafy(data.statistics.ranks.followers) + " (#" + commafy(data.statistics.ranks.country.followers) + ")"+space()+"</div>"}${image('https://scratch.mit.edu/svgs/messages/follow.svg','Followers')}${commafy(data.statistics.followers)}${space()}<br>${image('https://scratch.mit.edu/svgs/messages/love.svg','Loves')}${commafy(data.statistics.loves)}${space()}<br>${image('https://scratch.mit.edu/svgs/messages/favorite.svg','Favorites')}${commafy(data.statistics.favorites)}${space()}<br>${image('https://scratch.mit.edu/svgs/project/views-gray.svg','Views')}${commafy(data.statistics.views)}${space()}<br>`;
      var scratchstats = `<a href="https://scratchstats.com/${window.location.href.replaceAll("https://scratch.mit.edu/users/","")}" style="font-size:10px">View on Scratchstats</a>`
      var boxStyle = "background-color: var(--darkWww-box, white);border-radius: 8px;border: 1px solid var(--darkWww-border-15, #d9d9d9);padding:5px;cursor:pointer"
      function click(type){
        if(type){return('document.getElementById("statistics").style.display = "block"; document.getElementById("activity-feed").style.display = "none";document.getElementById("ST-WIBD").style.fontSize="80%";')}
        else{return('document.getElementById("statistics").style.display = "none"; document.getElementById("activity-feed").style.display = "block";document.getElementById("ST-STATS").style.fontSize="80%";')}
      }
      var children = box.childNodes; children[1].innerHTML = `<span id='ST-STATS' onclick='${click(true)}this.style.fontSize="100%"' style='${boxStyle}'>Statistics</span> <span id='ST-WIBD' onclick='${click(false)}this.style.fontSize = "100%"' style='${boxStyle};font-size:80%'>Recent Activiy</span>`;
      var divText = `<div id='statistics' style='text-align:center; font-size:20px; padding:10px; background-color: var(--darkWww-box, white);border-radius: 8px;border: 1px solid var(--darkWww-border-15, #d9d9d9);'>${table}${scratchstats}</div>`.replaceAll("undefined","0")
      var div = document.createElement("div");
      div.innerHTML = divText;
      box.appendChild(div);
      var statistics = document.getElementById("statistics")
    }
    };
  }
}

var replaceIt = true //Just for testing. 
ScratchTools.waitForElements("#activity-feed", getStats, "getUserStatistics", false)

