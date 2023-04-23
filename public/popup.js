const firstViewBtn = document.getElementById("firstViewBtn");
const secondViewBtn = document.getElementById("secondViewBtn");

const dragSection = document.getElementsByClassName("drag-section")[0];
const listSection = document.getElementsByClassName("list-section")[0];

firstViewBtn.addEventListener("click", function () {
  secondViewBtn.classList.remove("section-btn--active");
  this.classList.add("section-btn--active");
  dragSection.classList.remove("section-tab--hide");
  listSection.classList.add("section-tab--hide");
});

secondViewBtn.addEventListener("click", function () {
  firstViewBtn.classList.remove("section-btn--active");
  this.classList.add("section-btn--active");
  dragSection.classList.add("section-tab--hide");
  listSection.classList.remove("section-tab--hide");
});

new Sortable(dragSection, {
  handle: ".drag-btn",
  animation: 200,
  chosenClass: "section-tab__element--active",
});

const addingFrom = document.getElementsByClassName("adding-form")[0];
const addingInput = document.getElementsByClassName("adding-input")[0];
const textStore = document.getElementsByClassName("text-store")[0];

addingFrom.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputValue = addingInput.value;

  if (inputValue.trim() !== "") {
    const listItem = document.createElement("li");
    listItem.classList.add("text-store__element");

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const clearBtn = document.createElement("button");

    clearBtn.addEventListener("click", () => {
      console.log("test");
    });

    listItem.appendChild(label);
    listItem.appendChild(clearBtn);
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(inputValue));

    textStore.appendChild(listItem);
    addingInput.value = "";
  }
});
