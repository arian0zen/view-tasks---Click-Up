const btnDrop = document.querySelector("#dropdown-icon");
const menuWrapper = document.querySelector(".wrapper");

const menuBar = document.querySelector(".menu-bar");


btnDrop.onclick = () => {
  menuWrapper.classList.toggle("wrapper-show");
  const workspace_item = document.getElementsByClassName("workspace_item");
  Array.from(workspace_item).forEach((item)=>{
    item.addEventListener("click", () => {
        menuWrapper.classList.remove("wrapper-show");
        document.getElementById("workspace_title").innerText = item.children[0].children[1].innerText;
    });
});
};

