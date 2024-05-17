document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("new-todo-form");
  const todoList = document.getElementById("todo-list");
  const taskCount = document.getElementById("task-count");
  let totalTasks = 0;
  function updateTaskCount() {
    taskCount.innerText = `Total Tasks: ${totalTasks}`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const contentInput = document.getElementById("content");
    const categoryInput = document.querySelector(
      'input[name="category"]:checked'
    );

    if (contentInput.value.trim() === "" || !categoryInput) {
      alert("Please fill out all fields");
      return;
    }

    const todoContent = contentInput.value.trim();
    const todoCategory = categoryInput.value;

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    todoItem.innerHTML = `
        <label>
          <input type="checkbox">
          <span class="bubble ${todoCategory.toLowerCase()}"></span>
        </label>
        <div class="todo-content">
          <input type="text" value="${todoContent}" readonly>
        </div>
        <div class="actions">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      `;

    todoList.appendChild(todoItem);
    totalTasks++;
    updateTaskCount();
    contentInput.value = "";
    categoryInput.checked = false;

    const checkbox = todoItem.querySelector('input[type="checkbox"]');
    const editButton = todoItem.querySelector(".edit");
    const deleteButton = todoItem.querySelector(".delete");

    checkbox.addEventListener("change", () => {
      todoItem.classList.toggle("done", checkbox.checked);
      if (checkbox.checked) {
        alert("Task is completed");
        totalTasks--;
      }
      updateTaskCount();
    });

    editButton.addEventListener("click", () => {
      const todoInput = todoItem.querySelector(".todo-content input");
      if (editButton.innerText.toLowerCase() === "edit") {
        todoInput.removeAttribute("readonly");
        todoInput.focus();
        editButton.innerText = "Save";
      } else {
        todoInput.setAttribute("readonly", "readonly");
        editButton.innerText = "Edit";
      }
    });

    deleteButton.addEventListener("click", () => {
      todoList.removeChild(todoItem);
      totalTasks--;
      updateTaskCount();
    });
  });
});
