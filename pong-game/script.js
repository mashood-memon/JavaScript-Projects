import Ball from "./ball.js";
import Paddle from "./paddle.js"

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScore = document.getElementById("player-score")
const computerScore = document.getElementById("computer-score")
let playerScoreValue =0
    let computerScoreValue =0
let lastTime = null; 
function update(time) {
    if (lastTime !== null) {
        const delta = time - lastTime;
        const paddles = document.querySelectorAll('.paddle');
    const paddleRects = Array.from(paddles).map(paddle => paddle.getBoundingClientRect());
    ball.update(delta, paddleRects);
        computerPaddle.update(delta,ball.y)
        const hue =parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        document.documentElement.style.setProperty("--hue",hue+delta*.01)
        if(isLose()){
            handleLose()
        }
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose(){
    const rect = ball.rect()
    return rect.right>=window.innerWidth || rect.left<=0
}
function handleLose(){
    const rect = ball.rect()
    const winScore = 5
    
    if (rect.right >= window.innerWidth) {
        playerScoreValue++;
        playerScore.textContent = playerScoreValue;
    } else {
        computerScoreValue++;
        computerScore.textContent = computerScoreValue;
    }
    if (playerScoreValue === winScore || computerScoreValue === winScore) {
        let winner;
        if (playerScoreValue === winScore) {
            winner = "Player";
        } else {
            winner = "Computer";
        }
        alert(`${winner} wins!`);

        resetGame()
        
    }
    ball.reset()
    computerPaddle.reset()
}
function resetGame() {
    playerScoreValue = 0;
    computerScoreValue = 0;
    playerScore.textContent = '0';
    computerScore.textContent = '0';

    ball.reset();
    computerPaddle.reset();
}


document.addEventListener("mousemove",e=>{
    playerPaddle.position =  (e.y/ window.innerHeight)*100
})

window.requestAnimationFrame(update);
