const taskList = document.getElementById("taskList");
const popup = document.querySelector(".popup");
const popupInput = document.getElementById("popup-input");
const popupSubmit = document.getElementById("popup-submit");
const deleteAll = document.querySelector(".delete-all");

document.getElementById("addTaskButton").addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText == "") {
    return 0;
  }

  //new list item
  const newTask = buildTask(taskText);

  //clear input field
  taskInput.value = "";
});

function buildTask(text) {
  const newTask = document.createElement("li");

  const leftDiv = document.createElement("div");
  leftDiv.classList.add("left-task");
  const rightDiv = document.createElement("div");
  rightDiv.classList.add("right-task");

  const editBtn = document.createElement("button");
  editBtn.textContent = "EDIT";
  editBtn.classList.add("edit-btn", "btn");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "DELETE";
  deleteBtn.classList.add("delete-btn", "btn");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const mainText = document.createElement("p");
  mainText.classList.add("task-name");
  mainText.textContent = text;

  newTask.append(leftDiv, rightDiv);
  leftDiv.append(checkbox, mainText);
  rightDiv.append(editBtn, deleteBtn);

  // //mark task as done
  checkbox.addEventListener("click", () => {
    mainText.style.textDecoration =
      mainText.style.textDecoration === "line-through"
        ? "none"
        : "line-through";
  });

  //delete task
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(newTask);
    closePopup(); //if open
  });

  //hover effect
  //better done in css but used to test event listener events
  newTask.addEventListener("mouseover", () => {
    newTask.style.backgroundColor = "lightgray";
    newTask.style.scale = 1.05;
  });
  newTask.addEventListener("mouseout", () => {
    newTask.style.backgroundColor = "";
    newTask.style.scale = "";
  });

  //edit task
  editBtn.addEventListener("click", () => {
    currentTask = newTask;
    //show modal
    openPopup(newTask);
  });

  //append new task
  taskList.appendChild(newTask);

  return newTask;
}

let currentTask;
function openPopup(task) {
  popup.style.display = "flex";
  popupInput.value = task.firstChild.childNodes[1].textContent;
}
function closePopup(task) {
  popup.style.display = "none";
  currentTask = task;
}
popupSubmit.addEventListener("click", () => {
  let value = popupInput.value.trim();
  if (value == "") {
    return;
  }
  currentTask.firstChild.childNodes[1].textContent = value;
  popupInput.value = "";
  closePopup();
  console.log(currentTask);
});

deleteAll.addEventListener("click", () => {
  taskList.innerHTML = "";
});

popup.style.display = "none";
//default starting task
buildTask("Hello old friend");
