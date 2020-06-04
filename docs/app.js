const dateArea = document.querySelector('#date');
const timeArea = document.querySelector("#time");
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector(".task-collection");
const clearButton = document.querySelector("#clear-btn");
const chosenTaskArea = document.querySelector("#chosen-task");
const timerForm = document.querySelector("#timer-form");
const timeInput = document.querySelector("#input-time");
const countdownArea = document.querySelector('#countdown');
let secondsLeft;
let timerOn = false;
const pauseButton = document.querySelector("#pause-btn");
const finishedPromptBox = document.querySelector("#finished-prompt");
const yesButton = document.querySelector(".yes-btn");
const noButton = document.querySelector(".no-btn");
const completedCollection = document.querySelector(".completed-collection");
const clearCompletedButton = document.querySelector("#clear-completed");
const catDiv= document.querySelector("#cat-div");



setEventListeners();

function setEventListeners() {
    document.addEventListener('DOMContentLoaded', loadCompletedTasks);
    document.addEventListener('DOMContentLoaded', loadDateTime);
    document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
    document.addEventListener('DOMContentLoaded', loadCurrentTaskFromLocalStorage);
    form.addEventListener('submit', addNewTask);
    taskList.addEventListener('click', taskListClick);
    clearButton.addEventListener('click', clearTasks);
    timerForm.addEventListener('submit', startTimer);
    pauseButton.addEventListener('click', pauseRestartTimer);
    yesButton.addEventListener('click', finishTask);
    noButton.addEventListener('click', returnToTimer);
    clearCompletedButton.addEventListener('click', clearCompletedTasks);

}




//LOAD DATE AND TIME

function loadDateTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amPM= 'AM';
    minutes = checkTime(minutes);
    hours = checkTime(hours);
    if(hours> 12){
        hours=hours-12;
        amPM= "PM";
    }
    let time = hours + ":" + minutes + " " + amPM;
    date = date.toDateString();

    dateArea.innerHTML = date;
    timeArea.innerHTML = time;

    t = setTimeout(function () {
        loadDateTime();
    }, 500);

}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

///ADD NEW TASK

function addNewTask(event) {
    if (input.value === "") {
        alert("Enter a task!");
    } else {
        let li = document.createElement('li');
        li.className = 'task-item';
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(input.value));
        li.appendChild(p);
        let chooseBtn = document.createElement('button');
        chooseBtn.className = 'choose-btn';
        chooseBtn.appendChild(document.createTextNode('Work!'));
        li.appendChild(chooseBtn);
        let link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
        storeTaskInLocalStorage(input.value);
        input.value = '';
    }
    event.preventDefault();
}

///LOCAL STORAGE
function loadTasksFromLocalStorage() {
    if (localStorage.getItem('tasks') !== null) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function (task) {
            let li = document.createElement('li');
            li.className = 'task-item';
            let p = document.createElement('p');
            p.appendChild(document.createTextNode(task));
            li.appendChild(p);
            let chooseBtn = document.createElement('button');
            chooseBtn.className = 'choose-btn';
            chooseBtn.appendChild(document.createTextNode('Work!'));
            li.appendChild(chooseBtn);
            let link = document.createElement('a');
            link.className = 'delete-item';
            link.innerHTML = '<i class="fa fa-remove"></i>';
            li.appendChild(link);
            taskList.appendChild(li);
        })
    }
}
function loadCurrentTaskFromLocalStorage(){
    if(localStorage.getItem('current task')){
        chosenTaskArea.append(document.createTextNode(localStorage.getItem('current task')));      
    }   
}

function storeCurrentTaskInLocalStorage(task){
    localStorage.setItem('current task', task);
}
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function (task, index) {
        if (taskToRemove === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
    if(localStorage.getItem('current task')=== taskToRemove){
        localStorage.removeItem('current task');
        chosenTaskArea.textContent='';
    }
}

function removeAllTasksFromLocalStorage() {
    localStorage.clear('tasks');
}

function addCompletedTaskToLocalStorage(taskToAdd){
    let completedTasks;
    if(!localStorage.getItem('completed')){
        completedTasks=[];
    } else{
        completedTasks=JSON.parse(localStorage.getItem('completed')); ///START HERE!
    }

    completedTasks.push(taskToAdd);
    localStorage.setItem('completed', JSON.stringify(completedTasks));
}

function loadCompletedTasks(){
    if(localStorage.getItem('completed')){
        let completedTasks=JSON.parse(localStorage.getItem('completed'));

        completedTasks.forEach(function(task){
            let li=document.createElement('li');
            li.appendChild(document.createTextNode(task));
            completedCollection.appendChild(li);
        })
    }
}

function clearCompletedTasksFromLocalStorage(){
    localStorage.setItem('completed', '');
}

//TASK LIST CLICKS
//REMOVE TASK
//CHOOSE TASK

function taskListClick(event) {
    if (event.target.classList.contains('fa-remove')) {
        if (confirm('Are you sure you want to delete this task?')) {
            event.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(event.target.parentElement.parentElement.firstChild.textContent);
        }
    }
    if (event.target.classList.contains("choose-btn")) {
        if (chosenTaskArea.firstChild) {
            chosenTaskArea.firstChild.remove();
        }
        let chosenTaskText = event.target.parentElement.firstChild.firstChild.textContent;
        chosenTaskArea.appendChild(document.createTextNode(chosenTaskText));
        storeCurrentTaskInLocalStorage(chosenTaskText);
    }

}

//CLEAR TASKS

function clearTasks(event) {
    if (confirm("Are you sure you want to clear all the tasks from your list?")) {
        while (taskList.firstChild) {
            taskList.firstChild.remove();
        }
        removeAllTasksFromLocalStorage();
    }
}

function clearCompletedTasks(event) {
    if (confirm("Are you sure you want to clear all the tasks from your list?")) {
        while (completedCollection.firstChild) {
            completedCollection.firstChild.remove();
        }
        clearCompletedTasksFromLocalStorage();
    }
}


//TIMERS

function startTimer(event, seconds) {
    let parsedInput=parseFloat(timeInput.value);

    if(chosenTaskArea.firstChild === null){
        alert("Choose a task to work on!");
    } else if (timeInput.value === '' && !timerOn) {
        alert("Enter the number of minutes!");
    } else if(!parsedInput || parsedInput <= 0 && !timerOn) {
        alert("Enter a valid number!");
        timeInput.value='';
    } else {
        if(event !== undefined && !seconds){
            timerOn = true;
        }  
    }

            if (timerOn) {
                if (secondsLeft <0) {
                    alert("You finished!");
                    timeInput.value = '';
                    timerOn=false;
                    secondsLeft=1; //so that it automatically doesn't get back in here if you turn the timer on again on the same task
                    countdownArea.firstChild.textContent='';
                    return finishedPrompt();
                } else if (seconds === undefined && event !== null) {
                    secondsLeft = timeInput.value * 60;
                    event.preventDefault();
                } else {
                    secondsLeft = seconds;
                }
                let minutes = Math.floor(secondsLeft / 60);
                let secondsLeftOver = Math.floor(secondsLeft % 60);
                if (secondsLeftOver <10){
                    secondsLeftOver= '0' + secondsLeftOver;
                }
        
                countdownArea.firstChild.remove();
                let p = document.createElement('p');
                p.append(document.createTextNode(minutes + ":" + secondsLeftOver));
                countdownArea.prepend(p);
        
                t = setTimeout(function () {
                    if (timerOn) {
                        secondsLeft -= 1;
                        startTimer(null, secondsLeft);
                    }
                }, 1000);
        
            }
}
  


function pauseRestartTimer(event) {
    if (timerOn) {
        pauseButton.textContent = 'Restart';
        catDiv.classList.add('hidden');
        finishedPromptBox.classList.remove('hidden');
        timerOn = false;
    } else {
        timerOn = true;
        finishedPromptBox.classList.add("hidden");
        catDiv.classList.remove("hidden");
        pauseButton.textContent = 'Pause';
        startTimer(undefined, secondsLeft);
    }
}

function resetTimers(){
    if(pauseButton.textContent==='Restart'){
        pauseButton.textContent='Pause';
    }
    countdownArea.firstChild.remove();
    timeInput.value='';
    timerOn=false;

}

function finishedPrompt() {
    catDiv.classList.add("hidden");
    finishedPromptBox.classList.remove("hidden");
}

function finishTask() {
    let chosenTask = chosenTaskArea.textContent;
    let li=document.createElement('li');
    li.appendChild(document.createTextNode(chosenTask));
    completedCollection.appendChild(li);
    chosenTaskArea.textContent = '';
    ///DELETE FROM T0_DO LIST
    document.querySelectorAll(".task-item").forEach(function (taskItem) {
        const item = taskItem.firstChild.textContent.toLowerCase();
        if (item === chosenTask.toLowerCase()) {
            taskItem.remove();
        }
    })
    //DELETE FROM LS
    removeTaskFromLocalStorage(chosenTask);
    //ADD TO LS IN COMPLETED
    addCompletedTaskToLocalStorage(chosenTask);

    finishedPromptBox.classList.add("hidden")
    catDiv.classList.remove("hidden");

    resetTimers();

}

function returnToTimer() {
    finishedPromptBox.classList.add("hidden");
    catDiv.classList.remove("hidden");
}