const sortPriority = document.querySelector(".sort_p");
sortPriority.addEventListener("click", () => {
  const taskLists = document.querySelector("#taskLists");
  const dateList = document.querySelector("#dateList");
  const dueList = document.querySelector("#dueList");
  const priorityList = document.querySelector("#priorityList");
  taskLists.innerHTML = "";
  dateList.innerHTML = "";
  dueList.innerHTML = "";
  priorityList.innerHTML = "";
  const list_id = document.getElementById("selectList").dataset.listId;
  const access_token = document.getElementById("selectList").dataset.token;
  fetch(
    `https://obscure-reef-59139.herokuapp.com/task/${list_id}/${access_token}`
  )
    .then((data) => data.json())
    .then((result) => {
      Array.from(result.tasks).forEach((task) => {
        if (task.priority == null) {
          task.priority = {
            id: 10,
          };
        }
      });

      array = result.tasks;
      array.sort((a, b) => {
        return a.priority.id - b.priority.id;
      });
      array.forEach((task) => {
        Array.from(task.assignees).forEach((person) => {
          if (person.email == email_id) {
            var dateCreated = new Date(
              parseInt(task.date_created)
            ).toLocaleDateString(
              "en-IN",
              { year: "numeric", month: "short", day: "numeric" },
              { timeZone: "Asia/Kolkata" }
            );

            var dueDate = new Date(parseInt(task.due_date)).toLocaleDateString(
              "en-IN",
              { timeZone: "Asia/Kolkata" }
            );
            var dueDate_coming = new Date(
              parseInt(task.due_date)
            ).toLocaleDateString(
              "en-IN",
              { weekday: "long", month: "short", day: "numeric" },
              { timeZone: "Asia/Kolkata" }
            );
            if (dueDate == "Invalid Date") {
              dueDate = "-";
            }
            if (parseInt(task.due_date) < Date.now()) {
              dueList.innerHTML += `<li class="theDue taskItems" style="color:red">${dueDate}</li>`;
            } else {
              if (dueDate_coming == "Invalid Date") {
                dueDate_coming = "-";
              }

              dueList.innerHTML += `<li class="theDue taskItems" style="color:green">${dueDate_coming}</li>`;
            }
            if (task.priority.id == 10) {
              priorityList.innerHTML += `<li class="thePriority taskItems">${"--"}</li>`;
            } else if (task.priority.priority == "urgent") {
              priorityList.innerHTML += `<li class="thePriority taskItems" style="font-weight: bolder; color: red">${task.priority.priority}</li>`;
            } else if (task.priority.priority == "high") {
              priorityList.innerHTML += `<li class="thePriority taskItems" style="font-weight: bolder; color: yellow">${task.priority.priority}</li>`;
            } else if (task.priority.priority == "normal") {
              priorityList.innerHTML += `<li class="thePriority taskItems" style="font-weight: bolder; color: #6fddff">${task.priority.priority}</li>`;
            } else if (task.priority.priority == "low") {
              priorityList.innerHTML += `<li class="thePriority taskItems" style="font-weight: bolder; color: #d8d8d8">${task.priority.priority}</li>`;
            }

            taskLists.innerHTML += `<li class="theTitle taskItems">${task.name}</li>`;
            dateList.innerHTML += `<li class="theDate taskItems">${dateCreated}</li>`;
          }
        });
      });
    });
});


const sortDue = document.querySelector(".sort_d");
sortDue.addEventListener("click", () => {
    const taskLists = document.querySelector("#taskLists");
    const dateList = document.querySelector("#dateList");
    const dueList = document.querySelector("#dueList");
    const priorityList = document.querySelector("#priorityList");
    taskLists.innerHTML = "";
    dateList.innerHTML = "";
    dueList.innerHTML = "";
    priorityList.innerHTML = "";
    const list_id = document.getElementById("selectList").dataset.listId;
    const access_token = document.getElementById("selectList").dataset.token;
    fetch(
      `https://obscure-reef-59139.herokuapp.com/task/${list_id}/${access_token}`
    )
      .then((data) => data.json())
      .then((result) => {
        Array.from(result.tasks).forEach((task) => {
          if (task.due_date == null) {
              task.due_date = "99999999999999"
          }
        });
  
        array = result.tasks;
        array.sort((a, b) => {
          return a.due_date - b.due_date;
        });
        array.forEach((task) => {
          Array.from(task.assignees).forEach((person) => {
            if (person.email == email_id) {
              var dateCreated = new Date(
                parseInt(task.date_created)
              ).toLocaleDateString(
                "en-IN",
                { year: "numeric", month: "short", day: "numeric" },
                { timeZone: "Asia/Kolkata" }
              );
  
              var dueDate = new Date(parseInt(task.due_date)).toLocaleDateString(
                "en-IN",
                { timeZone: "Asia/Kolkata" }
              );
              var dueDate_coming = new Date(
                parseInt(task.due_date)
              ).toLocaleDateString(
                "en-IN",
                { weekday: "long", month: "short", day: "numeric" },
                { timeZone: "Asia/Kolkata" }
              );
              if (parseInt(task.due_date) < Date.now()) {
                dueList.innerHTML += `<li class="theDue taskItems" style="color:red">${dueDate}</li>`;
              } else if (parseInt(task.due_date) == 99999999999999) {
                dueList.innerHTML += `<li class="theDue taskItems" style="color:red">--not set--</li>`;
              }  else {
                
  
                dueList.innerHTML += `<li class="theDue taskItems" style="color:green">${dueDate_coming}</li>`;
              }
              if (task.priority == null) {
                priorityList.innerHTML += `<li class="thePriority taskItems">${"--"}</li>`;
              } else if (task.priority.priority == "urgent") {
                priorityList.innerHTML += `<li class="thePriority taskItems" style="font-weight: bolder; color: red">${task.priority.priority}</li>`;
              } else if (task.priority.priority == "high") {
                priorityList.innerHTML += `<li class="thePriority taskItems" style="font-weight: bolder; color: yellow">${task.priority.priority}</li>`;
              } else if (task.priority.priority == "normal") {
                priorityList.innerHTML += `<li class="thePriority taskItems" style="font-weight: bolder; color: #6fddff">${task.priority.priority}</li>`;
              } else if (task.priority.priority == "low") {
                priorityList.innerHTML += `<li class="thePriority taskItems" style="font-weight: bolder; color: #d8d8d8">${task.priority.priority}</li>`;
              }
  
              taskLists.innerHTML += `<li class="theTitle taskItems">${task.name}</li>`;
              dateList.innerHTML += `<li class="theDate taskItems">${dateCreated}</li>`;
            }
          });
        });
      });
  });
  