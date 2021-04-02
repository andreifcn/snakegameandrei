
let snakePosition = 0, line = 0, col = 0, applePos;
let snakeSize = ['0'];
let score = -1, interval, direction;

function initGame() {

    initBoard();
    createApple();
    actionBox();
}

function initBoard() {

    document.getElementById('action-panel').style.visibility = 'visible';
    document.getElementById('play').style.opacity = '0';

    for (let i = 0; i < 99; i++) {
        let block = document.createElement('DIV');
        block.id = i;
        block.className = 'block';
        document.getElementById('action-panel').appendChild(block);
    }
}


function createApple() {

    applePos = Math.floor(Math.random() * 99);

    score++;
    document.getElementById('game-score').innerText = 'Score: ' + score;

    return document.getElementById(applePos).style.backgroundColor = 'red';
}


function growSnake() {
    if (snakePosition === applePos) {
        document.getElementById(applePos).innerHTML = '';
        snakeSize.push(snakePosition);
        createApple();
    }
}


function endGame() {

    document.getElementById('game-over-msg').style.visibility = 'visible';
    clearInterval(interval);
    removeEventListener('keydown', function setMovement(event) {});
    return document.getElementById('action-panel').innerHTML = innerHTML;
}


function checkBody(snakeSize) {

    if (snakeSize.indexOf(snakePosition) != -1) {
        return endGame();
    } 
}


function drawSnake() {

    snakeSize.push(snakePosition);

    document.getElementById(snakePosition).style.backgroundColor = '#bc8f8f';
    document.getElementById(snakeSize[0]).style.backgroundColor = 'black';

    snakeSize.shift();
}


function checkBorder() {

    if (col < 0 || col > 10 ||
        line < 0 || line > 8) {
            return endGame();
    }
}


function moveDirection(event) {

    switch(event.key) {
        case 'ArrowUp':
            line--;
            snakePosition -= 11;
            break;

        case 'ArrowDown':
            line++;
            snakePosition += 11;
            break;

        case 'ArrowLeft':
            col--;
            snakePosition--;
            break;

        case 'ArrowRight':
            col++;
            snakePosition++;
            break; 
    }
}


function checkDirection(event) {

    if (event.key === 'ArrowDown' && direction === 'ArrowUp' ||
    event.key === 'ArrowUp' && direction ===  'ArrowDown' ||
    event.key === 'ArrowLeft' && direction === 'ArrowRight' ||
    event.key === 'ArrowRight' && direction === 'ArrowLeft') {
        return false;
    }
    return true;
}


function actionBox () {

    window.addEventListener('keydown', function setMovement(event) {

        if (checkDirection(event)) {
            clearInterval(interval);
            direction = event.key;
            interval = setInterval(function() {
                moveDirection(event);
                checkBody(snakeSize);
                checkBorder();
                growSnake();
                drawSnake();
            }, 500);
        }

    });
}
