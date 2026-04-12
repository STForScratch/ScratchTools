export default async function ({ feature, console }) {
	const ALLOW_INTERACTIVITY = false
	const pictureInPictureLabel = feature.msg("picture-in-picture")
	const actionButtonsSelector = ".preview .inner .flex-row.action-buttons"
	const accountMenuSelector = ".menu-bar_account-info-group_MeJZP"

	await new Promise((resolve) => {
		ScratchTools.waitForElement(actionButtonsSelector).then(resolve)
		ScratchTools.waitForElement(accountMenuSelector).then(resolve)
	})

	const canvas = feature.traps.vm.renderer.canvas;

	ScratchTools.waitForElements(actionButtonsSelector, function (row) {
		if (row.querySelector(".ste-picture-in-picture")) return;
		const projectButton = document.createElement("button");
		projectButton.className = "button action-button ste-picture-in-picture";
		projectButton.textContent = pictureInPictureLabel;
		row.insertAdjacentElement("afterbegin", projectButton);
		projectButton.addEventListener('click', () => {
			popup()
		})
	})
	ScratchTools.waitForElements(accountMenuSelector, function (row) {
		if (row.querySelector(".ste-picture-in-picture")) return;
		const menuButton = document.createElement("div");
		menuButton.className = "menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB";
		const label = document.createElement("div");
		label.textContent = pictureInPictureLabel;
		menuButton.append(label);
		row.insertAdjacentElement("afterbegin", menuButton);
		menuButton.addEventListener('click', () => {
			popup()
		})
	})

	let popup;

	// Code for allowing interactivity (not yet ready)
	if (ALLOW_INTERACTIVITY) {
		if (!("documentPictureInPicture" in window)) console.error("Picture in Picture not supported")

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
		["mousedown", "mouseup", "mousemove", "wheel", "touchstart", "touchend", "touchmove"].forEach((eventName) => {
			video.addEventListener(eventName, translateEvent_pointer)
		})

		function translateEvent_key(old_event) {
			let new_event = new KeyboardEvent(old_event.type, old_event)
			document.dispatchEvent(new_event);
		}

		let buttonClickedTimes = 0
		popup = async function () {
			if (pipWindow && !pipWindow.closed) {
				pipWindow.close()
				return
			}

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

			["keydown", "keypress", "keyup"].forEach((eventName) => {
				pipWindow.document.addEventListener(eventName, translateEvent_key)
			})
		}
	}
	else {
		let video = document.createElement("video");
		// video.setAttribute("controls", "controls");
		video.setAttribute("autoplay", "autoplay");
		video.setAttribute("style", "width: 100%; height: 100%");
		// document.querySelector(".preview .inner").append(video);

		video.srcObject = canvas.captureStream()

		popup = async function () {
			try {
				const activePictureInPictureElement = document.pictureInPictureElement

				if (activePictureInPictureElement === video) {
					await document.exitPictureInPicture()
					return
				}

				if (activePictureInPictureElement) {
					await document.exitPictureInPicture()
				}

				await video.requestPictureInPicture()
			}
			catch {
				console.log("Picture in Picture not supported or failed to request")
			}
		}
	}
}
