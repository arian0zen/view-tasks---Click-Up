const sortPriority = document.querySelector(".sort_p");
fetch(`https://obscure-reef-59139.herokuapp.com/teams/${access_token}`)
  .then((data) => data.json())
  .then((result) => {
    team_id = result.teams[0].id;
  });
sortPriority.addEventListener("click", () => {
  const taskLists = document.querySelector("#taskLists");
  const dateList = document.querySelector("#dateList");
  const dueList = document.querySelector("#dueList");
  const priorityList = document.querySelector("#priorityList");
  taskLists.innerHTML = "";
  dateList.innerHTML = "";
  dueList.innerHTML = "";
  priorityList.innerHTML = "";
  var list_id = document.getElementById("selectList").dataset.listId;
  if(list_id == undefined){
    list_id = document.getElementById("selectFolderless").dataset.listId
  }
  var team_id = document.getElementById("workspace_title").dataset.id;
  var firstTeam_id = document.querySelectorAll(".workspace_item_title")[0].id;
  var access_token = document.cookie.split("&")[1];
  access_token = access_token.split("=")[1];
  access_token = access_token.split("#")[0];
  if (team_id === "") {
    team_id = firstTeam_id;
  }
  const selectList = document.getElementById("selectList");
  const selectFolderless = document.getElementById("selectFolderless");

  if (selectList.dataset.id == "" && selectFolderless.dataset.id == "") {
    fetch(
      `https://obscure-reef-59139.herokuapp.com/alltask/${team_id}/${access_token}`
    )
      .then((data) => data.json())
      .then((result) => {
        var assignedArray = [];
        Array.from(result.tasks).forEach((task) => {
          Array.from(task.assignees).forEach((person) => {
            if (person.email == email_id) {
              assignedArray.push(task);
            }
          });
        });
        Array.from(assignedArray).forEach((task) => {
          if (task.priority == null) {
            task.priority = {
              id: 10,
            };
          }
        });
        var array_items = document.querySelectorAll(".theTitle");
        if (array_items.length >= assignedArray.length) {
          console.log("i am exceeding");
          return;
        }

        assignedArray.sort((a, b) => {
          return a.priority.id - b.priority.id;
        });
        assignedArray.forEach((task) => {
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
        });
      });
  }else if(selectFolderless.dataset.id != ""){
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

              var dueDate = new Date(
                parseInt(task.due_date)
              ).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
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

  } else {
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

              var dueDate = new Date(
                parseInt(task.due_date)
              ).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
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
  }
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
  var list_id = document.getElementById("selectList").dataset.listId;
  if(list_id == undefined){
    list_id = document.getElementById("selectFolderless").dataset.listId
  }
  var team_id = document.getElementById("workspace_title").dataset.id;
  var firstTeam_id = document.querySelectorAll(".workspace_item_title")[0].id;
  var access_token = document.cookie.split("&")[1];
  access_token = access_token.split("=")[1];
  access_token = access_token.split("#")[0];
  if (team_id == "") {
    team_id = firstTeam_id;
  }
  const selectList = document.getElementById("selectList");

  if (selectList.dataset.id == "" && selectFolderless.dataset.id == "") {
    fetch(
      `https://obscure-reef-59139.herokuapp.com/alltask/${team_id}/${access_token}`
    )
      .then((data) => data.json())
      .then((result) => {
        var assignedArray = [];
        Array.from(result.tasks).forEach((task) => {
          Array.from(task.assignees).forEach((person) => {
            if (person.email == email_id) {
              assignedArray.push(task);
            }
          });
        });
        Array.from(assignedArray).forEach((task) => {
          if (task.due_date == null) {
            task.due_date = "99999999999999";
          }
        });
        var array_items = document.querySelectorAll(".theTitle");
        if (array_items.length >= assignedArray.length) {
          console.log("i am exceeding");
          return;
        }

        assignedArray.sort((a, b) => {
          return a.due_date - b.due_date;
        });
        assignedArray.forEach((task) => {
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
          } else {
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
        });
      });
  }else if(selectFolderless.dataset.id != "") {
    fetch(
      `https://obscure-reef-59139.herokuapp.com/task/${list_id}/${access_token}`
    )
      .then((data) => data.json())
      .then((result) => {
        Array.from(result.tasks).forEach((task) => {
          if (task.due_date == null) {
            task.due_date = "99999999999999";
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

              var dueDate = new Date(
                parseInt(task.due_date)
              ).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
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
              } else {
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
  } else {
    fetch(
      `https://obscure-reef-59139.herokuapp.com/task/${list_id}/${access_token}`
    )
      .then((data) => data.json())
      .then((result) => {
        Array.from(result.tasks).forEach((task) => {
          if (task.due_date == null) {
            task.due_date = "99999999999999";
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

              var dueDate = new Date(
                parseInt(task.due_date)
              ).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
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
              } else {
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
  }
});
