// Note Rendering Elements
let noteSelector = document.getElementById("noteSelect");
let noteBox = document.getElementById("noteBox");

// Database Elements
const datarequest = indexedDB.open("KeyNotes");
let database;
let listCache = [];

// Render Note Buttons
function createOption(noteContent, noteParent, noteId) {
  if (!noteParent) {
    console.error("No Parent Instance");
    return;
  }
  if (!noteContent) {
    console.error("No Content");
    return;
  }
  if (!noteId) {
    console.error("No Id");
    return;
  }
  let optionContainer = document.createElement("div");
  let newNoteOption = document.createElement("button");
  let deleteOption = document.createElement("button");

  optionContainer.className = "noteSelector";

  newNoteOption.textContent = String(noteContent);
  newNoteOption.className = "noteOption";
  newNoteOption.dataset.id = noteId;

  deleteOption.innerHTML =
    "<span class='material-symbols-outlined'> delete </span>";
  deleteOption.className = "noteDelete";
  deleteOption.dataset.id = noteId;

  noteParent.appendChild(optionContainer);
  optionContainer.appendChild(newNoteOption);
  optionContainer.appendChild(deleteOption);
}

// Render Options
function loadButtons(store) {
  listCache = store;

  noteSelector.innerHTML = "";

  if (listCache.length < 1) {
    let warnMessage = document.createElement("span");
    warnMessage.style.color = "var(--urgent)";
    warnMessage.textContent = "You Have No Notes, Study To Make Some!";
    warnMessage.style.fontWeight = "700";
    warnMessage.style.padding = "var(--spacing)";
    noteBox.value = null;
    noteSelector.appendChild(warnMessage);
    return;
  }

  listCache.forEach((element) => {
    createOption(element.name, noteSelector, element.id);
  });
}

// Event Delegation
noteSelector.addEventListener("click", (e) => {
  const textOption = e.target.closest(".noteOption");
  if (textOption) {
    const matchingObject = listCache.find(
      (e) => String(e.id) === textOption.dataset.id,
    );
    noteBox.value = matchingObject.notes;
  }

  const deleteOption = e.target.closest(".noteDelete");
  if (deleteOption) {
    const removeId = Number(deleteOption.dataset.id);

    const transaction = database.transaction(["notesList"], "readwrite");
    const store = transaction.objectStore("notesList");
    const list = store.getAll();

    const removeRequest = store.delete(removeId);

    removeRequest.onsuccess = () => {
      loadButtons(list.result);
    };
  }
});

// IndexedDB
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
    loadButtons(list.result);
  };
};
