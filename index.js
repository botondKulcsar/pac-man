'use strict';

const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
let squares = [];
let score = 0;
//28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

// create board

function createBoard() {
    layout.forEach((el, i) => {
        // create a square
        const square = document.createElement('div');
        // put it in grid
        grid.appendChild(square);
        // put square in squares array
        squares.push(square);

        layout[i] === 0 ? squares[i].classList.add('pac-dot') : '';
        layout[i] === 1 ? squares[i].classList.add('wall') : '';
        layout[i] === 2 ? squares[i].classList.add('ghost-lair') : '';
        layout[i] === 3 ? squares[i].classList.add('power-pallet') : '';

    })
}

createBoard();

// starting pos of pacman
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add('pacman');

function control(event) {
    squares[pacmanCurrentIndex].classList.remove('pacman');
    switch (event.keyCode) {
        case 38: //key UP
            if (!squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                pacmanCurrentIndex >= width)
                pacmanCurrentIndex -= width;
            break;
        case 40: //key DOWN
            if (!squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                pacmanCurrentIndex + width < width ** 2)
                pacmanCurrentIndex += width;
            break;
        case 37: //key LEFT
            if (!squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
                pacmanCurrentIndex % width !== 0) { pacmanCurrentIndex--; } else if (pacmanCurrentIndex === 364) pacmanCurrentIndex = 391;
            break;
        case 39: //key RIGHT
            if (!squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
                pacmanCurrentIndex % width < width - 1) { pacmanCurrentIndex++; } else if (pacmanCurrentIndex === 391) pacmanCurrentIndex = 364;
            break;
    }
    squares[pacmanCurrentIndex].classList.add('pacman');
    pacDotEaten();
    powerPelletEaten();
    checkForWin();
    checkForGameOver();
}

document.addEventListener('keydown', control);

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        score++
        scoreDisplay.textContent = score;
    }
}

function powerPelletEaten() {
    // is square pacman contains  a power peellt
    if (squares[pacmanCurrentIndex].classList.contains('power-pallet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pallet')
        score += 10;
        scoreDisplay.textContent = score;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(() => {
            ghosts.forEach(ghost => ghost.isScared = false)
        }, 10000)
    }



}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

// draw ghosts onto grid

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
});

// move the ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    console.log('moved ghost')
    const directions = [-1, +1, -width, width];
    let random = Math.floor(Math.random() * directions.length);
    let direction = directions[random];

    ghost.timerId = setInterval(function() {
        // check if next position does not contain a wall or another ghost
        if (!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost'))

        { // remove any ghost
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
            // add direction to currentIndex
            ghost.currentIndex += direction;
            // re-add ghost class
            squares[ghost.currentIndex].classList.add(ghost.className);
            squares[ghost.currentIndex].classList.add('ghost');
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)];
        }

        // if the ghost is currently scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        if ((ghost.isScared) && squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            scoreDisplay.textContent = score;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }
        checkForGameOver();
    }, ghost.speed)

}

// check 4 game over

function checkForGameOver() {
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost  - actually pacman gets eaten
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
            //remove eventlistener from our control function
        document.removeEventListener('keydown', control);
        alert('Game Over! You scored: ' + score + '\nLOOSER!');

    }
}

// check4win

function checkForWin() {
    if (score >= 400) {
        //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keydown', control);
        alert('Game Over! You scored: ' + score + '\nYOU HAVE WON!');

    }
}