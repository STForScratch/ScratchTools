export default async function ({ feature, console }) {
	const canvas = feature.traps.vm.renderer.canvas;

	let video = document.createElement("video");
	// video.setAttribute("controls", "controls");
	video.setAttribute("autoplay", "autoplay");
	video.setAttribute("style", "width: 100%; height: 100%");
	// document.querySelector(".preview .inner").append(video);

	video.srcObject = canvas.captureStream(30)

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

	let openPopup = document.createElement("button");

	ScratchTools.waitForElements(".preview .inner .flex-row.action-buttons", async function (row) {
		if (row.querySelector(".ste-video-recorder-open")) return;
		openPopup = document.createElement("button");
		openPopup.className = "button action-button ste-video-recorder-open";
		openPopup.textContent = "Picture in Picture";
		row.insertAdjacentElement("afterbegin", openPopup);
		openPopup.addEventListener('click', () => {
			popup()
		})
	})
	ScratchTools.waitForElements(".menu-bar_account-info-group_MeJZP", async function (row) {
		if (row.querySelector(".ste-video-recorder-open")) return;
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

	function popup() {
		try {
			video.requestPictureInPicture()
		}
		catch {
			console.log("Picture in Picture not supported or failed to request")
		}
	}
}
