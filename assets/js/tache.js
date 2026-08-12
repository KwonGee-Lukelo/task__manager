const tableTask = [];
const priority = document.getElementById("priority");
const task = document.getElementById("task");
const submitForm = document.getElementById("submit");
const errorMessage = document.getElementById("error");
const sectionTask = document.getElementById("task__list");

function retrieveData() {
  let prioritySelected = priority.value;
  let taskValue = task.value.trim();

  return { task: taskValue, priority: prioritySelected };
}

function displayTask() {
  let tableBody = document.querySelector(".table__body");
  tableBody.innerHTML = "";

  for (let i = 0; i < tableTask.length; i++) {
    const item = tableTask[i];

    let badgeClass = "";
    let textBadgeClass = "";

    if (item.priority === "Haute") {
      badgeClass = "badge__haute";
      textBadgeClass = "text__badgeHaute";
    } else if (item.priority === "Moyenne") {
      badgeClass = "badge__moyenne";
      textBadgeClass = "text__badgeMoyenne";
    } else if (item.priority === "Basse") {
      badgeClass = "badge__basse";
      textBadgeClass = "text__badgeBasse";
    }

    let row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <div class="item__group">
          <div class="checkbox">
            <input type="checkbox" name="" id="task__${i}" />
            <label for="task__${i}">${item.task}</label>
          </div>

          <div class="badge">
            <span class="${badgeClass}"></span>
            <p class="${textBadgeClass}">${item.priority}</p>
          </div>
        </div>
      </td>

      <td>
        <div class="action__group">
          <button><i class="ri-checkbox-circle-line"></i></button>
          <button><i class="ri-delete-bin-6-line"></i></button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  }
}

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
