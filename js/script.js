import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
let playerScoreValue = 0;
let computerScoreValue = 0;

let lastTime = 0;

function update(time){
    if (lastTime != null){
        const deltatime = time - lastTime;
        ball.update(deltatime, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(deltatime, ball.y);

        if (isLose()) handleLose();
    }
    
    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose(){
    const rect = ball.rect();
    return (rect.left <= 0 || rect.right >= window.innerWidth);
}

function handleLose(){
    const rect = ball.rect();
    if (rect.right >= window.innerWidth){
        playerScoreValue++;
        playerScore.textContent = playerScoreValue;
    } else {
        computerScoreValue++;
        computerScore.textContent = computerScoreValue;
    }
    ball.reset();
    computerPaddle.reset();
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);