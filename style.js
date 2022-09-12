var linkSpace = $("#selectSpace");
var listSpace = $(".spaceList");
$(".selectSpace").click(function (e) {
  e.preventDefault();
  listSpace.slideToggle(200);
  listSpace.find("li").click(function () {
    var text = $(this).html();
    text = text.substring(0, 15) + "...";
    var icon = '<i class="downIcon fa fa-chevron-down"></i>';
    linkSpace.html(text + icon);
    listSpace.slideUp(200);
  });
});

var listFolder = $(".folderList");
var linkFolder = $("#selectFolder");
$(".selectFolder").click(function (e) {
  e.preventDefault();
  listFolder.slideToggle(200);
  listFolder.find("li").click(function () {
    var text = $(this).html();
    text = text.substring(0, 15) + "...";
    var icon = '<i class="downIcon fa fa-chevron-down"></i>';
    linkFolder.html(text + icon);
    listFolder.slideUp(200);
  });
});

var listList = $(".listList");
var linkList = $("#selectList");
$(".selectList").click(function (e) {
  e.preventDefault();

  listList.slideToggle(200);
  listList.find("li").click(function () {
    var text = $(this).html();
    var id = $(this).attr("id");
    text = text.substring(0, 15) + "...";
    var icon = '<i class="downIcon fa fa-chevron-down"></i>';
    linkList.html(text + icon);
    linkList.attr("data-id", id);
    listList.slideUp(200);
  });
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  document.querySelector(
    "#selectSpace"
  ).innerHTML = `Select space <i class="downIcon fa fa-chevron-down"></i>`;

  document.querySelector(
    "#selectFolder"
  ).innerHTML = `Select folder <i class="downIcon fa fa-chevron-down"></i>`;

  document.querySelector(
    "#selectList"
  ).innerHTML = `Select list <i class="downIcon fa fa-chevron-down"></i>`;
  const taskLists = document.querySelector("#taskLists");
  const dateList = document.querySelector("#dateList");
  const dueList = document.querySelector("#dueList");
  const priorityList = document.querySelector("#priorityList");
  taskLists.innerHTML = '';
  dateList.innerHTML = ''; 
  dueList.innerHTML = ''; 
  priorityList.innerHTML = '';
});

const viewTasks = document.querySelector(".view_tasks");
const addTasks = document.querySelector(".add_tasks");
const mainTasks = document.querySelector(".mainTasks");
viewTasks.addEventListener("click", () => {
  viewTasks.classList.add("view_tasks_active");
  addTasks.classList.remove("add_tasks_active");
  mainTasks.classList.remove("mainTasks_hidden");
});

addTasks.addEventListener("click", () => {
  addTasks.classList.add("add_tasks_active");
  viewTasks.classList.remove("view_tasks_active");
  mainTasks.classList.add("mainTasks_hidden");

});

