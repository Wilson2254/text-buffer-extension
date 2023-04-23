const firstViewBtn = document.getElementById("firstViewBtn");
const secondViewBtn = document.getElementById("secondViewBtn");
const dragSection = document.getElementsByClassName("drag-section")[0];
const listSection = document.getElementsByClassName("list-section")[0];
const addingFrom = document.getElementsByClassName("adding-form")[0];
const addingInput = document.getElementsByClassName("adding-input")[0];
const textStore = document.getElementsByClassName("text-store")[0];

let allText = JSON.parse(localStorage.getItem("bufferStore")) || [];

new Sortable(dragSection, {
  handle: ".drag-btn",
  animation: 200,
  chosenClass: "section-tab__element--active",
  onEnd: function (evt) {
    [allText[evt.oldIndex], allText[evt.newIndex]] = [
      allText[evt.newIndex],
      allText[evt.oldIndex],
    ];
    localStorage.setItem("bufferStore", JSON.stringify(allText));
  },
});

// 'Chosen text' button
firstViewBtn.addEventListener("click", function () {
  secondViewBtn.classList.remove("section-btn--active");
  this.classList.add("section-btn--active");
  dragSection.classList.remove("section-tab--hide");
  listSection.classList.add("section-tab--hide");
  fillActiveSection();
});

// 'All text' button
secondViewBtn.addEventListener("click", function () {
  firstViewBtn.classList.remove("section-btn--active");
  this.classList.add("section-btn--active");
  dragSection.classList.add("section-tab--hide");
  listSection.classList.remove("section-tab--hide");
  fillStoreSection();
});

// Add new Text
addingFrom.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputValue = addingInput.value;

  if (inputValue.trim() !== "" && allText.length <= 10) {
    allText.push({
      text: addingInput.value,
      isActive: false,
    });
    localStorage.setItem("bufferStore", JSON.stringify(allText));
    fillStoreSection();
    addingInput.value = "";
  }
});

// Chosen text list
function fillActiveSection() {
  allText = JSON.parse(localStorage.getItem("bufferStore")) || [];
  dragSection.innerHTML = "";

  allText.forEach(({ text, isActive }) => {
    if (isActive) {
      const activeSectionItem = document.createElement("li");
      activeSectionItem.classList.add("section-tab__element");
      activeSectionItem.innerHTML = `<span class="drag-text">${text}</span>
            <img class="drag-btn" src="./assets/drag-lines.svg" alt="Drag and drop button">`;
      dragSection.appendChild(activeSectionItem);
    }
  });
}

// All text list
function fillStoreSection() {
  allText = JSON.parse(localStorage.getItem("bufferStore")) || [];
  textStore.innerHTML = "";

  allText.forEach(({ text, isActive }, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("text-store__element");

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isActive;

    const clearBtn = document.createElement("button");

    listItem.appendChild(label);
    listItem.appendChild(clearBtn);
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(text));
    textStore.appendChild(listItem);

    clearBtn.addEventListener("click", function () {
      allText.splice(index, 1);
      localStorage.setItem("bufferStore", JSON.stringify(allText));
      fillStoreSection();
    });

    checkbox.addEventListener("change", function () {
      allText[index].isActive = this.checked;
      localStorage.setItem("bufferStore", JSON.stringify(allText));
      fillStoreSection();
    });
  });
}

window.addEventListener("load", () => {
  fillActiveSection();
});
