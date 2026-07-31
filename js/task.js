// =============== Calling Header =============
let taskTitle = document.getElementById("task-sub");
let addBut = document.querySelector(".sub");
let tabBody = document.querySelector(".task-body");

let arrayTask = JSON.parse(localStorage.getItem("tasks")) || [];
getDataStorage();
// =============== Action To stop page Refresh After Add Task =============
addBut.addEventListener("click", () => {
  addBut.preventDefualt();
});
// =============== Action To Add Task =============
addBut.onclick = function () {
  if (taskTitle.value !== "") {
    addTask(taskTitle.value);
    taskTitle.value = "";
  }
};

// =============== Function Add New Task =============
function addTask(newTask) {
  let task = {
    id: Date.now(),
    title: newTask,
    complete: false,
    delete: false,
  };
  //1- add new task to array
  arrayTask.push(task);
  //2- create Element To show task in page
  addElement(arrayTask);
  //3- Store Data of task in localStorage
  setDataStorage(arrayTask);
}

// =============== Function To create Row For every Task in Array =============
function addElement(arrayOfTask) {
  tabBody.innerHTML = "";
  // create row
  arrayOfTask.forEach((task) => {
    let tr = document.createElement("tr");
    tr.className = "row";
    tr.setAttribute("data-row", task.id);
    tr.innerHTML = `<td class="comp-task">
                        <label class="custom-checkbox">
                            <input type="checkbox" id="terms">
                            <span class="checkmark" data-comp="${task.id}"></span>
                        </label>
                    </td>
                    <td class="taskshow">${task.title}</td>
                    <td><i class="fa-solid fa-trash delete-icon" data-id ="${task.id}"></i></td>`;
    tabBody.appendChild(tr);
  });
}
// =============== Function To add New TAsk To LocalStorage =============
function setDataStorage(arrayTask) {
  localStorage.setItem("tasks", JSON.stringify(arrayTask));
}

// =============== Function To check Local Storage Not Empty and Add element Functio =============
function getDataStorage() {
  if (arrayTask) {
    addElement(arrayTask);
  }
}

// =============== Function Delete Task =============
tabBody.addEventListener("click", (e) => {
  let delBut = e.target.closest(".delete-icon");

  if (delBut) {
    // Function To Make delete is True in LocalStorage
    const delId = e.target.getAttribute("data-id");
    deleteTask(delId);
    const row = delBut.closest("tr");
    if (row) {
      row.remove();
    }
  }
});
function deleteTask(taskId) {
  for (let i = 0; i < arrayTask.length; i++) {
    if (arrayTask[i].id == taskId) {
      arrayTask[i].delete == false
        ? (arrayTask[i].delete = true)
        : (arrayTask[i].delete = false);
    }
  }
  setDataStorage(arrayTask);
}
// =============== Function Completed Task =============
tabBody.addEventListener("click", (ele) => {
  let compBut = document.querySelector(".checkmark");
  if (compBut) {
    completeTask(ele.target.getAttribute("data-comp"));
    ele.target.parentElement.parentElement.style.display = "inline-block";
  }
});
function completeTask(taskId) {
  for (let i = 0; i < arrayTask.length; i++) {
    if (arrayTask[i].id == taskId) {
      arrayTask[i].complete == false
        ? (arrayTask[i].complete = true)
        : (arrayTask[i].complete = false);
    }
  }
  setDataStorage(arrayTask);
}

// =============== Function New Task Tab=============
let newTab = document.querySelector(".new-tab");
newTab.addEventListener("click", (e) => {
  e.preventDefault();
  // function search Task that complete false
  newData(arrayTask);
});

function newData(dataNew) {
  const incompleteTasks = dataNew.filter((data) => data.complete !== true);
  addElement(incompleteTasks);
}

// =============== Function Complete Task Tab=============
let compTab = document.querySelector(".comp-tab");
compTab.addEventListener("click", (e) => {
  e.preventDefault();
  // Function calling all completed task
  compData(arrayTask);
});

function compData(dataComp) {
  let completedData = dataComp.filter((data) => data.complete == true);
  addElement(completedData);
}

// =============== Function Delete Task Tab =============
let deleteTab = document.querySelector(".del-tab");
deleteTab.addEventListener("click", (e) => {
  e.preventDefault();
  // Function to calling all Deleted Tasks
  deletedTask(arrayTask);
});

function deletedTask(deleteData) {
  let deleteTask = deleteData.filter((data) => data.delete == true);
  addElement(deleteTask);
}
