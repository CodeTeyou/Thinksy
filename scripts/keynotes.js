// Rewrite Input Logic

let noteOptions = document.getElementById("savednotes");
let noteNameInput = document.getElementById("notename");
let save = document.getElementById("save");
let keyNote = document.getElementById("keynotes");

 let savedName;

// Crash Result

window.addEventListener("load", () => {
  let savedContent = localStorage.getItem("lastNote");
  savedName = localStorage.getItem("lastName");
  keyNote.value = savedContent;
  noteNameInput.value = savedName;
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("lastNote", keyNote.value);
  localStorage.setItem("lastName",noteNameInput.value);
});

// IndexedDB

const datarequest = indexedDB.open("KeyNotes");
let database;

datarequest.onupgradeneeded = (event) => {
  database = event.target.result;

  database.createObjectStore("notesList", {
    keyPath: "id",
    autoIncrement: true,
  });
};

datarequest.onsuccess = (event) => {
  database = event.target.result;

  const transaction = database.transaction(["notesList"], "readonly");
  const store = transaction.objectStore("notesList");
  const list = store.getAll();

  list.onsuccess = () => {
    if (list.result.length < 1) {
      noteOptions.style.display = "none";
      return;
    } else {
      for (let i = 0; i < list.result.length; i++) {
        let option = new Option(list.result[i].name, list.result[i].id)
        noteOptions.appendChild(option)
        if (list.result[i].name == savedName) {noteOptions.value = option.value;}
      }
    }
  }
};

datarequest.onerror = (event) => {
  console.error(event.target.error);
};

save.addEventListener("click", () => {
  const transaction = database.transaction(["notesList"], "readwrite");
  const store = transaction.objectStore("notesList");

  const getSaved = store.getAll();

  const nameInsert = noteNameInput.value;
  const noteInsert = keyNote.value;

  getSaved.onsuccess = () => {
    const previousId = getSaved.result.find((saved) => saved.name === nameInsert);

    if (nameInsert == "") {
        console.warn("EMPTY")
        return;}

    if (previousId) {
        previousId.notes = noteInsert;
        store.put(previousId);
    } else {
        const addRequest = store.add({
          name: nameInsert,
          notes: noteInsert
        });
        addRequest.onsuccess = () => {
        const newOption = new Option(nameInsert, addRequest.result);
        noteOptions.appendChild(newOption);
        noteOptions.value = newOption.value;
        noteOptions.style.display = "inline";
        }
    }

  };
});

noteOptions.onchange = () => {
  const transaction = database.transaction(["notesList"], "readonly");
  const store = transaction.objectStore("notesList");
  const newValue = Number(noteOptions.value);

  const getSaved = store.get(Number(newValue));

  getSaved.onsuccess = () => {
    const getNote = getSaved.result;
    noteNameInput.value = getNote.name;
    keyNote.value = getNote.notes;
  }
}