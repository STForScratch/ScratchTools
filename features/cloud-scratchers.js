if (window.location.href.startsWith("https://scratch.mit.edu/projects/")) {
  var style = document.createElement("style");
  style.textContent = `
    .box .box-content {
        display: block;
        clear: both;
        background-color: #fff;
        padding: 8px 20px;
    }
    
    .box .box-header {
        display: block;
        clear: both;
        margin: 0;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #d9d9d9;
        border-radius: 10px 10px 0 0;
        background-color: #f2f2f2;
        padding: 8px 20px;
        height: 20px;
        overflow: hidden;
    }
    
    .splash .box {
        margin-bottom: 20px;
        margin-top: 20px;
    }
    @media only screen and (min-width: 768px) and (max-width: 941px) {
    .box {
        width: 38.75em;
    }
}
    .box {
        display: inline-block;
        border: 1px solid #d9d9d9;
        border-radius: 10px 10px 0 0;
        background-color: #fff;
        width: 100%;
    }
    
    .box .box-header h4, .box .box-header h5 {
        display: inline-block;
        float: left;
    }
    @media only screen and (min-width: 768px) and (max-width: 941px) {
    .box .box-header h4, .box .box-header h5 {
        line-height: 1.1rem;
        font-size: 1.1rem;
    }
}`;

  document.body.appendChild(style);
  var projectId = window.location.href
    .replace("https://scratch.mit.edu/projects/", "")
    .split("/")[0];
  async function getAllCloudUsers() {
    async function getAll() {
      var found = false;
      var offset = 0;
      while (!found) {
        var response = await fetch(
          "https://clouddata.scratch.mit.edu/logs?projectid=" +
            projectId +
            "&limit=100&offset=" +
            offset.toString()
        );
        var data = await response.json();
        offset = offset + 100;
        if (data.length > 0) {
          data.forEach(function (el) {
            if (!found) {
              if (el.timestamp + 10000 > Date.now()) {
                if (!currentlyOnline.includes(el.user)) {
                  currentlyOnline.push(el.user);
                }
              } else {
                found = true;
              }
            }
          });
        } else {
          found = true;
        }
      }
      if (document.querySelector(".scratchtoolsOnline") !== null) {
        document.querySelector(".scratchtoolsOnline").remove();
      }
      if (currentlyOnline.length !== 0) {
        var content = document.querySelector(".preview > .inner");
        var box = document.createElement("div");
        box.className = "box scratchtoolsOnline";
        var boxHeader = document.createElement("div");
        boxHeader.className = "box-head";
        var boxContent = document.createElement("div");
        boxContent.className = "box-content";
        box.appendChild(boxHeader);
        box.appendChild(boxContent);
        var h4 = document.createElement("h4");
        h4.textContent = "Online Scratchers";
        boxHeader.appendChild(h4);
        boxContent.style.padding = "1rem";
        currentlyOnline.forEach(function (el) {
          var a = document.createElement("a");
          a.href = `https://scratch.mit.edu/users/${el}/`;
          var span = document.createElement("span");
          span.textContent = el;
          a.appendChild(span);
          boxContent.appendChild(a);
          span.style.marginLeft = "0.5rem";
          span.style.display = "inline-block";
        });
        boxContent.style.padding = "8px 20px";
        boxHeader.style.padding = "8px 20px";
        boxHeader.style.display = "block";
        boxHeader.style.clear = "both";
        boxHeader.style.margin = "0";
        boxHeader.style.borderTop = "1px solid #fff";
        boxHeader.style.borderBottom = "1px solid #d9d9d9";
        boxHeader.style.borderRadius = "10px 10px 0 0";
        boxHeader.style.backgroundColor = "#f2f2f2";
        boxHeader.style.padding = "8px 20px";
        boxHeader.style.height = "20px";
        boxHeader.style.overflow = "hidden";
        boxContent.style.backgroundColor = "#fff";
        box.style.display = "inline-block";
        box.style.border = "1px solid #d9d9d9";
        box.style.borderRadius = "10px 10px 0 0";
        box.style.backgroundColor = "#fff";
        content.appendChild(box);
      }
    }
    var currentlyOnline = [];
    getAll();
  }
  getAllCloudUsers();
  setInterval(getAllCloudUsers, 10000);
}
