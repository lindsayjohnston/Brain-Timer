const dateArea= document.querySelector('#date');
const timeArea=document.querySelector("#time");


setEventListeners();

function setEventListeners(){
    document.addEventListener('DOMContentLoaded', loadDateTime())
}

function loadDateTime(){
    let date= new Date();
    let hours= date.getHours();
    let minutes= date.getMinutes();
    minutes= checkTime(minutes);
    console.log(minutes);
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


