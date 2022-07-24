var ScratchTools = {}
console.log("ScratchTools API Created")
if (window.location.href.startsWith('https://scratch.mit.edu/projects/') && window.location.href.includes('/editor')) {
  ScratchTools.type = 'Editor'
} else {
 ScratchTools.type = 'Website' 
}
