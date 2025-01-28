export default async function ({ feature, console }) {
    ScratchTools.waitForElements(
        ".preview .inner .flex-row.action-buttons",
        async function (row) {
            if (row.querySelector(".ste-pip")) return;
            let button = document.createElement("button");
            button.className = "button action-button ste-pip";
            button.textContent = "PiP";
            row.appendChild(button);
            feature.self.hideOnDisable(button);
            
            let pipButton = button

            pipButton.addEventListener("click", async () => {
                let fake_canvas = createFakeCanvas()
                let doc = await createPipDoc(fake_canvas)
                let pipWindow = await togglePictureInPicture(doc)
                await addTranslatedEvents(fake_canvas, pipWindow, doc)
            })
        }
    )

    function createFakeCanvas() {
        const fake_canvas = document.createElement("video");
        fake_canvas.width = feature.traps.vm.renderer.canvas.width;
        fake_canvas.height = feature.traps.vm.renderer.canvas.height;
        fake_canvas.srcObject = feature.traps.vm.renderer.canvas.captureStream()
        fake_canvas.play()
        return fake_canvas;
    }

    async function createPipDoc(fake_canvas) {
        // Main doc
        let doc = document.createElement("div"); doc.classList.add("popup-GUI")

        // Video container
        let video_container = document.createElement("div"); video_container.classList.add("video-container")
        doc.appendChild(video_container)
        // Video
        video_container.appendChild(fake_canvas)

        // CSS
        let pip_css = await (await fetch(feature.self.getResource("pip-css"))).text()
        let pip_css_elm = document.createElement("style")
        pip_css_elm.textContent = pip_css
        doc.appendChild(pip_css_elm)

        return doc
    }

    async function togglePictureInPicture(doc) {
        // Early return if there's already a Picture-in-Picture window open
        if (window.documentPictureInPicture.window) {
            return;
        }

        // Open a Picture-in-Picture window.
        const pipWindow = await window.documentPictureInPicture.requestWindow({
            width: feature.traps.vm.renderer.canvas.width / 2,
            height: feature.traps.vm.renderer.canvas.height / 2,
        });

        // ...

        // Move the player to the Picture-in-Picture window.
        pipWindow.document.body.append(doc);
        return pipWindow
    }

    function addTranslatedEvents(fake_canvas, pipWindow, doc) {
        {
            function translateEvent_pointer(old_event) {
                // Calculate the canvas position relative to the viewport
                let a_rect = feature.traps.vm.renderer.canvas.getBoundingClientRect();
                let b_rect = fake_canvas.getBoundingClientRect();

                // console.log(old_event)
                // Create a new event with the adjusted coordinates

                let new_event = new old_event.constructor(old_event.type, {
                    bubbles: old_event.bubbles,
                    cancelable: old_event.cancelable,
                    clientX: (old_event.clientX - b_rect.left) * (a_rect.width / b_rect.width) + a_rect.left,
                    clientY: (old_event.clientY - b_rect.top) * (a_rect.height / b_rect.height) + a_rect.top,
                    // Copy over other necessary properties from the old event
                    screenX: (old_event.screenX - pipWindow.screenLeft + window.screenLeft - b_rect.left) * (a_rect.width / b_rect.width) + a_rect.left,
                    screenY: (old_event.screenY - pipWindow.screenTop + window.screenTop - b_rect.top) * (a_rect.height / b_rect.height) + a_rect.top,
                    layerX: old_event.layerX,
                    layerY: old_event.layerY,
                    button: old_event.button,
                    buttons: old_event.buttons,
                    relatedTarget: old_event.relatedTarget,
                    altKey: old_event.altKey,
                    ctrlKey: old_event.ctrlKey,
                    shiftKey: old_event.shiftKey,
                    metaKey: old_event.metaKey,
                    movementX: old_event.movementX,
                    movementY: old_event.movementY,
                });
                // Dispatch the new event
                feature.traps.vm.renderer.canvas.dispatchEvent(new_event);
            }
            fake_canvas.addEventListener("mousedown", translateEvent_pointer)
            fake_canvas.addEventListener("mouseup", translateEvent_pointer)
            fake_canvas.addEventListener("mousemove", translateEvent_pointer)
            fake_canvas.addEventListener("wheel", translateEvent_pointer)
            fake_canvas.addEventListener("touchstart", translateEvent_pointer)
            fake_canvas.addEventListener("touchend", translateEvent_pointer)
            fake_canvas.addEventListener("touchmove", translateEvent_pointer)

            function translateEvent_key(old_event) {
                let new_event = new KeyboardEvent(old_event.type, old_event)
                document.dispatchEvent(new_event);
            }
            fake_canvas.addEventListener("keydown", translateEvent_key)
            fake_canvas.addEventListener("keypress", translateEvent_key)
            fake_canvas.addEventListener("keyup", translateEvent_key)
        }
    }

}