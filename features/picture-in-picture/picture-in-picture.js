export default async function ({ feature, console }) {
	await new Promise(async (resolve, reject) => {
		(async () => {
			const rem = await ScratchTools.waitForElement(".preview .inner .flex-row.action-buttons")
			resolve(rem);
		})();
		(async () => {
			const rem = await ScratchTools.waitForElement(".menu-bar_account-info-group_MeJZP")
			resolve(rem);
		})();
	})

	const canvas = feature.traps.vm.renderer.canvas;
	let openPopup = document.createElement("button");

	ScratchTools.waitForElements(".preview .inner .flex-row.action-buttons", async function (row) {
		if (row.querySelector(".ste-picture-in-picture")) return;
		openPopup = document.createElement("button");
		openPopup.className = "button action-button ste-picture-in-picture";
		openPopup.textContent = "Picture in Picture";
		row.insertAdjacentElement("afterbegin", openPopup);
		openPopup.addEventListener('click', () => {
			popup()
		})
	})
	ScratchTools.waitForElements(".menu-bar_account-info-group_MeJZP", async function (row) {
		if (row.querySelector(".ste-picture-in-picture")) return;
		openPopup = document.createElement("div");
		openPopup.className = "menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB";
		let rem = document.createElement("div");
		rem.textContent = "Picture in Picture";
		openPopup.append(rem);
		row.insertAdjacentElement("afterbegin", openPopup);
		openPopup.addEventListener('click', () => {
			popup()
		})
	})

	let popup;

	if (feature.settings.get("interactivity-PiP")) {
		if (!"documentPictureInPicture" in window) console.error("Picture in Picture not supported")

		let pipWindow

		let docPopup = document.createElement("div");
		docPopup.insertAdjacentHTML("afterbegin", await (await fetch(feature.self.getResource("popup-html"))).text())
		docPopup = docPopup.querySelector("div.popup-GUI")

		let video = docPopup.querySelector("video");

		const greenFlag = document.querySelector(".green-flag_green-flag_1kiAo")
		docPopup.querySelector(".popup-greenflag").addEventListener("click", () => {
			greenFlag.click()
		});
		const redFlag = document.querySelector(".stop-all_stop-all_1Y8P9")
		docPopup.querySelector(".popup-redflag").addEventListener("click", () => {
			redFlag.click()
		});

		// video.addEventListener("mousedown", (old_event) => {
		function translateEvent_pointer(old_event) {
			// Calculate the canvas position relative to the viewport
			const a_rect = canvas.getBoundingClientRect();
			const b_rect = video.getBoundingClientRect();

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
			canvas.dispatchEvent(new_event);
		}
		video.addEventListener("mousedown", translateEvent_pointer)
		video.addEventListener("mouseup", translateEvent_pointer)
		video.addEventListener("mousemove", translateEvent_pointer)
		video.addEventListener("wheel", translateEvent_pointer)
		video.addEventListener("touchstart", translateEvent_pointer)
		video.addEventListener("touchend", translateEvent_pointer)
		video.addEventListener("touchmove", translateEvent_pointer)

		function translateEvent_key(old_event) {
			let new_event = new KeyboardEvent(old_event.type, old_event)
			document.dispatchEvent(new_event);
		}

		let buttonClickedTimes = 0
		popup = async function () {
			if (buttonClickedTimes === 0) {
				video.srcObject = canvas.captureStream()
				buttonClickedTimes++
			}
			// Open a Picture-in-Picture window.
			pipWindow = await window.documentPictureInPicture.requestWindow({
				width: canvas.width,
				height: canvas.height + 20 + 6 * 2,
			});

			// Move the player to the Picture-in-Picture window.
			pipWindow.document.body.append(docPopup);

			pipWindow.document.addEventListener("keydown", translateEvent_key)
			pipWindow.document.addEventListener("keypress", translateEvent_key)
			pipWindow.document.addEventListener("keyup", translateEvent_key)
		}
	}
	else {
		let video = document.createElement("video");
		// video.setAttribute("controls", "controls");
		video.setAttribute("autoplay", "autoplay");
		video.setAttribute("style", "width: 100%; height: 100%");
		// document.querySelector(".preview .inner").append(video);

		video.srcObject = canvas.captureStream()

		popup = function () {
			try {
				video.requestPictureInPicture()
			}
			catch {
				console.log("Picture in Picture not supported or failed to request")
			}
		}
	}
}
