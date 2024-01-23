let gameSeq = [];
let userSeq = [];
let btns = ["red","yellow","green","purple"];

let level = 0;
let started = false;
let highestScore = 0;

// let btn = document.querySelector("button");
let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started === false){
        started = true;
        console.log("Game started");
    
        setTimeout(levelUp,500); 
    }
})


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomNum = Math.floor(Math.random() * 4);
    let randomColor = btns[randomNum];
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomNum, randomColor);
    // console.log(randomBtn);

    gameFlash(randomBtn);
    gameSeq.push(randomColor);
}

function gameFlash(btn){
    btn.classList.add("game-flash");
    setTimeout(function(){
        btn.classList.remove("game-flash");
    }, 250);
}

function backgroundFlash(mainDiv){
    mainDiv.classList.add("background-flash");
    setTimeout(function(){
        mainDiv.classList.remove("background-flash");
    }, 1000);
}

function checkAns(idx){
    if(gameSeq[idx] != userSeq[idx]){
        highestScore = Math.max(highestScore,level);
        h2.innerHTML = `Game Over!! Your Score was <b>${level}</b>.
                        [ Highest Score = ${highestScore} ] <br> 
                        Press any key to Start Again.`;

        // let mainDiv = document.querySelector(".main");
        // backgroundFlash(mainDiv);

        let bg = document.querySelector("body");
        bg.style.backgroundColor = "red";
        
        setTimeout(function(){
            bg.style.backgroundColor = "rgb(224, 236, 246)";
        },1000);
        
        reset();
    }
    else if(idx == level-1){
        setTimeout(levelUp,1000);
    }
}

function reset(){
    level = 0;
    started = false;
    gameSeq = [];
    userSeq = [];
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let pressedColor = btn.getAttribute("id");
    userSeq.push(pressedColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(function(){
        btn.classList.remove("user-flash");
    }, 250);
}