ScratchTools.waitForElements(
  "a[href^='/users/']",
  async function (element) {
    element.addEventListener("mouseover", async function () {
      document
        .querySelectorAll(".scratchtoolsHoverUserCard")
        .forEach(function (el) {
          el.remove();
        });
      var div = document.createElement("div");
      div.style.display = "none";
      div.className = "scratchtoolsHoverUserCard";
      document.body.appendChild(div);
      element.onmouseout = function () {
        div.remove();
      };
      var response = await fetch(
        element.href.replace("https://", "https://api.")
      );
      var data = await response.json();
      if (
        element.innerText
          .replaceAll("@", "")
          .replaceAll("https://scratch.mit.edu/users/")
          .replaceAll("/")
          .toLowerCase() === data.username.toLowerCase()
      ) {
        var followersResponse = await fetch(
          "https://scratch.mit.edu/users/" + data.username + "/followers/"
        );
        var followersData = (await followersResponse.text())
          .toLowerCase()
          .replaceAll("<!doctype html>", "");
        var div2 = document.createElement("div");
        div2.innerHTML = followersData;
        var followers = div2
          .querySelector(".box-head > h2")
          .textContent.split("(")[1]
          .split(")")[0];
        if (div) {
          div.style.display = "block";
          var bodyRect = document.body.getBoundingClientRect();
          var elemRect = element.getBoundingClientRect();
          div.style.top =
            "calc(" + (elemRect.top - bodyRect.top).toString() + "px - 6rem)";
          div.style.left = (elemRect.left - bodyRect.left).toString() + "px";
          div.style.position = "absolute";
          var img = document.createElement("img");
          img.src = data.profile.images["90x90"];
          img.style.height = "3rem";
          img.style.width = "3rem";
          div.style.backgroundColor = "white";
          img.style.borderRadius = "2rem";
          div.style.borderRadius = ".25rem";
          img.style.marginTop = "0rem";
          div.style.padding = ".5rem";
          div.appendChild(img);
          var bold = document.createElement("b");
          bold.style.marginLeft = "1rem";
          bold.style.position = "relative";
          bold.style.top = "-1.8rem";
          bold.textContent = data.username;
          div.appendChild(bold);
          var span = document.createElement("span");
          span.style.left = "4rem";
          span.style.position = "relative";
          span.style.top = "-1.8rem";
          span.style.display = "block";
          span.textContent = followers + " followers";
          div.appendChild(span);
          div.style.border = "2px solid #4d97ff";
          div.style.paddingBottom = "-6rem";
          div.style.paddingRight = "1.5rem";
          div.style.paddingTop = "1rem";
          div.style.minWidth = "10rem";
          div.style.height = "4rem";
        }
      }
    });
  },
  "user-hover-cards",
  false
);
