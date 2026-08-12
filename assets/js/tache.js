const tableTask = [];
const priority = document.getElementById("priority");
const task = document.getElementById("task");
const submitForm = document.getElementById("submit");
const errorMessage = document.getElementById("error");
const sectionTask = document.getElementById("task__list");

// RECUPERER LES DONNEES DU FORMULAIRE
function retrieveData() {
  let prioritySelected = priority.value;
  let taskValue = task.value.trim();

  return { task: taskValue, priority: prioritySelected, completed: false };
}

// AFFICHER LES TACHES
function displayTask() {
  let tableBody = document.querySelector(".table__body");
  tableBody.innerHTML = "";

  for (let i = 0; i < tableTask.length; i++) {
    const item = tableTask[i];
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
              id="task__${i}"
              ${isCompleted ? "checked" : ""}
              style="${isCompleted ? "accent-color: #10b981;" : ""}"
            />
            <label
              for="task__${i}"
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
            data-index="${i}"
            id="complete-${i}"
            style="${isCompleted ? "border-color: #10b981;" : ""}"
          >
            <i
              class="ri-checkbox-circle-line"
              style="${isCompleted ? "color: #10b981;" : ""}"
            ></i>
          </button>
          <button type="button" class="delete-btn" data-index="${i}" id="delete-${i}">
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
    displayTask();
    return;
  }

  if (deleteButton) {
    const index = Number(deleteButton.dataset.index);

    if (Number.isNaN(index) || !tableTask[index]) return;

    tableTask.splice(index, 1);
    displayTask();
  }
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
  displayTask();
});
