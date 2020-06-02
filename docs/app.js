const dateArea= document.querySelector('#date');
const timeArea=document.querySelector("#time");
const form=document.querySelector("#task-form");
const input=document.querySelector("#task-input");
const taskList=document.querySelector(".task-collection");
const clearButton=document.querySelector("#clear-btn");
const chosenTaskArea=document.querySelector("#chosen-task");


setEventListeners();

function setEventListeners(){
    document.addEventListener('DOMContentLoaded', loadDateTime);
    form.addEventListener('submit', addNewTask);
    taskList.addEventListener('click', taskListClick);
    clearButton.addEventListener('click', clearTasks);

}

//LOAD DATE AND TIME

function loadDateTime(){
    let date= new Date();
    let hours= date.getHours();
    let minutes= date.getMinutes();
    minutes= checkTime(minutes);
    hours= checkTime(hours);
    let time= hours + ":" + minutes;
    date= date.toDateString();

    dateArea.innerHTML= date;
    timeArea.innerHTML=time;

    t=setTimeout(function(){
        loadDateTime();
    }, 500);
    
}

function checkTime(i){
    if(i <10){
        i= "0" + i;
    }
    return i;
}

///ADD NEW TASK

function addNewTask(event){
    if(input.value===""){
        alert("Enter a task!");
    } else {
        let li= document.createElement('li');
        li.className='task-item';
        let p=document.createElement('p');
        p.appendChild(document.createTextNode(input.value));
        li.appendChild(p);
        let chooseBtn= document.createElement('button');
        chooseBtn.className='choose-btn';
        chooseBtn.appendChild(document.createTextNode('Work!'));
        li.appendChild(chooseBtn);
        let link= document.createElement('a');
        link.className='delete-item';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
        input.value='';
    }
    event.preventDefault();
}

//TASK LIST CLICKS
//REMOVE TASK
//CHOOSE TASK

function taskListClick(event){
    if(event.target.classList.contains('fa-remove')){
        if(confirm('Are you sure you want to delete this task?')){
            event.target.parentElement.parentElement.remove();
        }
    }
    if(event.target.classList.contains("choose-btn")){
        if(chosenTaskArea.firstChild){
            chosenTaskArea.firstChild.remove();
        }
        let chosenTaskText= event.target.parentElement.firstChild.firstChild.textContent;
        chosenTaskArea.appendChild(document.createTextNode(chosenTaskText));
    }
    
}

//CLEAR TASKS

function clearTasks(event){
    if(confirm("Are you sure you want to clear all the tasks from your list?")){
        while(taskList.firstChild){
            taskList.firstChild.remove();
        }
    }
}

//CHOOSE TASK{
function chooseTask(event){
    alert("YOu CHOOSE!");
}