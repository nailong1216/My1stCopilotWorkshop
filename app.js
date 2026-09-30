const STORAGE_KEY = "todo-list-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed-button");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = loadTodos();
let activeFilter = "all";

// 儲存主題偏好；沒有手動設定時交由系統配色決定。
function loadTheme() {
  try {
    return localStorage.getItem("todo-list-theme");
  } catch {
    return null;
  }
}

// 套用主題並同步切換按鈕的文字與狀態。
function applyTheme(theme) {
  if (theme) {
    document.documentElement.dataset.theme = theme;
  } else {
    delete document.documentElement.dataset.theme;
  }

  const isDark = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  themeToggle.innerHTML = isDark
    ? '<span aria-hidden="true">☀️</span> 淺色模式'
    : '<span aria-hidden="true">🌙</span> 深色模式';
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

let savedTheme = loadTheme();
applyTheme(savedTheme);
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
colorScheme.addEventListener("change", () => {
  if (!savedTheme) applyTheme(null);
});

themeToggle.addEventListener("click", () => {
  savedTheme = savedTheme === "dark" || (!savedTheme && colorScheme.matches)
    ? "light"
    : "dark";
  try {
    localStorage.setItem("todo-list-theme", savedTheme);
  } catch {
    // 儲存空間不可用時仍保留本次頁面的主題切換。
  }
  applyTheme(savedTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderTodos();
  });
});

clearCompletedButton.addEventListener("click", () => {
  if (!window.confirm("確定要清除所有已完成的待辦事項嗎？此操作無法復原。")) return;

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

// 從瀏覽器儲存空間讀取待辦資料。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

// 將目前的待辦資料保存到瀏覽器。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 依照目前資料重新繪製清單與統計數字。
function renderTodos() {
  todoList.replaceChildren();

  const visibleTodos = todos.filter((todo) => {
    if (activeFilter === "active") return !todo.completed;
    if (activeFilter === "completed") return todo.completed;
    return true;
  });

  visibleTodos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    listItem.classList.toggle("completed", todo.completed);

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `完成待辦事項：${todo.text}`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除待辦事項：${todo.text}`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    listItem.append(checkbox, text, deleteButton);
    todoList.append(listItem);
  });

  const incompleteCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  remainingCount.textContent = `未完成：${incompleteCount} 項`;
  clearCompletedButton.disabled = completedCount === 0;
  emptyState.hidden = visibleTodos.length > 0;
  if (activeFilter === "active") {
    emptyState.textContent = "沒有未完成的待辦事項。";
  } else if (activeFilter === "completed") {
    emptyState.textContent = todos.length > 0
      ? "目前沒有已完成的事項。未完成的項目只是被篩選隱藏，並未刪除；切換至「全部」或「未完成」即可查看。"
      : "還沒有已完成的待辦事項。";
  } else {
    emptyState.textContent = "還沒有任何待辦事項，新增一個吧!";
  }
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  todos.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    completed: false
  });

  saveTodos();
  renderTodos();
  todoForm.reset();
  todoInput.focus();
});

renderTodos();
