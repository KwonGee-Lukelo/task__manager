const tableTask = [];
const priority = document.getElementById("priority");
const task = document.getElementById("task");
const submitForm = document.getElementById("submit");
const errorMessage = document.getElementById("error");
const sectionTask = document.getElementById("task__list");
const allButton = document.getElementById("all");
const inProgressButton = document.getElementById("inProgress");
const completedButton = document.getElementById("completed");
const totalTaskCount = document.getElementById("stats__chiffre");
let currentFilter = "all";

// RECUPERER LES DONNEES DU FORMULAIRE
function retrieveData() {
  let prioritySelected = priority.value;
  let taskValue = task.value.trim();

  return { task: taskValue, priority: prioritySelected, completed: false };
}

function getFilteredTasks() {
  if (currentFilter === "inProgress") {
    return tableTask.filter((item) => item.completed === false);
  }

  if (currentFilter === "completed") {
    return tableTask.filter((item) => item.completed === true);
  }

  return tableTask;
}

function updateStats() {
  if (!totalTaskCount) return;

  totalTaskCount.textContent = tableTask.length;
  totalTaskCount.style.fontSize = "2rem";
  totalTaskCount.style.fontWeight = "bold";
}

// AFFICHER LES TACHES
function displayTask() {
  let tableBody = document.querySelector(".table__body");
  tableBody.innerHTML = "";
  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    let emptyRow = document.createElement("tr");
    let emptyMessage =
      currentFilter === "inProgress"
        ? "Aucune tâche en cours"
        : currentFilter === "completed"
          ? "Aucune tâche terminée"
          : "Aucune tâche";

    emptyRow.innerHTML = `
      <td colspan="2" style="text-align: center; color: #64748b; padding: 1rem;">
        ${emptyMessage}
      </td>
    `;

    tableBody.appendChild(emptyRow);
    return;
  }

  for (let i = 0; i < filteredTasks.length; i++) {
    const item = filteredTasks[i];
    const realIndex = tableTask.indexOf(item);
    const priorityName = (item.priority || "").toLowerCase();
    const isCompleted = Boolean(item.completed);

    let badgeClass = "";
    let textBadgeClass = "";

    if (priorityName === "haute") {
      badgeClass = "badge__haute";
      textBadgeClass = "text__badgeHaute";
    } else if (priorityName === "moyenne") {
      badgeClass = "badge__moyenne";
      textBadgeClass = "text__badgeMoyenne";
    } else if (priorityName === "basse") {
      badgeClass = "badge__basse";
      textBadgeClass = "text__badgeBasse";
    }

    let row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <div class="item__group">
          <div class="checkbox">
            <input
              type="checkbox"
              name=""
              id="task__${realIndex}"
              ${isCompleted ? "checked" : ""}
              style="${isCompleted ? "accent-color: #10b981;" : ""}"
            />
            <label
              for="task__${realIndex}"
              style="${isCompleted ? "color: #94a3b8; text-decoration: line-through;" : ""}"
            >
              ${item.task}
            </label>
          </div>

          <div class="badge">
            <span class="${badgeClass}"></span>
            <p class="${textBadgeClass}">${item.priority}</p>
          </div>
        </div>
      </td>

      <td>
        <div class="action__group">
          <button
            type="button"
            class="complete-btn"
            data-index="${realIndex}"
            id="complete-${realIndex}"
            style="${isCompleted ? "border-color: #10b981;" : ""}"
          >
            <i
              class="ri-checkbox-circle-line"
              style="${isCompleted ? "color: #10b981;" : ""}"
            ></i>
          </button>
          <button type="button" class="delete-btn" data-index="${realIndex}" id="delete-${realIndex}">
            <i class="ri-delete-bin-6-line"></i>
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  }
}

document.addEventListener("click", (event) => {
  const completeButton = event.target.closest(".complete-btn");
  const deleteButton = event.target.closest(".delete-btn");

  if (completeButton) {
    const index = Number(completeButton.dataset.index);

    if (Number.isNaN(index) || !tableTask[index]) return;

    tableTask[index].completed = !tableTask[index].completed;
    updateStats();
    displayTask();
    return;
  }

  if (deleteButton) {
    const index = Number(deleteButton.dataset.index);

    if (Number.isNaN(index) || !tableTask[index]) return;

    tableTask.splice(index, 1);
    updateStats();
    displayTask();
  }
});

allButton.addEventListener("click", () => {
  currentFilter = "all";
  displayTask();
});

inProgressButton.addEventListener("click", () => {
  currentFilter = "inProgress";
  displayTask();
});

completedButton.addEventListener("click", () => {
  currentFilter = "completed";
  displayTask();
});

// ECOUTER L'EVENEMENT DU BOUTON SUBMIT
submitForm.addEventListener("click", (e) => {
  e.preventDefault();
  let data = retrieveData();

  if (data.task.trim() === "" || data.priority === "") {
    errorMessage.textContent =
      "Veuillez remplir le champs et choisir la priorité svp!";
    errorMessage.style.color = "#ef4444";
    return;
  }

  tableTask.push(data);

  task.value = "";
  priority.value = "";
  task.focus();

  console.log(tableTask);
  updateStats();
  displayTask();
});
