// Variables
const getElement = (elementId) => {
  return document.getElementById(String(elementId));
};

const documentWriter = getElement("documentWriter");
const editorSettings = getElement("editorSettings");

// Constructor
function makeElement(elementType, editable, placeHolder, classes) {
  const newElement = document.createElement(elementType);
  newElement.contentEditable = editable;
  newElement.className = classes;
  try {
    newElement.innerText = placeHolder;
  } catch (err) {
    console.error(err);
  }
  return newElement;
}

// Page creator

let pageList = [];

class Page {
  element;
  head = makeElement("h1", true, "New Page", "pageHeader");
  content = makeElement("div", true, null, "pageContent");
  foot = makeElement("footer", true, "Footer", "pageFooter");

  constructor(pageId, parentElement) {
    const newPage = document.createElement("section");
    newPage.id = pageId;
    newPage.className = "documentPage";
    parentElement.appendChild(newPage);

    this.head.className = "pageHeader";

    this.content;

    this.foot.className = "pageFooter";

    newPage.appendChild(this.head);
    newPage.appendChild(this.content);
    newPage.appendChild(this.foot);

    this.element = newPage;
    pageList.push(this);
  }

  stands() {
    const tempCheck = this.element ? this.element : null;
    return tempCheck;
  }
}

// Previous Page Render

// Initial Page
const firstPage = new Page(
  `page-${String(pageList.length + 1)}`,
  documentWriter,
);

// Function List
const editorActions = {
  addSection() {},
  addTitle() {},
  addPage() {
    const newPageMade = new Page(`page-${String(pageList.length + 1)}`, documentWriter);
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
