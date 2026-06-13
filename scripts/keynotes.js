let noteOptions = document.getElementById("savednotes");
let noteNameInput = document.getElementById("notename");
let save = document.getElementById("save");
let keyNote = document.getElementById("keynotes");

let currentItem = null;

// Crash Result

window.addEventListener("load", () => {
  let savedContent = localStorage.getItem("lastNote");
  let savedName = localStorage.getItem("lastName");

  if (!savedContent || !savedName) {
    return;
  }

  keyNote.value = savedContent;
  noteNameInput.value = savedName;
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("lastNote", keyNote.value);
  localStorage.setItem("lastName", noteNameInput.value);
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
    if (list.result.length > 0) {
      for (let i = 0; i < list.result.length; i++) {
        let option = new Option(list.result[i].name, list.result[i].name);
        option.dataset.id = list.result[i].id;
        noteOptions.appendChild(option);
      }
    }
  };
};

datarequest.onerror = (event) => {
  console.error(event.target.error);
};

// Saving

save.addEventListener("click", () => {
  if (!database) {
    console.error("Database is Null:", database);
    return;
  }

  const transaction = database.transaction(["notesList"], "readwrite");
  const store = transaction.objectStore("notesList");

  const getSaved = store.getAll();

  const nameInsert = noteNameInput.value;
  const noteInsert = keyNote.value;

  getSaved.onsuccess = () => {
    const previousId = getSaved.result.find(
      (saved) => saved.id === Number(currentItem),
    );

    if (nameInsert.trim() == "") {
      console.warn("EMPTY");
      return;
    }

    if (previousId) {
      previousId.notes = noteInsert;
      store.put(previousId);
    } else {
      const addRequest = store.add({
        name: nameInsert,
        notes: noteInsert,
      });
      addRequest.onsuccess = () => {
        const newOption = new Option(nameInsert, nameInsert);
        newOption.dataset.id = addRequest.result;
        noteOptions.appendChild(newOption);
      };
    }
  };
});

noteNameInput.addEventListener("input", () => {
  const name = noteNameInput.value;

  const transaction = database.transaction(["notesList"], "readonly");
  const store = transaction.objectStore("notesList");
  const request = store.getAll();

  request.onsuccess = () => {
    const match = [...noteOptions.children].find(
      (child) => child.value === noteNameInput.value.trim(),
    );
    if (!match) {
      currentItem = null;
      return;
    }
    const note = request.result.find(
      (item) => item.id === Number(match.dataset.id),
    );

    if (!note) return;
    keyNote.value = note.notes;
    currentItem = match.dataset.id;
  };
});
