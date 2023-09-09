let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todoForm = document.querySelector(".input-section");
const todoInput = document.querySelector("#todoInput");
const editEvent = document.getElementById("edit_event");
const editModal = document.getElementById("editModal");
const todoList = document.querySelector(".todo-list");
const addButton = document.querySelector("#addBtn");
const updateButton = document.getElementById("update-button");
const updateButtonModal = document.getElementById("update-buttonModal");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const todo_main = document.querySelector(".todos");

// function saveTodos() {
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

async function renderTodos() {
  todoList.innerHTML = "";
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch(
    "http://localhost:5500/api/v1/event/all",
    requestOptions
  ).then((response) => response.json());

  response.events.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "li";

    const checkbox = document.createElement("input");
    checkbox.className = "form-check-input";
    checkbox.type = "checkbox";
    checkbox.value = "option1";
    checkbox.checked = todo.klik;
    checkbox.addEventListener("change", () => toggleTodoCompleted(todo));

    const label = document.createElement("label");
    label.className = "form-check-label";

    const spanText = document.createElement("span");
    spanText.className = "todo-text";
    spanText.textContent = `${todo.event_name}`;

    const deleteButton = document.createElement("span");
    deleteButton.className = "span-button";
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    const editButton = document.createElement("span");
    editButton.className = "span-button ";
    editButton.innerText = "Edit";
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editButton.setAttribute("data-toggle", "modal");
    editButton.setAttribute("data-target", "#editModal");
    //     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    //   Launch demo modal
    // </button>

    editButton.addEventListener("click", function () {
      handleOpenEditmodal(todo);
      // replace 'someId' dengan ID todo yang sesuai
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(spanText);
    li.appendChild(deleteButton);
    li.appendChild(editButton);

    todoList.appendChild(li);
  });
}

// kirim

async function addTodo() {
  const todoInput = document.querySelector("#todoInput");
  const todoText = todoInput.value;

  if (todoText !== "") {
    const currentDate = new Date();
    try {
      const response = await fetch(`http://localhost:5500/api/v1/event/new`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ event_name: todoText }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assuming the rest of the logic should be executed regardless of the fetch outcome
    } catch (error) {
      console.error("Error adding todo:", error);
    }

    renderTodos();
    todoInput.value = "";
  }

  return false;
}

// Toggle
function toggleTodoCompleted(todo) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    klik: !todo.klik,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`http://localhost:5500/api/v1/event/update/${todo.id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))
    .finally(() => {
      renderTodos();
    });
}

addButton.onclick = addTodo;

//Delete
async function deleteTodo(id) {
  const requestOptions = {
    method: "DELETE",
  };

  await fetch(`http://localhost:5500/api/v1/event/delete/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))
    .finally(() => {
      renderTodos();
    });
}
// EDIT EVENT
// Function to handle edit button click

function editTodotext(todo) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    event_name: todo.todoInput,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`http://localhost:5500/api/v1/event/update/${todo.id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))
    .finally(() => {
      renderTodos();
    });
}

// Open Modal
function handleOpenEditmodal(todo) {
  const editModalInput = document.getElementById("edit_event");
  editModalInput.value = todo.event_name;
  const saveEdit = document.getElementById("saveEdit");
  saveEdit.onclick = () =>handleEditmodal(todo.id)
  // saveEdit.addEventListener("click", () => {
  //   handleEditmodal(todo.id);
  // });
  // editModal.style.display = "block";
}

function handleEditmodal(id) {
  const editModalInput = document.getElementById("edit_event");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    event_name: editModalInput.value,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`http://localhost:5500/api/v1/event/update/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error))
    .finally(() => {
      renderTodos();
    });
}

renderTodos();
