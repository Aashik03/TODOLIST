const newtask=document.getElementById("newtask");
const taskContainer=document.getElementById("taskContainer");

taskContainer.innerHTML=`<h2 id="noTasksMsg">Yayy! You are all caught up !</h2>`;

document.addEventListener("DOMContentLoaded",function(){
    const audio=document.getElementById("bgMusic");

    document.body.addEventListener("click",function(){
        if(audio.paused){
            audio.play();
        }
    });
});

//new task event listener
newtask.addEventListener("click",()=>{
    const noTasksmsg=document.getElementById("noTasksMsg");
    if(noTasksmsg) noTasksmsg.remove();

    //create a new div for the task
    const newTaskDiv=document.createElement("div");
    newTaskDiv.classList.add("task");

    //create a new text input
    const text=document.createElement("input");
    text.type="text";
    text.title="taskname";
    taskContainer.classList.add("task-input");

    //create a submit button
    const submitBtn=document.createElement("button");
    submitBtn.textContent="Add";
    submitBtn.classList.add("add-btn");

    //handle adding task
    function addTask(){
        if(text.value.trim()===""){
            taskContainer.removeChild(newTaskDiv);
            return;
        }
        //create label and remove input field
        const label=document.createElement("span");
        label.textContent=text.value;
        label.classList.add("task-text");

        //create a delete button
        const deleteBtn=document.createElement("button");
        deleteBtn.textContent="Done";
        deleteBtn.classList.add("delete-btn");     
        
        deleteBtn.addEventListener("click",()=>{
            taskContainer.removeChild(newTaskDiv);
            checkIfEmpty();
        });

        //replace input and button with label and delete button
        newTaskDiv.innerHTML="";
        newTaskDiv.appendChild(label);
        newTaskDiv.appendChild(deleteBtn);

        //save task to local storage
        saveTaskToLocalStorage(text.value);

        checkIfEmpty();
    }
        
        //event listener for submit button
        submitBtn.addEventListener("click",addTask);

        //remove input if user clicks outside without entering text
        text.addEventListener("blur",()=>{
            if(text.value.trim()===""){
                taskContainer.removeChild(newTaskDiv);
            }
            checkIfEmpty();
        });

    // Append elements
    newTaskDiv.appendChild(text);
    newTaskDiv.appendChild(submitBtn);
    taskContainer.appendChild(newTaskDiv);

    text.focus();
});

function checkIfEmpty(){
    if(taskContainer.children.length===0){
        taskContainer.innerHTML=`<h2 id="noTasksMsg">Yayy! You are all caught up !</h2>`;
    }
}