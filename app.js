function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
      access_token = access_token.split("=");
      access_token = access_token[1];
      console.log(access_token);
      if (access_token != "" && access_token != null) {
        setCookie("token", access_token, 365);
      }
    });
  }
}

window.onload = () => {
  checkCookie();
};
const access_token = document.cookie.split("=")[1];
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

fetch(`https://obscure-reef-59139.herokuapp.com/teams/${access_token}`)
  .then((data) => data.json())
  .then((result) => {
    let space_list = document.getElementById("menu-bar");

    Array.from(result.teams).forEach((team) => {
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
    if (document.getElementById("workspace_title").dataset.id != ''){
      return;
    }

    item.addEventListener("click", () => {
      menuWrapper.classList.remove("wrapper-show");
      document.getElementById("workspace_title").innerText =
        item.children[0].children[1].innerText;

      document.getElementById("workspace_picture").src =
        item.children[0].children[0].children[0].src;

      var team_id = item.children[0].children[1].id
      document.getElementById("workspace_title").dataset.id = team_id;
      // console.log(document.getElementById("workspace_title").dataset.id);

      const spaceList = document.querySelector("#spaceList");
      spaceList.innerHTML = '';
      fetch(`https://obscure-reef-59139.herokuapp.com/spaces/${team_id}/${access_token}`)
      .then((data) => data.json())
      .then((result) => {
        var array_items = document.querySelectorAll(".spaceItems");
        if (array_items.length >= result.spaces.length){console.log("spaces.length exceeded");
          return;
        }
        
        Array.from(result.spaces).forEach((space)=>{
          
          spaceList.innerHTML +=  `<li class="spaceItems" id="${space.id}">${space.name}</li>`
          array = document.querySelectorAll(".spaceItems")
        })
    
      })

    });
  });
};


const selectSpace = document.querySelector("#selectSpace");
selectSpace.addEventListener("click", ()=>{
  const spaceItems = document.querySelectorAll(".spaceItems");
  Array.from(spaceItems).forEach(spaceItem =>{
    if (document.getElementById("selectSpace").dataset.id != ''){
      return;
    }
    spaceItem.addEventListener("click", ()=>{
      console.log("Space Item Clicked");
      const space_id = spaceItem.id;
      selectSpace.dataset.id = spaceItem.id;
      const folderList = document.querySelector("#folderList");
      // folderList.innerHTML = '';
      fetch(`https://obscure-reef-59139.herokuapp.com/folder/${space_id}/${access_token}`)
      .then((data) => data.json())
      .then((result) => {
        var array_items = document.querySelectorAll(".folderItems");
        if (array_items.length >= result.folders.length){
          console.log("spaces.length exceeded");
          return;
        }


        Array.from(result.folders).forEach((folder)=>{
          
          folderList.innerHTML +=  `<li class="folderItems" id="${folder.id}">${folder.name}</li>`
        })
    
      })
    });
  })
});


const selectFolder = document.querySelector('#selectFolder');
selectFolder.addEventListener("click", () => {
  const folderItems = document.querySelectorAll('.folderItems');
  
  Array.from(folderItems).forEach(folderItem => {
    if (document.getElementById("selectFolder").dataset.id != ''){
      console.log("Selecting blah blash");
      return;
    }
    folderItem.addEventListener("click", () => {
      const folder_id = folderItem.id;
      selectFolder.dataset.id = folderItem.id;
      const listList = document.querySelector('#listList')
      // listList.innerHTML = '';
      fetch(`https://obscure-reef-59139.herokuapp.com/list/${folder_id}/${access_token}`)
      .then((data) => data.json())
      .then((result) => {
        var array_items = document.querySelectorAll(".listItems");
        if (array_items.length >= result.lists.length){
          console.log("spaces.length exceeded");
          return;
        }

        Array.from(result.lists).forEach((list)=>{
          
          listList.innerHTML +=  `<li class="listItems" id="${list.id}">${list.name}</li>`
        })
    
      })
    })
  })
});

const selectList = document.querySelector("#selectList");
selectList.addEventListener("click", ()=>{
  const listItems = document.querySelectorAll(".listItems");
  Array.from(listItems).forEach((listItem)=>{
    if (document.getElementById("selectList").dataset.id != ''){
      return;
    }
    listItem.addEventListener("click", ()=>{
      const list_id = listItem.id;
      selectList.dataset.id = list_id;
      const taskLists = document.querySelector("#taskLists");
      const dateList = document.querySelector("#dateList");
      const dueList = document.querySelector("#dueList");
      const priorityList = document.querySelector("#priorityList");
      taskLists.innerHTML = '';
      dateList.innerHTML = ''; 
      dueList.innerHTML = ''; 
      priorityList.innerHTML = '';
      fetch(`https://obscure-reef-59139.herokuapp.com/task/${list_id}/${access_token}`)
      .then((data) => data.json())
      .then((result)=>{
        var array_items = document.querySelectorAll('.theTitle');
        if(array_items.length >= result.tasks.length){
          console.log("i am exceeding");
          return;
        }
        Array.from(result.tasks).forEach((task)=>{
          var dateCreated = new Date(parseInt(task.date_created)).toLocaleDateString('en-US', {timeZone: 'Asia/Kolkata'});

          var dueDate = new Date(parseInt(task.due_date)).toLocaleDateString('en-US', {timeZone: 'Asia/Kolkata'});
          if (dueDate == "Invalid Date"){
            dueDate = "-"
          }
          if(parseInt(task.due_date) < Date.now()){
            dueList.innerHTML += `<li class="theDue taskItems" style="color:red">${dueDate}</li>`
          } else{
              dueList.innerHTML += `<li class="theDue taskItems">${dueDate}</li>`
          }
          if(task.priority == null){
            priorityList.innerHTML += `<li class="thePriority taskItems">${"well, no rush"}</li>`
          } else{
            
          priorityList.innerHTML += `<li class="thePriority taskItems" style="font-weight: bolder">${task.priority.priority}</li>`
          }



          taskLists.innerHTML += `<li class="theTitle taskItems">${task.name}</li>`
          dateList.innerHTML += `<li class="theDate taskItems">${dateCreated}</li>`




        })
      })
    });
  })
});







