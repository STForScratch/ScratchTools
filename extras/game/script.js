// finally got it to work :\

const run = async () => {

    let { game: storage } = await chrome.storage.sync.get("game");
    var starterStorage = {"version":1, "clicks":0}

    // check if storage is trust worthy
    if (storage) {
        console.log(storage)
    }else{
        await chrome.storage.sync.set({"game":JSON.stringify(starterStorage)});
    }
}

run();