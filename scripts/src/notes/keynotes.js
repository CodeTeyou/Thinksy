const noteOptions = document.getElementById("savednotes");
const noteNameInput = document.getElementById("notename");
const saveButton = document.getElementById("save");
const keyNote = document.getElementById("keynotes");

let database = null;
let currentItem = null;

// Crash Recovery

window.addEventListener("load", () => {
  const savedContent = localStorage.getItem("lastNote");
  const savedName = localStorage.getItem("lastName");
  const savedItem = localStorage.getItem("currentItem")

  if (savedContent === null || savedName === null) return;

  keyNote.value = savedContent;
  noteNameInput.value = savedName;
  if (savedItem) {
    currentItem = savedItem;
  }
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("lastNote", keyNote.value);
  localStorage.setItem("lastName", noteNameInput.value);
  localStorage.setItem("currentItem", currentItem)
});

// IndexedDB

const request = indexedDB.open("KeyNotes", 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  if (!db.objectStoreNames.contains("notesList")) {
    db.createObjectStore("notesList", {
      keyPath: "id",
      autoIncrement: true,
    });
  }
};

request.onsuccess = (event) => {
  database = event.target.result;
  loadNotesList();
};

request.onerror = (event) => {
  console.error("IndexedDB Error:", event.target.error);
};

function loadNotesList() {
  noteOptions.innerHTML = "";

  const transaction = database.transaction("notesList", "readonly");
  const store = transaction.objectStore("notesList");

  const getAllRequest = store.getAll();

  getAllRequest.onsuccess = () => {
    getAllRequest.result.forEach((note) => {
      const option = new Option(note.name, note.name);
      option.dataset.id = note.id;
      noteOptions.appendChild(option);
    });
  };
}

function updateOption(id, name) {
  const option = [...noteOptions.children].find(
    (child) => Number(child.dataset.id) === Number(id),
  );

  if (!option) return;

  option.value = name;
  option.text = name;
}

function addOption(id, name) {
  const option = new Option(name, name);
  option.dataset.id = id;
  noteOptions.appendChild(option);
}

noteNameInput.addEventListener("change", () => {
  if (!database) return;

  const enteredName = noteNameInput.value.trim();

  const option = [...noteOptions.children].find(
    (child) => child.value === enteredName,
  );

  if (!option) {
    currentItem = null;
    return;
  }

  const transaction = database.transaction("notesList", "readonly");
  const store = transaction.objectStore("notesList");

  const getRequest = store.get(Number(option.dataset.id));

  getRequest.onsuccess = () => {
    const note = getRequest.result;

    if (!note) return;

    currentItem = note.id;
    keyNote.value = note.notes;
  };
});

saveButton.addEventListener("click", () => {
  if (!database) return;

  const name = noteNameInput.value.trim();
  const content = keyNote.value;

  if (!name) {
    console.warn("Note name is required.");
    return;
  }

  const transaction = database.transaction("notesList", "readwrite");
  const store = transaction.objectStore("notesList");

  // UPDATE EXISTING NOTE
  if (currentItem !== null) {
    const getRequest = store.get(Number(currentItem));

    getRequest.onsuccess = () => {
      const note = getRequest.result;

      if (!note) {
        currentItem = null;
        return;
      }

      note.name = name;
      note.notes = content;

      const updateRequest = store.put(note);

      updateRequest.onsuccess = () => {
        updateOption(note.id, name);

        localStorage.removeItem("lastNote");
        localStorage.removeItem("lastName");
      };
    };

    return;
  }

  // CREATE NEW NOTE
  const addRequest = store.add({
    name,
    notes: content,
  });

  addRequest.onsuccess = () => {
    currentItem = addRequest.result;

    addOption(currentItem, name);

    localStorage.removeItem("lastNote");
    localStorage.removeItem("lastName");
  };
});

// Button Press
const openButton = document.getElementById("openToggle");
const buttonImage = openButton.querySelector("img");
const noteBox = document.getElementById("noteBox");

openButton.addEventListener("click", (event) => {
  let openToggle = openButton.dataset.toggled;
  openToggle = JSON.parse(openToggle);

  if (openToggle) {
    // Close

    buttonImage.style.rotate = "180deg";
    noteBox.style.transform = "translate(110%, 0)";
    openButton.style.transform = "translate(30vw, 0)";

    openToggle = false;
  } else {
    // Open

    buttonImage.style.rotate = "";
    noteBox.style.transform = "";
    openButton.style.transform = "";

    openToggle = true;
  }

  openButton.dataset.toggled = openToggle;
});