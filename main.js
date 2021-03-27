let canvas;
let ctx;
let h = 5;
let w = 10;
let x = 10;
let y = 11;
let direction;
let interval;
let score = 0;
let appleXPos;
let appleYPos;
let itemToAdd;
let snakeSize = [];

// initialize game's functions: the map, the apple, the key listener

function gameInit() {

    generateCanvas();
    generateApple();
    startGame();
    document.getElementById('play').style.opacity = 0;
}

// start the 2D drawing engine and generates map

function generateCanvas() {

    canvas = document.createElement('CANVAS');
    canvas.setAttribute('id','game-board');
    ctx = canvas.getContext('2d');
    document.getElementById('action-panel').appendChild(canvas);
}

// function to generate apple parameters and location
// used by snakeGrowth

function generateApple() {

    appleXPos = Math.floor(Math.random() * 280);
    appleYPos = Math.floor(Math.random() * 100);
    ctx.fillStyle = 'red';
    ctx.fillRect(appleXPos, appleYPos, w - 5, h - 2);
}

// grows the snake every time it eats the apple
// increments score and generates another apple on the map

function snakeGrowth() {

    if (appleXPos >= x - 5 && appleXPos <= x + 5) {
        if (appleYPos >= y - 5 && appleYPos <= y + 5) {
            ctx.clearRect(appleXPos, appleYPos, w, h);
            score++;

            document.getElementById('game-score').innerText =
            'Score: ' + score.toString();

            return generateApple();
        }
    } 
}

// ends the game if the snake goes outside the map grid

function checkBoundaries() {

    if (x > 290 || y > 145 || x < 0 || y < 0) {
        return endGame();
    }
}

// ends the game if the snake bites himself

function checkSelfDamage(itemToAdd, snakeSize) {
  
    for (let i = 0; i < snakeSize.length; i++) {
        let item1 = JSON.stringify(itemToAdd);
        let item2 = JSON.stringify(snakeSize[i]);
        if (item1 === item2) {
            endGame();
        }
    }
}

// function stops the game engine and displays the game over message

function endGame() {

    let gameOverMessage = document.createElement('H1');
    gameOverMessage.setAttribute('id', 'game-over-msg');
    gameOverMessage.innerText = 'Game Over!';
    document.getElementById('action-panel').appendChild(gameOverMessage);

    clearInterval(interval);
    buttonObj = document.getElementById('play');
    
    return buttonObj.remove();
}

// sets parameters for drawing using keyboard direction commands
// draws the snake's movement and its body size

function drawSnake(direction) {

    switch(direction) {
        case 'ArrowDown':
            y += 3;
            break;

        case 'ArrowUp':
            y -= 3;
            break;

        case 'ArrowRight':
            x += 5;
            break;

        case 'ArrowLeft':
            x -= 5;
            break;

    }

    itemToAdd = [[x], [y]];
    checkSelfDamage(itemToAdd, snakeSize);

    snakeSize.push([[x], [y]]);

    ctx.fillStyle = '#4507A1';
    ctx.fillRect(x, y, w, h);

    if (snakeSize.length > score + 3) {
        let removeItems = snakeSize.shift();
        ctx.clearRect(removeItems[0], removeItems[1], w, h);
    }
}

// keyboard listener, initates snake's movement painter

function startGame() {

    document.getElementById('play').addEventListener('keydown', function play(event){
    
        clearInterval(interval);    
        interval = setInterval(function() {
            checkBoundaries();
            snakeGrowth();
            drawSnake(event.key);
        }, 100); 
    });
}
