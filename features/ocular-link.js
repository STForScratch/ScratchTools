if (window.location.href.startsWith("https://scratch.mit.edu/discuss/")) {
  document.querySelectorAll(".blockpost").forEach(function (post) {
    if (!post.querySelector(".scratchtools-open-in-ocular")) {
      var a = document.createElement("a");
      a.textContent = "Open in Ocular";
      a.style.display = "block";
      a.href = `https://ocular.jeffalo.net/users/${post
        .querySelector(".username")
        .textContent.replaceAll("*", "")}/`;
      a.className = "scratchtools-open-in-ocular black";
      a.style.fontWeight = "bold";
      post.querySelector(".postleft > dl").appendChild(a);
    }
  });
}
