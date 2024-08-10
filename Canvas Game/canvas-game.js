const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let x = 100
let y=400
let radius =30
let upPressed =false
let downPressed =false
let leftPressed = false
let rightPressed =false

function drawGame(){
    requestAnimationFrame(drawGame)
    clearScreen()
    drawGreenBall()
    inputs()
    boundaryCheck()
}

function boundaryCheck(){
    if(y<radius){
        y=radius
    }
    if(y > canvas.height -radius){
        y=canvas.height - radius
        
    }
    if(x<radius){
        x=radius
    }
    if(x > canvas.width -radius){
        x=canvas.width - radius
        
    }
}
function inputs(){
    if(upPressed){
        y-=10
    }
    if(downPressed){
        y+=10
    }
    if(rightPressed){
        x+=10
    }
    if(leftPressed){
        x-=10   
    }
}

function clearScreen(){
    ctx.fillStyle ="black"
    ctx.fillRect(0,0,canvas.width, canvas.height)
}

function drawGreenBall(){
    ctx.fillStyle="green";
    if(upPressed){
        ctx.fillStyle="yellow"
    }
    if(downPressed){
        ctx.fillStyle="brown"
    }
    if(leftPressed){
        ctx.fillStyle="purple"
    }
    if(rightPressed){
        ctx.fillStyle="blue"
    }
    
    ctx.beginPath();
    ctx.arc(x,y,radius,0, 2*Math.PI)
    ctx.fill()
}

document.body.addEventListener('keydown',keyDown)
document.body.addEventListener('keyup',keyUp)

function keyDown(e){
    if(e.keyCode ===38){
        upPressed =true
    }
    if(e.keyCode ===40){
        downPressed =true
    }
    if(e.keyCode ===37){
        leftPressed =true
    }
    if(e.keyCode ===39){
        rightPressed =true
    }

}
function keyUp(e){
    if(e.keyCode === 38){
        upPressed = false;
    }
    if(e.keyCode === 40){
        downPressed = false;
    }
    if(e.keyCode === 37){
        leftPressed = false;
    }
    if(e.keyCode === 39){  
        rightPressed = false;
    }
}


drawGame()