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
    item.addEventListener("click", () => {
      menuWrapper.classList.remove("wrapper-show");
      document.getElementById("workspace_title").innerText =
        item.children[0].children[1].innerText;

      document.getElementById("workspace_picture").src =
        item.children[0].children[0].children[0].src;
      var team_id = item.children[0].children[1].id;

      fetch(
        `https://obscure-reef-59139.herokuapp.com/spaces/${team_id}/${access_token}`
      )
        .then((data) => data.json())
        .then((result) => {
          document.getElementById(
            "selectSpace"
          ).innerHTML = `${result.spaces[0].name}<i class="downIcon fa fa-chevron-down"></i>`;
          const spacedrop = document.getElementById("spaceList");
          spacedrop.innerHTML = "";

          Array.from(result.spaces).forEach((space) => {
            spacedrop.innerHTML += `<li class="spaceItems">${space.name}</li>`;

            const space_id = space.id;
            fetch(
              `https://obscure-reef-59139.herokuapp.com/folder/${space_id}/${access_token}`
            )
              .then((data) => data.json())
              .then((result) => {
                const folderdrop = document.getElementById("folderList");
                const listdrop = document.getElementById("listList");
                document.getElementById(
                  "selectFolder"
                ).innerHTML = `${result.folders[0].name}<i class="downIcon fa fa-chevron-down"></i>`;
                Array.from(result.folders).forEach((folder) => {
                  folderdrop.innerHTML += `<li class="spaceItems">${folder.name}</li>`;
                  Array.from(folder.lists).forEach((list) => {
                    listdrop.innerHTML += `<li class="spaceItems">${list.name}</li>`;
                  });
                });
              });
          });
        });
    });
  });
};

const workspace_item = document.getElementsByClassName("workspace_item");
Array.from(workspace_item).forEach((item)=>{
  const folderdrop = document.getElementById("folderList");
  const listdrop = document.getElementById("listList");
  folderdrop.innerHTML = '';
  listdrop.innerHTML ='';
})