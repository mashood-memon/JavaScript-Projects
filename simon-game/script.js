let order = []
let playerOrder = []
let flash 
let turn 
let good
let compTurn
let intervalId
let strict = false
let noise =true
let on = false
let win

console.log(compTurn);
const turnCounter = document.querySelector("#turn");
const topLeftBtn = document.querySelector("#topleft")
const topRightBtn = document.querySelector("#topright")
const bottomLeftBtn = document.querySelector("#bottomleft")
const bottomRightBtn = document.querySelector("#bottomright")
const strictBtn = document.querySelector("#strict")
const startBtn = document.querySelector("#start")
const powerBtn = document.querySelector("#on")

strictBtn.addEventListener('click',()=>{
    if(startBtn.checked){
        strict = true
    }
    else{
        strict = false
    }
})

powerBtn.addEventListener('click',()=>{
    if(powerBtn.checked){
        on = true
        turnCounter.innerHTML = "-"
    }
    else{
        on = false
        turnCounter.innerHTML = ''
        clearColor()
        clearInterval(intervalId)

    }
})

startBtn.addEventListener('click',()=>{
    if(on || win){
        play()
    }
})

function play(){
    win = false
    playerOrder = []
    order = []
    flash =0
    intervalId = 0
    turn = 1
    turnCounter.innerHTML = 1
    good = true

    for(let i=0; i<10; i++){
        order.push(Math.floor(Math.random()*4) + 1)
    }
    compTurn = true
    intervalId = setInterval(gameTurn, 800)
}

function gameTurn(){
    on = false

    if(flash===turn){
        clearInterval(intervalId)
        compTurn = false
        clearColor()
        on= true
    }
    if(compTurn){
        clearColor()
        setTimeout(()=>{
            if(order[flash]===1) one()
            if(order[flash]===2) two()
            if(order[flash]===3) three()
            if(order[flash]===4) four()
            flash++
        
        },200)
    }
}

function one(){
    if(noise){
        let audio = document.getElementById("clip1")
        audio.play()
    }
    noise = true
    topLeftBtn.style.backgroundColor = "lightgreen"
}
function two(){
    if(noise){
        let audio = document.getElementById("clip2")
        audio.play()
    }
    noise = true
    topRightBtn.style.backgroundColor = "tomato"
}
function three(){
    if(noise){
        let audio = document.getElementById("clip3")
        audio.play()
    }
    noise = true
    bottomLeftBtn.style.backgroundColor = "yellow"
}
function four(){
    if(noise){
        let audio = document.getElementById("clip4")
        audio.play()
    }
    noise = true
    bottomRightBtn.style.backgroundColor = "lightskyblue"
}

function clearColor(){
    topLeftBtn.style.backgroundColor = "darkgreen"
    topRightBtn.style.backgroundColor = "darkred"
    bottomLeftBtn.style.backgroundColor = "goldenrod"
    bottomRightBtn.style.backgroundColor = "darkblue"
}
function flashColor(){
    topLeftBtn.style.backgroundColor = "lightgreen"
    topRightBtn.style.backgroundColor = "tomato"
    bottomLeftBtn.style.backgroundColor = "yellow"
    bottomRightBtn.style.backgroundColor = "lightskyblue"
}
topLeftBtn.addEventListener('click',()=>{
    if(on){
        playerOrder.push(1)
        console.log(playerOrder);
        check()
        one()
        if(!win){
            setTimeout(()=>{
                clearColor()
            },300)
        }
    }
})
topRightBtn.addEventListener('click',()=>{
    if(on){
        playerOrder.push(2)
        console.log(playerOrder);
        check()
        two()
        if(!win){
            setTimeout(()=>{
                clearColor()
            },300)
        }
    }
})
bottomLeftBtn.addEventListener('click',()=>{
    if(on){
        playerOrder.push(3)
        console.log(playerOrder);
        check()
        three()
        if(!win){
            setTimeout(()=>{
                clearColor()
            },300)
        }
    }
})
bottomRightBtn.addEventListener('click',()=>{
    if(on){
        playerOrder.push(4)
        console.log(playerOrder);
        check()
        four()
        if(!win){
            setTimeout(()=>{
                clearColor()
            },300)
        }
    }
})

function check(){
    if(playerOrder[playerOrder.length-1] !== order[playerOrder.length-1]){
        good = false
    }
    if(playerOrder.length===10 && good){
        wingame()
    }
    if(good===false){
        flashColor()
        turnCounter.innerHTML="NO"
        setTimeout(()=>{
            turnCounter.innerHTML= turn
            clearColor()
            if(strict){
                play()
            }
            else{
                compTurn=true
                flash=0
                playerOrder=[]
                good=true
                intervalId = setInterval(gameTurn, 800)
            }
        },800)
        noise=false
    }
    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function wingame(){
    flashColor()
    turnCounter.innerHTML="WIN"
    on=false
    win=true
}

