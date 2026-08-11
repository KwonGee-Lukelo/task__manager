const tableTask = [];
const priority = document.getElementById("priority");
const task = document.getElementById("task");
const submitForm = document.getElementById("submit");
const errorMessage = document.getElementById("error");

function retrieveData() {
  let prioritySelected = priority.value;
  let taskValue = task.value;

  return { task: taskValue, priority: prioritySelected };
}

submitForm.addEventListener("click", (e) => {
  let data = retrieveData();

  if (data.task.trim() === "" || data.priority === "") {
    e.preventDefault();

    errorMessage.textContent =
      "Veuillez remplir le champs et choisir la priorité svp!";
    errorMessage.style.color = "#ef4444";
    return;
  }
});
