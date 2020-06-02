const dateArea= document.querySelector('#date');
const timeArea=document.querySelector("#time");
const form=document.querySelector("#task-form");
const input=document.querySelector("#task-input");
const taskList=document.querySelector(".task-collection");

setEventListeners();

function setEventListeners(){
    document.addEventListener('DOMContentLoaded', loadDateTime);
    form.addEventListener('submit', addNewTask);
    taskList.addEventListener('click', removeTask);

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
    }

    let li= document.createElement('li');
    li.className='task-item';
    li.appendChild(document.createTextNode(input.value));
    let link= document.createElement('a');
    link.className='delete-item';
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    console.log(li);
    taskList.appendChild(li);
    input.value='';

    event.preventDefault();
   
}

//REMOVE TASK

function removeTask(event){
    if(event.target.classList.contains('fa-remove')){
        if(confirm('Are you sure you want to delete this task?')){
            event.target.parentElement.parentElement.remove();
        }
    }
}

