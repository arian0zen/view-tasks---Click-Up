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
console.log(access_token);
const logout = document.getElementById("logout");
logout.addEventListener("click", () =>{
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
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
    console.log(result.teams[0]);
    document.getElementById("workspace_title").innerHTML = result.teams[0].name;
    let space_list = document.getElementById("menu-bar");
    console.log(space_list);

    Array.from(result.teams).forEach((team) => {
      console.log(team.name);
      space_list.innerHTML += `<li class="workspace_item">
      <a href="#">
        <div class="">
        <img src="${team.avatar}" alt=""  class="icon"/>
        </div>
        <p class="workspace_item_title">${team.name}</p>
      </a>
    </li>`;
    });
  });
