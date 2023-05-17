async function msg(){
if (!document.querySelector(".location").className.includes(" scratchtools")) {
  getapi2(`https://api.scratch.mit.edu/users/${data["user"]["username"]}/messages/count/`);
  async function getapi2(url) {
    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    var stuff = data["count"];
    document.querySelector(".location").textContent = `${
      document.querySelector(".location").textContent
    } | ${stuff} Messages`;
    document.querySelector(".location").className =
      document.querySelector(".location").className + " scratchtools";
  }}
}
