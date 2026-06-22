// Variables
const getElement = (elementId) => {
  return document.getElementById(String(elementId));
};

const documentWriter = getElement("documentWriter");
const editorSettings = getElement("editorSettings");

// Page creator

let pageList = [];

class Page {
  element;

  constructor(pageId, parentElement) {
    const newPage = document.createElement("section");
    newPage.id = pageId;
    newPage.className = "documentPage";
    parentElement.appendChild(newPage);

    this.element = newPage;
    pageList.push(newPage);
  }

  stands() {
    const tempCheck = this.element ? this.element : null;
    return tempCheck;
  }
}

// Constructor
function makeElement(elementType, editable, placeHolder) {
  const newElement = document.createElement(elementType);
  newElement.contentEditable = editable;
  try {
    newElement.innerText = placeHolder;
  } catch (err) {
    console.error(err);
  }
  return newElement;
}

// Previous Page Render

// Initial Page
const firstPage = new Page(
  `$page-${String(pageList.length + 1)}`,
  documentWriter,
);

// !! Make a page sizing system

// Function List
const editorActions = {
  addSection() {
    console.log("Add Section: ");
  },
  addTitle() {
    console.log("Add Title: ");

  },
  addHeader() {
    console.log("Add Footer: ");
  },
  boldText() {
    document.execCommand("bold");
  },
  underlineText() {
    document.execCommand("underline");
  },
  italicText() {
    document.execCommand("italic");
  },
};

// Button Registration

editorSettings.addEventListener("click", (clickEvent) => {
  const clickId = clickEvent.target.id;
  if (typeof editorActions[clickId] === "function") {
    editorActions[clickId]();
  }
});
