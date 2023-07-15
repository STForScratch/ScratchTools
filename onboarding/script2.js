function gEBI(id){
    return document.getElementById(id);
}
const section = {
    1: gEBI("section_1"),
    2: gEBI("section_2"),
    3: gEBI("section_3"),
    4: gEBI("section_4")
}

async function start(){

    section[1].classList.add("hidden");
    section[2].classList.remove("hidden");

    
    
}

document.querySelector("button[data-function=start]").onclick = start;