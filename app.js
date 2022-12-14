function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; SameSite=None;
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let access_token = getCookie("token");
  if (access_token != "") {
    console.log("succeded");
  } else {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
    var submitToken = document.getElementById("submitToken");
    submitToken.addEventListener("click", (e) => {
      var modal = document.getElementById("modal");
      modal.style.display = "none";

      var access_token = window.location.href;
      access_token = access_token.split("email=");
      access_token = access_token[1];

      if (access_token != "" && access_token != null) {
        setCookie("token", access_token, 365);
      }
    });
  }
}

window.onload = () => {
  checkCookie();
};

var email_id = document.cookie.split("token=")[1];
email_id = email_id.split("&")[0];
email_id = email_id.replace("%40", "@");
var access_token = document.cookie.split("&")[1];
access_token = access_token.split("=")[1];
access_token = access_token.split("#")[0];
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.reload();
});

var submitToken = document.getElementById("submitToken");
submitToken.addEventListener("click", () => {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
});

fetch(`https://task-up-hosting.vercel.app/users/${access_token}`)
  .then((data) => data.json())
  .then((result) =>{
    if(result.user.profilePicture == undefined){
      result.user.profilePicture = 'profilepic.bmp'
    }
      document.querySelector(".profile_picture").src = result.user.profilePicture; 
      document.querySelector(".topbar_titles").innerText = result.user.username;
      if(result.user.email != email_id){
        new Notify ({
          title: 'wrong email id',
          text: "email id provided does not match with account credentials, kindly log out and log in again",
          status: 'error',
          autoclose: true,
          autotimeout: 10000,
          speed: 300, //,
          showCloseButton: true,
          showIcon: true,
          position: 'right top'
      })
      } 
  })



fetch(`https://task-up-hosting.vercel.app/teams/${access_token}`)
  .then((data) => data.json())
  .then((result) => {
    let space_list = document.getElementById("menu-bar");
  
    Array.from(result.teams).forEach((team) => {
      if(team.avatar == undefined){
        team.avatar = `profilepic.bmp`;
      }
      space_list.innerHTML += `<li class="workspace_item">
      <a href="#">
        <div class="">
        <img src="${team.avatar}" alt=""  class="icon"/>
        </div>
        <p class="workspace_item_title" id="${team.id}">${team.name} </p>
      </a>
    </li>`;
    });
  });

const btnDrop = document.querySelector("#dropdown-icon");
const menuWrapper = document.querySelector(".wrapper");

const menuBar = document.querySelector(".menu-bar");

btnDrop.onclick = () => {
  menuWrapper.classList.toggle("wrapper-show");
  const workspace_item = document.getElementsByClassName("workspace_item");

  Array.from(workspace_item).forEach((item) => {
    if (document.getElementById("workspace_title").dataset.id != "") {
      return;
    }

    item.addEventListener("click", () => {
      const theIcon = document.getElementById("theIcon");
      theIcon.innerHTML = `<i class='bx bx-x bx-lg' id='close'></i>`;
      theIcon.addEventListener("click", () => {
        window.close();
      });
      // all tasks
      const taskLists = document.querySelector("#taskLists");
      const dateList = document.querySelector("#dateList");
      const dueList = document.querySelector("#dueList");
      const priorityList = document.querySelector("#priorityList");
      taskLists.innerHTML = "";
      dateList.innerHTML = "";
      dueList.innerHTML = "";
      priorityList.innerHTML = "";
      var team_id = item.children[0].children[1].id;
      fetch(
        `https://task-up-hosting.vercel.app/alltask/${team_id}/${access_token}`
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
          var array_items = document.querySelectorAll(".theTitle");
          if (array_items.length >= assignedArray.length) {
            return;
          }
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
              dueList.innerHTML += `<li class="theDue taskItems OthertaskItems" style="color:red">${dueDate}</li>`;
            } else {
              if (dueDate_coming == "Invalid Date") {
                dueDate_coming = "-";
              }

              dueList.innerHTML += `<li class="theDue taskItems OthertaskItems" style="color:green">${dueDate_coming}</li>`;
            }
            if (task.priority == null) {
              priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems">${"--"}</li>`;
            } else if (task.priority.priority == "urgent") {
              priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: red">${task.priority.priority}</li>`;
            } else if (task.priority.priority == "high") {
              priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: yellow">${task.priority.priority}</li>`;
            } else if (task.priority.priority == "normal") {
              priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: #6fddff">${task.priority.priority}</li>`;
            } else if (task.priority.priority == "low") {
              priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: #d8d8d8">${task.priority.priority}</li>`;
            }

            taskLists.innerHTML += `<li class="theTitle taskItems taskNames" data-id="${task.id}" data-id="${task.id}"><label class="done">
            <input type="checkbox">
            <div class="checkmark"></div>
          </label>${task.name}</li>`;
            dateList.innerHTML += `<li class="theDate taskItems OthertaskItems">${dateCreated}</li>`;
          });
        });
      // all tasks

      menuWrapper.classList.remove("wrapper-show");
      document.getElementById("workspace_title").innerText =
        item.children[0].children[1].innerText;

      document.getElementById("workspace_picture").src =
        item.children[0].children[0].children[0].src;

      var team_id = item.children[0].children[1].id;
      document.getElementById("workspace_title").dataset.id = team_id;

      const spaceList = document.querySelector("#spaceList");
      spaceList.innerHTML = "";
      fetch(
        `https://task-up-hosting.vercel.app/spaces/${team_id}/${access_token}`
      )
        .then((data) => data.json())
        .then((result) => {
          var array_items = document.querySelectorAll(".spaceItems");
          if (array_items.length >= result.spaces.length) {
            return;
          }

          Array.from(result.spaces).forEach((space) => {
            spaceList.innerHTML += `<li class="spaceItems" id="${space.id}">${space.name}</li>`;
            array = document.querySelectorAll(".spaceItems");
          });
        });
    });
  });
};

const selectSpace = document.querySelector("#selectSpace");
selectSpace.addEventListener("click", () => {
  const spaceItems = document.querySelectorAll(".spaceItems");
  Array.from(spaceItems).forEach((spaceItem) => {
    if (document.getElementById("selectSpace").dataset.id != "") {
      return;
    }
    spaceItem.addEventListener("click", () => {
      const space_id = spaceItem.id;
      selectSpace.dataset.id = spaceItem.id;
      const folderList = document.querySelector("#folderList");
      // folderList.innerHTML = '';
      fetch(
        `https://task-up-hosting.vercel.app/folder/${space_id}/${access_token}`
      )
        .then((data) => data.json())
        .then((result) => {
          var array_items = document.querySelectorAll(".folderItems");
          if (array_items.length >= result.folders.length) {
            return;
          }

          Array.from(result.folders).forEach((folder) => {
            folderList.innerHTML += `<li class="folderItems" id="${folder.id}">${folder.name}</li>`;
          });
        });
      //folderless lists
      const folderlesslistList = document.querySelector("#folderlesslistList");
      fetch(`https://task-up-hosting.vercel.app/folderless/${space_id}/${access_token}
        `)
        .then((data) => data.json())
        .then((result) => {
          var array_items = document.querySelectorAll(".folderlessItems");
          if (array_items.length >= result.lists.length) {
            return;
          }
          Array.from(result.lists).forEach((list) => {
            folderlesslistList.innerHTML += `<li class="folderlessItems" id="${list.id}">${list.name}</li>`;
          });
        });
    });
  });
});

const selectFolder = document.querySelector("#selectFolder");
selectFolder.addEventListener("click", () => {
  const folderItems = document.querySelectorAll(".folderItems");

  Array.from(folderItems).forEach((folderItem) => {
    if (document.getElementById("selectFolder").dataset.id != "") {
      return;
    }
    folderItem.addEventListener("click", () => {
      const folder_id = folderItem.id;
      selectFolder.dataset.id = folderItem.id;
      const listList = document.querySelector("#listList");
      fetch(
        `https://task-up-hosting.vercel.app/list/${folder_id}/${access_token}`
      )
        .then((data) => data.json())
        .then((result) => {
          var array_items = document.querySelectorAll(".listItems");
          if (array_items.length >= result.lists.length) {
            return;
          }

          Array.from(result.lists).forEach((list) => {
            listList.innerHTML += `<li class="listItems" id="${list.id}">${list.name}</li>`;
          });
        });
    });
  });
});

const selectList = document.querySelector("#selectList");
selectList.addEventListener("click", () => {
  const listItems = document.querySelectorAll(".listItems");
  Array.from(listItems).forEach((listItem) => {
    if (document.getElementById("selectList").dataset.id != "") {
      return;
    }
    listItem.addEventListener("click", () => {
      const list_id = listItem.id;
      selectList.dataset.id = list_id;
      const taskLists = document.querySelector("#taskLists");
      const dateList = document.querySelector("#dateList");
      const dueList = document.querySelector("#dueList");
      const priorityList = document.querySelector("#priorityList");
      taskLists.innerHTML = "";
      dateList.innerHTML = "";
      dueList.innerHTML = "";
      priorityList.innerHTML = "";
      let forSortList = document.getElementById("selectList");
      forSortList.dataset.listId = list_id;
      fetch(
        `https://task-up-hosting.vercel.app/task/${list_id}/${access_token}`
      )
        .then((data) => data.json())
        .then((result) => {
          var array_items = document.querySelectorAll(".theTitle");
          if (array_items.length >= result.tasks.length) {
            return;
          }
          Array.from(result.tasks).forEach((task) => {
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
                  dueList.innerHTML += `<li class="theDue taskItems OthertaskItems" style="color:red">${dueDate}</li>`;
                } else {
                  if (dueDate_coming == "Invalid Date") {
                    dueDate_coming = "-";
                  }

                  dueList.innerHTML += `<li class="theDue taskItems OthertaskItems" style="color:green">${dueDate_coming}</li>`;
                }
                if (task.priority == null) {
                  priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems">${"--"}</li>`;
                } else if (task.priority.priority == "urgent") {
                  priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: red">${task.priority.priority}</li>`;
                } else if (task.priority.priority == "high") {
                  priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: yellow">${task.priority.priority}</li>`;
                } else if (task.priority.priority == "normal") {
                  priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: #6fddff">${task.priority.priority}</li>`;
                } else if (task.priority.priority == "low") {
                  priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: #d8d8d8">${task.priority.priority}</li>`;
                }

                taskLists.innerHTML += `<li class="theTitle taskItems taskNames" data-id="${task.id}" data-id="${task.id}"><label class="done">
                <input type="checkbox">
                <div class="checkmark"></div>
              </label>${task.name}</li>`;
                dateList.innerHTML += `<li class="theDate taskItems OthertaskItems">${dateCreated}</li>`;
              }
            });
          });
        });
    });
  });
});

//items from loderless lists
const selectFolderless = document.querySelector("#selectFolderless");
selectFolderless.addEventListener("click", () => {
  const folderlessItems = document.querySelectorAll(".folderlessItems");
  Array.from(folderlessItems).forEach((folderlessItem) => {
    if (document.getElementById("selectFolderless").dataset.id != "") {
      return;
    }
    folderlessItem.addEventListener("click", () => {
      const list_id = folderlessItem.id;
      selectFolderless.dataset.id = list_id;
      const taskLists = document.querySelector("#taskLists");
      const dateList = document.querySelector("#dateList");
      const dueList = document.querySelector("#dueList");
      const priorityList = document.querySelector("#priorityList");
      taskLists.innerHTML = "";
      dateList.innerHTML = "";
      dueList.innerHTML = "";
      priorityList.innerHTML = "";
      let forSortList = document.getElementById("selectFolderless");
      forSortList.dataset.listId = list_id;
      fetch(
        `https://task-up-hosting.vercel.app/task/${list_id}/${access_token}`
      )
        .then((data) => data.json())
        .then((result) => {
          var array_items = document.querySelectorAll(".theTitle");
          if (array_items.length >= result.tasks.length) {
            return;
          }
          Array.from(result.tasks).forEach((task) => {
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
                  dueList.innerHTML += `<li class="theDue taskItems OthertaskItems" style="color:red">${dueDate}</li>`;
                } else {
                  if (dueDate_coming == "Invalid Date") {
                    dueDate_coming = "-";
                  }

                  dueList.innerHTML += `<li class="theDue taskItems OthertaskItems" style="color:green">${dueDate_coming}</li>`;
                }
                if (task.priority == null) {
                  priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems">${"--"}</li>`;
                } else if (task.priority.priority == "urgent") {
                  priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: red">${task.priority.priority}</li>`;
                } else if (task.priority.priority == "high") {
                  priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: yellow">${task.priority.priority}</li>`;
                } else if (task.priority.priority == "normal") {
                  priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: #6fddff">${task.priority.priority}</li>`;
                } else if (task.priority.priority == "low") {
                  priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: #d8d8d8">${task.priority.priority}</li>`;
                }

                taskLists.innerHTML += `<li class="theTitle taskItems taskNames" data-id="${task.id}"><label class="done">
                <input type="checkbox">
                <div class="checkmark"></div>
              </label>${task.name}</li>`;
                dateList.innerHTML += `<li class="theDate taskItems OthertaskItems">${dateCreated}</li>`;
              }
            });
          });
        });
    });
  });
});

//on pressing clear
const clean = document.querySelector("#clear");
clean.addEventListener("click", () => {
  var team_id = document.getElementById("workspace_title").dataset.id;
  fetch(
    `https://task-up-hosting.vercel.app/alltask/${team_id}/${access_token}`
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
      var array_items = document.querySelectorAll(".theTitle");
      if (array_items.length >= assignedArray.length) {
        return;
      }
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
          dueList.innerHTML += `<li class="theDue taskItems OthertaskItems" style="color:red">${dueDate}</li>`;
        } else {
          if (dueDate_coming == "Invalid Date") {
            dueDate_coming = "-";
          }

          dueList.innerHTML += `<li class="theDue taskItems OthertaskItems" style="color:green">${dueDate_coming}</li>`;
        }
        if (task.priority == null) {
          priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems">${"--"}</li>`;
        } else if (task.priority.priority == "urgent") {
          priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: red">${task.priority.priority}</li>`;
        } else if (task.priority.priority == "high") {
          priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: yellow">${task.priority.priority}</li>`;
        } else if (task.priority.priority == "normal") {
          priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: #6fddff">${task.priority.priority}</li>`;
        } else if (task.priority.priority == "low") {
          priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: #d8d8d8">${task.priority.priority}</li>`;
        }

        taskLists.innerHTML += `<li class="theTitle taskItems taskNames" data-id="${task.id}"><label class="done">
        <input type="checkbox">
        <div class="checkmark"></div>
      </label>${task.name}</li>`;
        dateList.innerHTML += `<li class="theDate taskItems OthertaskItems">${dateCreated}</li>`;
      });
    });
});

//default on load

fetch(`https://task-up-hosting.vercel.app/teams/${access_token}`)
  .then((data) => data.json())
  .then((result) => {
    const team_id = result.teams[0].id;

    fetch(
      `https://task-up-hosting.vercel.app/alltask/${team_id}/${access_token}`
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
        var array_items = document.querySelectorAll(".theTitle");
        if (array_items.length >= assignedArray.length) {
          return;
        }
        taskLists.innerHTML = "";
        dateList.innerHTML = "";
        dueList.innerHTML = "";
        priorityList.innerHTML = "";
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
            dueList.innerHTML += `<li class="theDue taskItems OthertaskItems" style="color:red">${dueDate}</li>`;
          } else {
            if (dueDate_coming == "Invalid Date") {
              dueDate_coming = "-";
            }

            dueList.innerHTML += `<li class="theDue taskItems OthertaskItems" style="color:green">${dueDate_coming}</li>`;
          }
          if (task.priority == null) {
            priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems">${"--"}</li>`;
          } else if (task.priority.priority == "urgent") {
            priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: red">${task.priority.priority}</li>`;
          } else if (task.priority.priority == "high") {
            priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: yellow">${task.priority.priority}</li>`;
          } else if (task.priority.priority == "normal") {
            priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: #6fddff">${task.priority.priority}</li>`;
          } else if (task.priority.priority == "low") {
            priorityList.innerHTML += `<li class="thePriority taskItems OthertaskItems" style="font-weight: bolder; color: #d8d8d8">${task.priority.priority}</li>`;
          }

          taskLists.innerHTML += `<li class="theTitle taskItems taskNames" data-id="${task.id}"><label class="done">
          <input type="checkbox">
          <div class="checkmark"></div>
        </label>${task.name}</li>`;
          dateList.innerHTML += `<li class="theDate taskItems OthertaskItems">${dateCreated}</li>`;
        });
        document.getElementById("toolTip").classList.remove("hide");
      });
  });

//default on load ends here and now?

//fixing bug for quick click
let downIcon = document.querySelector("#dropdown-icon");
downIcon.addEventListener("click", () => {
  let workspaceItems = document.querySelectorAll(".workspace_item_title");
  Array.from(workspaceItems).forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => {
        let selectSpace = document.querySelector(".selectSpace");
        selectSpace.classList.remove("wait");
      }, 1200);
    });
  });
});

document.querySelector(".selectSpace").addEventListener("click", () => {
  let spaceItems = document.querySelectorAll(".spaceItems");
  Array.from(spaceItems).forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => {
        let selectFolder = document.querySelector(".selectFolder");
        selectFolder.classList.remove("wait");
      }, 1200);
      setTimeout(() => {
        let selectFolderLess = document.querySelector(".selectFolderless");
        selectFolderLess.classList.remove("wait");
      }, 1200);
    });
  });
});

document.querySelector(".selectFolder").addEventListener("click", () => {
  let folderItems = document.querySelectorAll(".folderItems");
  Array.from(folderItems).forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => {
        let selectList = document.querySelector(".selectList");
        selectList.classList.remove("wait");
      }, 1200);
    });
  });
});

document.querySelector(".selectList").addEventListener("click", () => {
  let listItems = document.querySelectorAll(".listItems");
  Array.from(listItems).forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => {
        let selectAssignee = document.querySelector(".selectAssignee");
        selectAssignee.classList.remove("wait");
      }, 1200);
    });
  });
});
document.querySelector(".selectList").addEventListener("click", () => {
  let listItems = document.querySelectorAll(".listItems");
  Array.from(listItems).forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => {
        document.querySelector(".enterTaskName").classList.remove("wait");

        document.querySelector(".enterTaskDesc").classList.remove("wait");
      }, 500);
    });
  });
});

document.querySelector(".selectFolderless").addEventListener("click", () => {
  let folderlessItems = document.querySelectorAll(".folderlessItems");
  Array.from(folderlessItems).forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => {
        let selectAssignee = document.querySelector(".selectAssignee");
        selectAssignee.classList.remove("wait");
      }, 1200);
    });
  });
});

document.querySelector(".selectFolderless").addEventListener("click", () => {
  let folderlessItems = document.querySelectorAll(".folderlessItems");
  Array.from(folderlessItems).forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => {
        document.querySelector(".enterTaskName").classList.remove("wait");

        document.querySelector(".enterTaskDesc").classList.remove("wait");
      }, 500);
    });
  });
});
