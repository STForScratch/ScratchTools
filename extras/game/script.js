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

clickElement.addEventListener('mousedown', function() {
    this.classList.add('scale-down');
});

clickElement.addEventListener('mouseup', function() {
    this.classList.remove('scale-down');
});
clickElement.addEventListener('mouseleave', function() {
    this.classList.remove('scale-down');
});

run();
