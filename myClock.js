var session="session", breakTime = 5, sessionTime = 25,isRunning=false, currentTime=0,currentMinutes=0,currentSeconds=0, incSession, decSession;



var soundBite = new Audio('https://www.dropbox.com/pri/get/bell.mp3?_subject_uid=637868302&w=AAAJfzwriOAieAFnLXN4Z_5uEBAEEYX2hEyU55vAVmrv_A');

soundBite.loop = false;                          

$(document).ready(function(){
  document.getElementById("workTime").innerHTML=sessionTime;
  document.getElementById("breakTime").innerHTML=breakTime;
	incSession = document.getElementById("workUp");
  decSession = document.getElementById("workDown");
  clear();
  resetTimer(session,"session");


incSession.onclick=function(){
 if(!isRunning&&sessionTime<60){
  sessionTime=sessionTime+5;
   document.getElementById("workTime").innerHTML = sessionTime;
   resetTimer(session,"session");
 } 
}

decSession.onclick=function(){
 if(!isRunning&&sessionTime>5){
  sessionTime=sessionTime-5;
 
   document.getElementById("workTime").innerHTML = sessionTime;
   resetTimer(session,"session");
 } 
}

document.getElementById("breakUp").onclick=function(){
 if(!isRunning&&breakTime<60){
  breakTime=breakTime+5;
   document.getElementById("breakTime").innerHTML = breakTime;
   resetTimer(session,"break");
 }
}

document.getElementById("breakDown").onclick=function(){
 if(!isRunning&&breakTime>5){
  breakTime=breakTime-5;
   document.getElementById("breakTime").innerHTML = breakTime;
   resetTimer(session,"break");
 } 
} 

document.getElementById("start").onclick=function(){
  if(!isRunning){
    if(session=="session"){
      document.getElementById("status").innerHTML = "Get to Work!";
    }
    isRunning= true;
    startTimer()
  }
  
}

document.getElementById("clear").onclick=function(){
  if(!isRunning){
    clear();
  }
  
}

document.getElementById("stop").onclick=function(){
  if(isRunning){
    isRunning= false;
    stopTimer()
  }
  
}



function resetTimer(timerNow,timerSet){
  if(timerNow==timerSet){
    if(timerNow=="session"){
      currentTime=sessionTime*60;
      document.getElementById("timer").innerHTML=currentTime/60+":00";
      
    }
    else{
 currentTime=breakTime*60;
document.getElementById("timer").innerHTML=currentTime/60+":00";
   
     }
  }
}

function startTimer(){
  pokoTimer = setInterval(beginTimer,1000);
}

function stopTimer(){
  clearInterval(pokoTimer);
}

function switchSession(){
  soundBite.play();
  if(session=="session"){
    session="break";
    document.getElementById("status").innerHTML = "Take a Break!";
    document.getElementById("timer").style.background='#ff0101'
    resetTimer(session,"break");
   
  }else if(session=="break"){
    session="session";
    document.getElementById("status").innerHTML = "Get to Work!";
    document.getElementById("timer").style.background='#48fb47';
    resetTimer(session,"session");
  }
}



function beginTimer(){
 if(currentTime<=0){
     stopTimer();
   switchSession();
   startTimer();
 }else{
   currentTime--;
   currentMinutes=parseInt(currentTime/60,10);
   currentSeconds=parseInt(currentTime%60,10);
   currentMinutes=currentMinutes<10?"0"+currentMinutes:currentMinutes;
   currentSeconds=currentSeconds<10?"0"+currentSeconds:currentSeconds;
   document.getElementById("timer").innerHTML=currentMinutes+":"+currentSeconds;
   //background: linear-gradient(blue 30%, red 0);
   var percentageColour;
   var firstColour;
   var secondColour
   if(session=="session"){
     percentageColour = (currentTime/(sessionTime*60))*100;
     firstColour = '#48fb47';
     secondColour = '#ff0101';
   }else{
     percentageColour = (currentTime/(breakTime*60))*100;
    firstColour = '#ff0101';
     secondColour = '#48fb47';
   }
   document.getElementById('timer').style.background = 'linear-gradient('+firstColour+' '+percentageColour + '%, '+secondColour+' 0)';
        
 } 
};

function playBell(){
  documentation.getElementById("bell").play();
};

function clear(){
  if(!isRunning){
   session="session";
   resetTimer(session,"session");
   document.getElementById("timer").innerHTML= sessionTime<10?"0"+sessionTime+":00":sessionTime +":00";
   document.getElementById("timer").style.background='#48fb47';
  }
}; 

});