let people = [];
let themes = ["Jazz", "Superhjältar", "Antagonister", "Rustikt och robust", "50-tal", "60-tal", "70-tal", "80-tal", "90-tal"];

if (localStorage.getItem("people")) {
  people = JSON.parse(localStorage.getItem("people"));
}
if (localStorage.getItem("themes")) {
  themes = JSON.parse(localStorage.getItem("themes"));
}

function addItemToPeople() {
  let item = document.getElementById("people-input").value;
  if (!people.includes(item)) {
    people.push(item);
    localStorage.setItem("people", JSON.stringify(people));
    displayList(people, "people-container");
  } else {
    alert("Item already exists in list 1.");
  }
}

function addItemToThemes() {
  let item = document.getElementById("themes-input").value;
  if (!themes.includes(item) && !["Jazz", "Superhjältar", "Antagonister", "Rustikt och robust", "50-tal", "60-tal", "70-tal", "80-tal", "90-tal"].includes(item)) {
    themes.push(item);
    localStorage.setItem("themes", JSON.stringify(themes));
    displayList(themes, "themes-container");
  } else {
    alert("Item already exists in list 2 or cannot be added to the list.");
  }
}

function deleteItemFromPeople(index) {
  people.splice(index, 1);
  localStorage.setItem("people", JSON.stringify(people));
  displayList(people, "people-container");
}

function deleteItemFromThemes(index) {
  if (!["Jazz", "Superhjältar", "Antagonister", "Rustikt och robust", "50-tal", "60-tal", "70-tal", "80-tal", "90-tal"].includes(themes[index])) {
    themes.splice(index, 1);
    localStorage.setItem("themes", JSON.stringify(themes));
    displayList(themes, "themes-container");
  } else {
    alert("This item cannot be deleted from list 2.");
  }
}

function clearPeople() {
  people = [];
  localStorage.removeItem("people");
  displayList(people, "people-container");
}

function clearThemes() {
  themes = ["Jazz", "Superhjältar", "Antagonister", "Rustikt och robust", "50-tal", "60-tal", "70-tal", "80-tal", "90-tal"];
  localStorage.setItem("themes", JSON.stringify(themes));
  displayList(themes, "themes-container");
}


function displayList(list, containerId) {
  let container = document.getElementById(containerId);
  container.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    let item = document.createElement("div");
    item.innerHTML = list[i] + " ";
    if (!["Jazz", "Superhjältar", "Antagonister", "Rustikt och robust", "50-tal", "60-tal", "70-tal", "80-tal", "90-tal"].includes(list[i])) {
      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Ta bort";
      deleteButton.addEventListener("click", function() {
        if (containerId === "people-container") {
          deleteItemFromPeople(i);
        } else if (containerId === "themes-container") {
          deleteItemFromThemes(i);
        }
      });
      item.appendChild(deleteButton);
    }
    container.appendChild(item);
  }
}

displayList(people, "people-container"); 
displayList(themes, "themes-container");

document.getElementById("add-to-people").addEventListener("click", addItemToPeople);
document.getElementById("add-to-themes").addEventListener("click", addItemToThemes);

document.getElementById("clear-people").addEventListener("click", clearPeople);
document.getElementById("clear-themes").addEventListener("click", clearThemes);


let selected = [];
let previousResult = [];

let availablePeople = [...people];
let availableThemes = [...themes];

function shuffleAndSelect() {
  selected = [];

  for (let i = 0; i < 2; i++) {
    let randomIndex = Math.floor(Math.random() * availablePeople.length);
    let selectedItem = availablePeople[randomIndex];
    selected.push(selectedItem);
    availablePeople.splice(randomIndex, 1);
  }

  let randomIndex = Math.floor(Math.random() * availableThemes.length);
  let selectedItem = availableThemes[randomIndex];
  selected.push(selectedItem);
  availableThemes.splice(randomIndex, 1);

  if (JSON.stringify(previousResult) === JSON.stringify(selected)) {
    shuffleAndSelect();
  } else {
    displaySelected(selected.slice(0, 2), selected[2]);
    previousResult = [...selected];
  }

  if (availablePeople.length === 0) {
    availablePeople = [...people];
    availableThemes = [...themes];
  }
}

document.getElementById("shuffle-and-select").addEventListener("click", shuffleAndSelect);

let previousResults = [];
function displaySelected(selectedPeople, selectedThemes) {
  let container = document.getElementById("selected-items-container");
  container.innerHTML = "";
  let peopleContainer = document.createElement("div");
  peopleContainer.innerHTML = "Namn: " + selectedPeople.join(", ");
  container.appendChild(peopleContainer);
  let themesContainer = document.createElement("div");
  themesContainer.innerHTML = "Tema: " + selectedThemes;
  container.appendChild(themesContainer);
  previousResults.push(selectedPeople.concat(selectedThemes));
  displayPreviousResults();
}

function displayPreviousResults() {
  let container = document.getElementById("previous-results-container");
  container.innerHTML = "";
  previousResults.forEach(function (result, index) {
    let resultContainer = document.createElement("div");
    resultContainer.innerHTML = (index + 1) + ". " + result.join(", ");
    container.appendChild(resultContainer);
  });
}


