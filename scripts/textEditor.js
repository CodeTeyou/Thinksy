// Continue Writing

const addButton = document.getElementById("addSection");
const documentWriter = document.getElementById("documentWriter");

// Create Section
function createSection(parentElement) {
  if (!parentElement) {
    console.error("Missing Value");
    return;
  }
  let sectionCount = document.getElementsByClassName("documentSection");

  const newSection = document.createElement("section");
  const sectionHead = document.createElement("b");
  const sectionContent = document.createElement("ul");

  newSection.className = "documentSection";
  newSection.id = `section-${sectionCount.length + 1}`;

  sectionHead.textContent = "New Section";
  sectionHead.contentEditable = true;

  parentElement.appendChild(newSection);
  newSection.appendChild(sectionHead);
  newSection.appendChild(sectionContent);

  const firstItem = document.createElement("li");
  firstItem.textContent = "";
  firstItem.contentEditable = true;

  sectionContent.appendChild(firstItem);
}

addButton.addEventListener("click", () => {
  createSection(documentWriter);
});
