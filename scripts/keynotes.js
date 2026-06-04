let noteOptions = document.getElementById("savednotes");
let addOption = document.getElementById("add");
let noteNameInput = document.getElementById("notename");
let save = document.getElementById("save");
let keyNote = document.getElementById("keynotes");

window.addEventListener("load", () => {
    let savedContent = localStorage.getItem("lastNote");
    

    keyNote.value = savedContent;
})

window.addEventListener("beforeunload", () => {
    localStorage.setItem("lastNote", keyNote.value);
})

const datarequest = indexedDB.open("KeyNotes");
let database;

datarequest.onupgradeneeded = (event) => {
    database = event.target.result;

    database.createObjectStore("notesList", {
        keyPath: "id"
    });
}

datarequest.onsuccess = (event) => {
    database = event.target.result;
}

datarequest.onerror = (event) => {
    console.warn(event);
}

save.addEventListener("click", (clicks) => {
    const transaction = database.transaction(["notesList"], "readwrite");
    const store = transaction.objectStore("notesList");
    store.add()
});