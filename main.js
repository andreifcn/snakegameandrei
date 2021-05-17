
function initGame() {
    
    const mapData = initMapData();
    let snake = initSnakeData();
    
    drawBoard(mapData);
    createApple(snake, mapData);
    actionBox(snake, mapData);
    
    document.getElementById('play').style.opacity = '0';
    document.getElementById('action-panel').style.visibility = 'visible';
    document.getElementById('game-settings').style.visibility = 'hidden';
}


function initSnakeData() {

    let snake = {
        snakeSize: ['0'],
        speed: document.getElementById('speed-option-select').value,
        mapMovement: '',
        direction: '',
        snakePosition: 0, 
        line: 0, 
        col: 0, 
        applePos: 0,
        score: -1
    }

    if (document.getElementById('map-size-select').value === 'small') {
        snake.mapMovement = 11;
    } else {
        snake.mapMovement = 15;
    }

    return snake;
}


function initMapData() {

    const mapData = {
        mapSize: document.getElementById('map-size-select').value,
        blocks:'',
        mapStyle: '',
        maxLine: 8,
        maxCol: 10
    }
    
    if (mapData.mapSize === 'small') {
        mapData.style = 'height: 291px; width: 360px';
        mapData.blocks = 99;
        mapData.maxLine = 8;
        mapData.maxCol = 10;

    } else if (mapData.mapSize === 'large') {
        mapData.style = 'height: 442px; width: 515px';
        mapData.blocks = 195;
        mapData.maxLine = 12;
        mapData.maxCol = 14;

    }

    return mapData;
}


function drawBoard(mapData) {

    document.getElementById('action-panel').style = mapData.style;

    for (let i = 0; i < mapData.blocks; i++) {
        let block = document.createElement('DIV');
        block.id = i;
        block.className = 'block';
        document.getElementById('action-panel').appendChild(block);
    }

}


function createApple(snake, mapData) {

    snake.applePos = Math.floor(Math.random() * mapData.blocks);

    while (snake.snakeSize.indexOf(snake.applePos) !== -1) {
        snake.applePos = Math.floor(Math.random() * mapData.blocks);
    }

    snake.score++;
    document.getElementById('game-score').innerText = 'Score: ' + snake.score;
    document.getElementById(snake.applePos).style.backgroundColor = 'red';
}


function growSnake(snake, mapData) {

    if (snake.snakePosition === snake.applePos) {
        document.getElementById(snake.applePos).innerHTML = '';
        snake.snakeSize.push(snake.snakePosition);
        createApple(snake, mapData);
    }
}


function endGame(interval) {

    document.getElementById('game-over-msg').style.visibility = 'visible';
    removeEventListener('keydown', function setMovement(event) {});
    clearInterval(interval);
    return document.getElementById('action-panel').innerHTML = innerHTML;
}


function checkBody(snake, interval) {

    if (snake.snakeSize.indexOf(snake.snakePosition) != -1) {
        return endGame(interval);
    } 
}


function drawSnake(snake) {

    snake.snakeSize.push(snake.snakePosition);

    document.getElementById(snake.snakePosition).style.backgroundColor = '#bc8f8f';
    document.getElementById(snake.snakeSize[0]).style.backgroundColor = 'black';

    snake.snakeSize.shift();
}


function checkBorder(snake, mapData, interval) {

    if (snake.col < 0 || snake.col > mapData.maxCol ||
        snake.line < 0 || snake.line > mapData.maxLine) {
            return endGame(interval);
    }
}


function moveDirection(snake, event) {

    switch(event.key) {
        case 'ArrowUp':
            snake.line--;
            snake.snakePosition -= snake.mapMovement;
            break;

        case 'ArrowDown':
            snake.line++;
            snake.snakePosition += snake.mapMovement;
            break;

        case 'ArrowLeft':
            snake.col--;
            snake.snakePosition--;
            break;

        case 'ArrowRight':
            snake.col++;
            snake.snakePosition++;
            break; 
    }
}


function checkDirection(event, direction) {

    if (event.key === 'ArrowDown' && direction === 'ArrowUp' ||
    event.key === 'ArrowUp' && direction ===  'ArrowDown' ||
    event.key === 'ArrowLeft' && direction === 'ArrowRight' ||
    event.key === 'ArrowRight' && direction === 'ArrowLeft') {
        return false;
    }
    return true;
}


function actionBox (snake, mapData) {
   
    let interval;

    window.addEventListener('keydown', function setMovement(event) {

        if (checkDirection(event, snake.direction)) {
            clearInterval(interval);
            snake.direction = event.key;
            interval = (setInterval(function move() {

                moveDirection(snake, event);
                checkBody(snake, interval);
                checkBorder(snake, mapData, interval);
                growSnake(snake, mapData);
                drawSnake(snake);
            }, snake.speed));
        }

    });
}
