let list_name1 = [
    "Featured Projects",
    "Featured Studios",
    "What the Community is Remixing",
    "What the Community is Loving",
    "Projects Loved by Scratchers I'm Following",
    "Scratch Design Studio - A Stroll through the Woods",
]
// let list_name1 = [
//     addon.tab.scratchMessage("splash.featuredProjects"),
//     addon.tab.scratchMessage("splash.featuredStudios"),
//     addon.tab.scratchMessage("splash.communityRemixing"),
//     addon.tab.scratchMessage("splash.communityLoving"),
//     addon.tab.scratchMessage("splash.projectsLovedByScratchersFollowing"),
//     addon.tab.scratchMessage("splash.scratchDesignStudioTitle"),
// ]
let list_name2 = [
    " STE-featuredProject",
    " STE-featuredStudios",
    " STE-communityRemixing",
    " STE-communityLoving",
    " STE-a-projectsLovedByScratchersFollowing",
    " STE-scratchDesignStudioTitle",
]
let rem_elements = [
]
ScratchTools.waitForElements(".box .box-header h4", (e) => {
    let rem = e
    rem_elements.push(rem.parentNode.parentNode)
    // let rem = document.createElement("h4")
    if (list_name1.includes(rem.innerText)) {
        // console.log(list_name2[list_name1.indexOf(rem.innerText)])
        rem.parentNode.parentNode.classList += list_name2[list_name1.indexOf(rem.innerText)];
    }
})
