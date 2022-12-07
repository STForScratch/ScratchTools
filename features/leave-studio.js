// This probably doesn't work yet, just sayin
var user;
var studioId = document.URL.replace("https://", "").split("/")[2];
const parentDiv = document.querySelector(".studio-info-section");

async function getUsers() {
    let url = 'https://scratchproxy.deta.dev/users/' + user + '/studios/curate';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

if (getUsers.includes(studioId)) {
    parentDiv.innerHTML += '<br>';
    var leaveStioBtn = document.createElement('button');
    leaveStioBtn.innerHTML += '<span>Leave Studio</span>'
    leaveStioBtn.classList.add("button");
    parentDiv.appendChild(leaveStioBtn);

}