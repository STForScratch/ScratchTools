setTimeout(function(){
   const images = document.getElementsByTagName("img"); for (var i = 0, l = images.length; i < l; i++) { images[i].srcset = "https://c.tenor.com/WHrgX-FXJjwAAAAM/rickroll.gif"; }; const typeWriter = new Audio("https://www.myinstants.com/media/sounds/rick-ogg_gwcjskk.mp3"); typeWriter.volume = 0.6; typeWriter.play(); setTimeout(() => {typeWriter.pause(); window.location.reload()}, 9000)
}, 60000);
