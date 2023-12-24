const run = async () => {
    try {
        let { game: storage } = await chrome.storage.sync.get("game");
        var starterStorage = { "version": 1, "clicks": 0 };

        // check if storage is trustworthy
        if (storage && typeof storage === 'object' && typeof storage.clicks === 'number') {
            document.querySelector('.text-layer h1').textContent = String(storage.clicks);
            console.log(storage.clicks);
            document.getElementById("click").draggable = false;
            document.getElementById("click").addEventListener("click", async () => {
                storage.clicks += 1;
                document.querySelector('.text-layer h1').textContent = String(storage.clicks);
                await chrome.storage.sync.set({ "game": storage });
            });
        } else {
            await chrome.storage.sync.set({ "game": starterStorage });
            location.reload();
        }
    } catch (error) {
        console.error("Error during storage retrieval:", error);
    }
}

const reset = async () => {
    try {
        await chrome.storage.sync.remove("game");
        location.reload();
    } catch (error) {
        console.error("Error during storage removal:", error);
    }
}
// JavaScript
var clickElement = document.getElementById('click');

clickElement.addEventListener('click', function() {
    // Remove the pop class and force a reflow to allow the animation to be restarted mid-animation
    this.classList.remove('pop');
    void this.offsetWidth;
    this.classList.add('pop');
});

run();
