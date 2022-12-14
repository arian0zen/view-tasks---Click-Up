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

var listAssignee = $(".assigneeList");
var linkAssignee = $("#selectAssignee");
$(".selectAssignee").click(function (e) {
  e.preventDefault();
  listAssignee.slideToggle(200);
  listAssignee.find("li").click(function () {
    var id = $(this).attr("id");
    linkAssignee.attr("data-id", id);
  });
});

var listPriority = $(".imptList");
var linkPriority = $("#selectImpt");
$(".selectImpt").click(function (e) {
  e.preventDefault();
  listPriority.slideToggle(200);
  listPriority.find("li").click(function () {
    var text = $(this).html();
    var id = $(this).attr("id");
    text = text.substring(0, 15) + "...";
    var icon = '<i class="downIcon fa fa-chevron-down"></i>';
    linkPriority.html(text + icon);
    linkPriority.attr("data-id", id);
    listPriority.slideUp(200);
  });
});





var folderlesslistList = $(".folderlesslistList");
var linkfolderlessList = $("#selectFolderless");
$(".selectFolderless").click(function (e) {
  e.preventDefault();

  folderlesslistList.slideToggle(200);
  folderlesslistList.find("li").click(function () {
    var text = $(this).html();
    var id = $(this).attr("id");
    text = text.substring(0, 15) + "...";
    var icon = '<i class="downIcon fa fa-chevron-down"></i>';
    linkfolderlessList.html(text + icon);
    linkfolderlessList.attr("data-id", id);
    folderlesslistList.slideUp(200);
  });
});

$(".waitAdd").hover(()=>{
  $(this).attr("placeholder", "i d k");
})

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  document.querySelector(
    "#selectSpace"
  ).innerHTML = `Select space <i class="downIcon fa fa-chevron-down"></i>`;

  document.querySelector(
    "#selectFolder"
  ).innerHTML = `Select folder <i class="downIcon fa fa-chevron-down"></i>`;
  document.querySelector(
    "#selectFolder"
  ).dataset.id = '';
  document.querySelector(
    "#selectList"
  ).innerHTML = `Select list <i class="downIcon fa fa-chevron-down"></i>`;
  document.querySelector(
    "#selectList"
  ).dataset.id = '';
  document.querySelector(
    "#selectFolderless"
  ).innerHTML = `Folderless List <i class="downIcon fa fa-chevron-down"></i>`;
  document.querySelector(
    "#selectFolderless"
  ).dataset.id = '';
  const taskLists = document.querySelector("#taskLists");
  const dateList = document.querySelector("#dateList");
  const dueList = document.querySelector("#dueList");
  const priorityList = document.querySelector("#priorityList");
  taskLists.innerHTML = '';
  dateList.innerHTML = ''; 
  dueList.innerHTML = ''; 
  priorityList.innerHTML = '';
  const folderList = document.querySelector("#folderList");
  folderList.innerHTML = '';
  const listList = document.querySelector("#listList");
  listList.innerHTML = '';
  const folderlesslistList = document.querySelector("#folderlesslistList");
  folderlesslistList.innerHTML = ''; 
});

const viewTasks = document.querySelector(".view_tasks");
const addTasks = document.querySelector(".add_tasks");
const mainTasks = document.querySelector(".mainTasks");
const mainaddTask = document.querySelector(".mainaddTask");
viewTasks.addEventListener("click", () => {
  viewTasks.classList.add("view_tasks_active");
  addTasks.classList.remove("add_tasks_active");
  mainTasks.classList.remove("mainTasks_hidden");
  mainaddTask.classList.add("add_tasksHidden");

});

addTasks.addEventListener("click", () => {
  addTasks.classList.add("add_tasks_active");
  viewTasks.classList.remove("view_tasks_active");
  mainTasks.classList.add("mainTasks_hidden");
  mainaddTask.classList.remove("add_tasksHidden");

});



//add tasks buttons style
