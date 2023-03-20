window.addEventListener("load", function () {
  const root = this.document.documentElement;

  const todoList = this.document.querySelector(".todo-list");
  const toTodo_btn = this.document.querySelector(".to-todoList");
  const themeCheckbox = this.document.querySelector(
    "input[name=theme-checkbox]"
  );
  const addTask = this.document.querySelector(".add-task");
  const inputTask = document.querySelector(".box-input input");

  const buttonBars = this.document.querySelector(".button-bars");
  const buttonAddTask = this.document.querySelector(".add-task-btn");
  const buttonExitAdd = this.document.querySelector(".exit-add-btn");
  const buttonSubmitAdd = this.document.querySelector(".submit-btn");

  const todoListStorage = JSON.parse(this.localStorage.getItem("todoList"));

  themeCheckbox.addEventListener("change", function () {
    setTheme(this);
  });

  toTodo_btn.addEventListener("click", function () {
    todoList.style.setProperty("transform", "translateX(0) scale(1)");
  });

  buttonBars.addEventListener("click", function () {
    todoList.style.setProperty("transform", "translateX(250px) scale(0.85)");
  });

  buttonAddTask.addEventListener("click", function () {
    addTask.style.setProperty("transform", "scale(1)");
    setDraftValue();
  });

  buttonExitAdd.addEventListener("click", function () {
    addTask.style.setProperty("transform", "scale(0)");
    inputTask.value = "";
  });

  buttonSubmitAdd.addEventListener("click", addItem);

  inputTask.addEventListener("change", function () {
    if (inputTask.value.trim()) {
      sessionStorage.setItem("draft", inputTask.value.trim());
    }
  });

  function addItem() {
    const newItem = inputTask.value.trim();
    if (newItem) {
      todoListStorage.push(newItem);
    }

    render();

    inputTask.value = "";
    localStorage.setItem("todoList", JSON.stringify(todoListStorage));

    addTask.style.setProperty("transform", "scale(0)");
    todoList.style.setProperty("transform", "translateX(0) scale(1)");
    sessionStorage.removeItem("draft");
  }

  function render() {
    const htmlList = document.querySelector(".todolist_tasks");
    let content;
    let count = 0;
    if (todoListStorage.length > 0) {
      content = todoListStorage.map(function (item) {
        count++;
        return `<div class="tasks-item">
        <label for="task-${count}" class="task task-busi">
          <input type="checkbox" id="task-${count}" class="checkbox" />
          <i class="fas fa-check"></i>
          <span>${item}</span>
        </label>
      </div>`;
      });

      htmlList.innerHTML = content.join("");
    } else {
      content = `<h3>List Task is empty!</h3>`;

      htmlList.innerHTML = content;
    }
  }

  function setDraftValue() {
    if (sessionStorage.getItem("draft")) {
      inputTask.value = sessionStorage.getItem("draft");
    }
  }

  render();

  const darkTheme = {
    "--color-line-theme": "rgb(212, 58, 243)",
    "--background-page": "rgb(116, 185, 255)",
    "--background-todolist": "rgb(58, 98, 173)",
    "--background-item-todolist": "rgb(17, 36, 98)",
    "--background-overview": "rgb(17, 36, 98)",
    "--text-color-S-title-hover": "rgba(255, 255, 255, 0.9)",
    "--text-color": "white",
    "--text-color-S-title": "rgba(255, 255, 255, 0.7)",
  };

  const lightTheme = {
    "--color-line-theme": "rgb(15, 188, 249)",
    "--background-page": "rgb(211, 217, 243)",
    "--background-todolist": "rgb(231, 238, 245)",
    "--background-item-todolist": "white",
    "--background-overview": "rgb(17, 36, 98)",
    "--text-color-S-title-hover": "rgba(85, 85, 85, 0.9)",
    "--text-color": "#222",
    "--text-color-S-title": "rgba(85, 85, 85, 0.7)",
  };

  function setTheme(themeCheckbox) {
    setTimeout(() => {
      if (!themeCheckbox.checked) {
        for (const key in darkTheme) {
          root.style.setProperty(key, darkTheme[key]);
        }
      } else {
        for (const key in lightTheme) {
          root.style.setProperty(key, lightTheme[key]);
        }
      }
    }, 200);
  }
});
