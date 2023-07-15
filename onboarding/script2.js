function gEBI(id){
    return document.getElementById(id);
}
const section = {
    1: gEBI("section_1"),
    2: gEBI("section_2"),
    3: gEBI("section_3"),
    4: gEBI("sectio_4")
}

async function start(){

    section[1].classList.add("hidden");
    section[2].classList.remove("hidden");

    features = document.querySelector("div[data-function=features]")

    var featuredFeatures = await (await fetch("./featured.json")).json();
  featuredFeatures.forEach(async function (ftr) {
    features.appendChild(await createFeature(ftr));
  });
}

document.querySelector("button[data-function=start]").onclick = start;