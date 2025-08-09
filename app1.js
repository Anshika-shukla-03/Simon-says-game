
let userSeq = [];
let gameSeq = [];
let gameStarted = false;
let level = 0;
let allowUserInput = false;

let h2 = document.querySelector("h2");
let body = document.querySelector("body");
let buttonColors = ["red", "yellow", "green", "purple"];
let scores = [];


document.addEventListener("keydown", startGame);
document.addEventListener("click", startGame);

function startGame() {
    if (!gameStarted) {
        console.log("Game started");
        gameStarted = true;
        level = 0;
        gameSeq = [];
        nextLevel();
    }
}

function nextLevel() {
    userSeq = [];
    allowUserInput = false; 
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomIndex];
    gameSeq.push(randomColor);

    playSequence();
}

function playSequence() {
    let delay = 0;
    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.getElementById(color);
            gameFlash(btn);
            if (index === gameSeq.length - 1) {
                setTimeout(() => {
                    allowUserInput = true; 
                }, 300);
            }
        }, delay);
        delay += 600;
    });
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("aquaflash");
    setTimeout(() => btn.classList.remove("aquaflash"), 250);
}

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        if (!allowUserInput) return; 
        let color = this.id;
        userSeq.push(color);
        userFlash(this);
        checkAnswer(userSeq.length - 1);
    });
});

function checkAnswer(currentIndex) {
    if (userSeq[currentIndex] === gameSeq[currentIndex]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(nextLevel, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    body.classList.add("error");
    setTimeout(() => body.classList.remove("error"), 300);

    let playerScore = level; 

    h2.innerHTML = `Game Over! Your score was <b>${playerScore}</b><br>Press any key or click to start.`;
    gameStarted = false;
    allowUserInput = false;

    setTimeout(() => {
        let playerName = prompt("Enter your name:");
        if (playerName) {
            scores.push({ name: playerName, score: playerScore });
            scores.sort((a, b) => b.score - a.score); 
            scores = scores.slice(0, 5);
            updateLeaderboard();
        }
    }, 100);
}

function updateLeaderboard() {
    let tbody = document.querySelector("#leaderboard tbody");
    tbody.innerHTML = "";
    scores.forEach(entry => {
        let row = `<tr><td>${entry.name}</td><td>${entry.score}</td></tr>`;
        tbody.innerHTML += row;
    });
}
