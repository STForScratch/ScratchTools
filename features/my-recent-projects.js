titles();

function titles() {
  if (
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news"
    ) !== null
  ) {
    getprojects(
      document
        .querySelector(
          "#navigation > div > ul > li.link.right.account-nav > div > ul > li:nth-child(1) > a"
        )
        .href.split("/users/")[1]
        .split("/")[0]
    );
  } else {
    window.setTimeout(titles, 100);
  }
}

async function getprojects(item) {
  // Storing response
  const response5 = await fetch(
    `https://api.scratch.mit.edu/users/${item}/projects/`
  );

  document.querySelector(
    "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-header > p > a"
  ).href = `https://scratch.mit.edu/users/${item}/projects/`;

  // Storing data in form of JSON
  var data = await response5.json();
  console.log(data);
  if (data.hasOwnProperty(0)) {
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-header > h4"
    ).textContent = "Recent Projects";
    var titleofproject = data[0]["title"];
    var descriptionofproject = data[0]["instructions"];
    if (descriptionofproject === "") {
      var descriptionofproject = data[0]["credits"];
    }
    if (titleofproject.length > 30) {
      var titleofproject = `${titleofproject.slice(0, 30)}...`;
    }
    if (descriptionofproject.length > 120) {
      var descriptionofproject = `${descriptionofproject.slice(0, 120)}...`;
    }
    var linktoproject = `projects/${data[0]["id"]}/`;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(1) > a > div > h4"
    ).textContent = titleofproject;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(1) > a > div > p"
    ).textContent = descriptionofproject;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(1) > a"
    ).href = linktoproject;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(1) > a > img"
    ).src =
      "https://64.media.tumblr.com/9a68a4b4b0a7d129dfa331eaf0b1f6c7/4b73a84798c588fd-78/s540x810/2054110f1aaca473920ea40aea70a6f57159ab94.png";
  }

  if (data.hasOwnProperty(1)) {
    var titleofproject = data[1]["title"];
    var descriptionofproject = data[1]["instructions"];
    if (descriptionofproject === "") {
      var descriptionofproject = data[1]["credits"];
    }
    if (titleofproject.length > 30) {
      var titleofproject = `${titleofproject.slice(0, 30)}...`;
    }
    if (descriptionofproject.length > 120) {
      var descriptionofproject = `${descriptionofproject.slice(0, 120)}...`;
    }
    var linktoproject = `projects/${data[1]["id"]}/`;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(2) > a > div > h4"
    ).textContent = titleofproject;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(2) > a > div > p"
    ).textContent = descriptionofproject;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(2) > a"
    ).href = linktoproject;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(2) > a > img"
    ).src =
      "https://64.media.tumblr.com/9a68a4b4b0a7d129dfa331eaf0b1f6c7/4b73a84798c588fd-78/s540x810/2054110f1aaca473920ea40aea70a6f57159ab94.png";
  }

  if (data.hasOwnProperty(2)) {
    var titleofproject = data[2]["title"];
    var descriptionofproject = data[2]["instructions"];
    if (descriptionofproject === "") {
      var descriptionofproject = data[2]["credits"];
    }
    if (titleofproject.length > 30) {
      var titleofproject = `${titleofproject.slice(0, 30)}...`;
    }
    if (descriptionofproject.length > 120) {
      var descriptionofproject = `${descriptionofproject.slice(0, 120)}...`;
    }
    var linktoproject = `projects/${data[2]["id"]}/`;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(3) > a > div > h4"
    ).textContent = titleofproject;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(3) > a > div > p"
    ).textContent = descriptionofproject;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(3) > a"
    ).href = linktoproject;
    document.querySelector(
      "#view > div > div:nth-child(1) > div.splash-header > div.box.news > div.box-content > ul > li:nth-child(3) > a > img"
    ).src =
      "https://64.media.tumblr.com/9a68a4b4b0a7d129dfa331eaf0b1f6c7/4b73a84798c588fd-78/s540x810/2054110f1aaca473920ea40aea70a6f57159ab94.png";
  }
}
