var linkSpace = $("#selectSpace");
var listSpace = $(".spaceList");
$(".selectSpace").click(function (e) {
  e.preventDefault();
  listSpace.slideToggle(200);
  listSpace.find("li").click(function () {
    var text = $(this).html();
    var icon = '<i class="downIcon fa fa-chevron-down"></i>';
    linkSpace.html(text + icon);
    listSpace.slideUp(200);
  });
});

var listFolder = $(".folderList");
var linkFolder = $("#selectFolder");
$(".selectFolder").click(function(e) {
  e.preventDefault();
  listFolder.slideToggle(200);
  listFolder.find("li").click(function () {
    var text = $(this).html();
    var icon = '<i class="downIcon fa fa-chevron-down"></i>';
    linkFolder.html(text + icon);
    listFolder.slideUp(200);
  });
});



var listList = $(".listList");
var linkList = $("#selectList");
$(".selectList").click(function(e){
  e.preventDefault();

  listList.slideToggle(200);
  listList.find("li").click(function () {
    var text = $(this).html();
    var icon = '<i class="downIcon fa fa-chevron-down"></i>';
    linkList.html(text + icon);
    listList.slideUp(200);
  });

});