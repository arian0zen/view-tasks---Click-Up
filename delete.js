const deleteTask = document.getElementById("toolTip");
deleteTask.addEventListener("click", ()=>{
    console.log("please deleet menuWrapper");
    const tasks = document.querySelectorAll(".theTitle");
    Array.from(tasks).forEach((task)=>{
        if(task.firstElementChild.firstElementChild.checked== true){
            const deletableId = task.dataset.id;
            fetch(`https://obscure-reef-59139.herokuapp.com/deleteTask/${deletableId}/${access_token}`)
            .then((data) => data.json())
            .then((result) =>{
             })
            .then((data) =>{
                new Notify ({
                    title: 'Deleted',
                    text: `Selected tasks deleted successfully`,
                    status: 'warning',
                    autoclose: true,
                    autotimeout: 3000,
                    speed: 200, //,
                    showCloseButton: true,
                    showIcon: true,
                    position: 'right top'
                })
                location.reload();
            })
            
            
        }
    })
})

