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

	let openPopup = document.createElement("button");
	
	ScratchTools.waitForElements(".preview .inner .flex-row.action-buttons", async function (row) {
		if (row.querySelector(".ste-video-recorder-open")) return;
		openPopup = document.createElement("button");
		openPopup.className = "button action-button ste-video-recorder-open";
		openPopup.textContent = "Record Video";
		row.insertAdjacentElement("afterbegin", openPopup);
		openPopup.addEventListener('click', () => {
			document.body.append(popup)
		})	
	})
	ScratchTools.waitForElements(".menu-bar_account-info-group_MeJZP", async function (row) {
		if (row.querySelector(".ste-video-recorder-open")) return;
		openPopup = document.createElement("div");
		openPopup.className = "menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB";
		let rem = document.createElement("div");
		rem.textContent = "Record Video";
		openPopup.append(rem);
		row.insertAdjacentElement("afterbegin", openPopup);
		openPopup.addEventListener('click', () => {
			document.body.append(popup)
		})	
	})

	let popup = document.createElement("div");
	popup.insertAdjacentHTML("afterbegin", await (await fetch(feature.self.getResource("popup-html"))).text())
	popup = popup.querySelector("div.ReactModalPortal")

	let stopButton = popup.querySelector(".stopButton");
	let startButton = popup.querySelector(".startButton");
	let closeButton = popup.querySelector(".close-button_close-button_lOp2G");
	let downloadButton = popup.querySelector(".downloadButton");
	let lastDownloadFunction = () => { }
	let mimeType = popup.querySelector("select");


	closeButton.addEventListener('click', () => {
		document.querySelector(".STE-ReactModalPortal").remove()
	})
	addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			document.querySelector(".STE-ReactModalPortal").remove()
		}
	})

	const canvas = feature.traps.vm.renderer.canvas;
	const preview = popup.querySelector("video")
	const projectTitle = document.querySelector("input.inplace-input") || document.querySelector("input.project-title-input_title-field_en5Gd")
	// document.querySelector(".menu-bar_account-info-group_MeJZP").append(preview)

	let mediaRecorder;
	let recordedChunks = [];
	// console.log(startButton)
	// Start recording
	startButton.addEventListener('click', () => {
		startButton.classList.add("STE-hide-button");
		stopButton.classList.remove("STE-hide-button");

		// Capture the canvas element as a stream
		const stream = canvas.captureStream(30); // 30 FPS
		mediaRecorder = new MediaRecorder(stream);

		mediaRecorder.ondataavailable = function (event) {
			if (event.data.size > 0) {
				recordedChunks.push(event.data);
			}
		};

		mediaRecorder.onstop = function () {
			const blob = new Blob(recordedChunks, {
				type: `video/${mimeType.value}`
			});
			preview.src = URL.createObjectURL(blob);
			preview.controls = true;
			preview.download = `${projectTitle.value}.${mimeType.value}`
			downloadButton.removeEventListener("click", lastDownloadFunction)
			lastDownloadFunction = async () => {
				const url = URL.createObjectURL(blob)
				const a = document.createElement('a')
				a.href = url
				a.download = `${projectTitle.value}.${mimeType.value}`
				document.body.appendChild(a)
				a.click()
				document.body.removeChild(a)
				URL.revokeObjectURL(url)
			}
			downloadButton.addEventListener("click", lastDownloadFunction)
			recordedChunks = [];
		};

		mediaRecorder.start();
		startButton.disabled = true;
		stopButton.disabled = false;
	});

	// Stop recording
	stopButton.addEventListener('click', () => {
		mediaRecorder.stop();
		startButton.disabled = false;
		stopButton.disabled = true;

		stopButton.classList.add("STE-hide-button");
		startButton.classList.remove("STE-hide-button");
	});
}
