

document.querySelector(".selectList").addEventListener("click", () => {
    let listItems = document.querySelectorAll(".listItems");
    let assigneeList = document.querySelector("#assigneeList");
    Array.from(listItems).forEach((item) => {
      item.addEventListener("click", () => {
        fetch(
            `https://task-up-hosting.vercel.app/listmembers/${item.id}/${access_token}`
          )
            .then((data) => data.json())
            .then((result) => {
                var array_items = document.querySelectorAll(".assigneeItem");
                if (array_items.length >= result.members.length) {
                  return;
                }
                Array.from(result.members).forEach((member)=>{
                    assigneeList.innerHTML += `<li class="assigneeItem" id="${member.id}"><label class="done">
                    <input type="checkbox">
                    <div class="checkmark checkmark_small"></div>
                  </label>${member.username}</li>`;


                })
            });
      });
    });
  });

  
document.querySelector(".selectFolderless").addEventListener("click", () => {
    let folderlessItems = document.querySelectorAll(".folderlessItems");
    let assigneeList = document.querySelector("#assigneeList");
    Array.from(folderlessItems).forEach((item) => {
      item.addEventListener("click", () => {
        fetch(
            `https://task-up-hosting.vercel.app/listmembers/${item.id}/${access_token}`
          )
            .then((data) => data.json())
            .then((result) => {
                var array_items = document.querySelectorAll(".assigneeItem");
                if (array_items.length >= result.members.length) {
                  return;
                }
                Array.from(result.members).forEach((member)=>{
                    assigneeList.innerHTML += `<li class="assigneeItem" id="${member.id}"><label class="done">
                    <input type="checkbox">
                    <div class="checkmark checkmark_small"></div>
                  </label>${member.username}</li>`;


                })
            });
      });
    });
  });




const addTask = document.querySelector('#taskAdding');
addTask.addEventListener('click', (e) => {
    e.preventDefault();

    const dueDate = (document.querySelector('#dueDatePick').valueAsNumber);
    const assignedItems = (document.querySelectorAll(".assigneeItem"));
    var assigneedArray = [];
    Array.from(assignedItems).forEach((person)=>{
        if(person.firstElementChild.firstElementChild.checked== true){
            assigneedArray.push(person.id);
        }
    });
    var priority = (document.querySelector("#selectImpt").dataset.id);
    if(priority == ""){
      priority = "4"
    }
    const taskName = document.querySelector(".enterTaskName").value;
    const taskDesc = document.querySelector(".enterTaskDesc").value;
    var listIdOg = document.querySelector("#selectList").dataset.id || "";
    var listIdFolderless = (document.querySelector("#selectFolderless").dataset.id) || ("");
    var listId = listIdOg;
    if (listIdOg == ""){
        listId = listIdFolderless;
    }
    if(taskName == ""){
        return;
    }

    fetch(`https://task-up-hosting.vercel.app/addtask/${access_token}/${listId}/${taskName}?description=${taskDesc}&due_date=${dueDate}&assignees=[${assigneedArray}]&priority=${priority}`)
    .then((data)=> data.json())
    .then((result)=>{
        if(result.response.err){
          new Notify ({
            title: 'Can not add task',
            text: result.response.err,
            status: 'error',
            autoclose: true,
            autotimeout: 2000,
            speed: 200, //,
            showCloseButton: true,
            showIcon: true,
            position: 'right top'
        })
        } else{
          new Notify ({
            title: 'Added Succesfully',
            text: `task: ${result.response.name} added `,
            status: 'success',
            autoclose: true,
            autotimeout: 3000,
            speed: 200, //,
            showCloseButton: true,
            showIcon: true,
            position: 'right top'
        })
        document.querySelector('.enterTaskName ').value = '';
        document.querySelector('.enterTaskDesc ').value = '';

        }
    })


    
});

//locak/addtask/pk_61229302_4FI62MB2376DAN5OBYHCLK3JTHNL9WQK/199312748/from%20the%20my%20own%20server?description=nothing%20available%20at%20the%20moment&due_date=1888888888888&assignees=[61229302]