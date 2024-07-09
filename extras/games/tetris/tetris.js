const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const grid = 32;
const tetrominoSequence = [];

// Keep track of what is in every cell of the game using a 2d array
const playfield = [];

// Create the empty state for the playfield
for (let row = -2; row < 20; row++) {
    playfield[row] = [];

    for (let col = 0; col < 10; col++) {
        playfield[row][col] = 0;
    }
}

// how to draw each tetromino
// @see https://tetris.fandom.com/wiki/Tetris_Guideline
const tetrominos = {
    'I': [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    'J': [
        [1,0,0],
        [1,1,1],
        [0,0,0],
    ],
    'L': [
        [0,0,1],
        [1,1,1],
        [0,0,0],
    ],
    'O': [
        [1,1],
        [1,1],
    ],
    'S': [
        [0,1,1],
        [1,1,0],
        [0,0,0],
    ],
    'Z': [
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ],
    'T': [
        [0,1,0],
        [1,1,1],
        [0,0,0],
    ]
};

// color of each tetromino
const colors = {
    'I': '#36b5ff',
    'O': '#ffe436',
    'T': '#d036ff',
    'S': '#36ff6b',
    'Z': '#ff3636',
    'J': '#3646ff',
    'L': '#ff9a36'
};

// Keep track of the position of the current tetromino
let tetromino = getNextTetromino();
let rAF = null;  // keep track of the animation frame so we can cancel it
let gameOver = false;

// Get the next tetromino in the sequence
function getNextTetromino() {
    if (tetrominoSequence.length === 0) {
        const tetrominos = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];

        while (tetrominos.length) {
            const rand = getRandomInt(0, tetrominos.length - 1);
            const name = tetrominos.splice(rand, 1)[0];
            tetrominoSequence.push(name);
        }
    }

    const name = tetrominoSequence.pop();
    const matrix = tetrominos[name];

    const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

    const row = name === 'I' ? -1 : -2;

    document.body.style.backgroundColor = colors[name]

    return {
        name: name,      // name of the piece (L, O, etc.)
        matrix: matrix,  // the current rotation matrix
        row: row,        // current row (starts offscreen)
        col: col         // current col
    };
}

// Generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Rotate the matrix 90 degrees clockwise
function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
    );

    return result;
}

// Check to see if the new matrix/row/col is valid
function isValidMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && (
                cellCol + col < 0 ||
                cellCol + col >= playfield[0].length ||
                cellRow + row >= playfield.length ||
                playfield[cellRow + row][cellCol + col])
            ) {
                return false;
            }
        }
    }

    return true;
}

// Place the tetromino on the playfield
function placeTetromino() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {

                // game over if piece has any part offscreen
                if (tetromino.row + row < 0) {
                    return showGameOver();
                }

                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }

    for (let row = playfield.length - 1; row >= 0; ) {
        if (playfield[row].every(cell => !!cell)) {

            for (let r = row; r >= 0; r--) {
                for (let c = 0; c < playfield[r].length; c++) {
                    playfield[r][c] = playfield[r-1][c];
                }
            }
        }
        else {
            row--;
        }
    }

    tetromino = getNextTetromino();
}

// Show the game over screen
function showGameOver() {
    cancelAnimationFrame(rAF);
    gameOver = true;

    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
}

// Draw the tetromino
function drawTetromino() {
    context.fillStyle = colors[tetromino.name];

    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {

                context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid, grid);
            }
        }
    }
}

// Draw the playfield
function drawPlayfield() {
    for (let row = 0; row < playfield.length; row++) {
        for (let col = 0; col < playfield[row].length; col++) {
            if (playfield[row][col]) {
                const name = playfield[row][col];
                context.fillStyle = colors[name];

                context.fillRect(col * grid, row * grid, grid, grid);
            }
        }
    }
}

// Listen to keyboard events to move the active tetromino
document.addEventListener('keydown', function(e) {
    if (gameOver) return;

    // Left arrow key (move left)
    if (e.which === 37 || e.keyCode === 37) {
        const col = tetromino.col - 1;
        if (isValidMove(tetromino.matrix, tetromino.row, col)) {
            tetromino.col = col;
        }
    }

    // Right arrow key (move right)
    if (e.which === 39 || e.keyCode === 39) {
        const col = tetromino.col + 1;
        if (isValidMove(tetromino.matrix, tetromino.row, col)) {
            tetromino.col = col;
        }
    }

    // Up arrow key (rotate)
    if (e.which === 38 || e.keyCode === 38) {
        const matrix = rotate(tetromino.matrix);
        if (isValidMove(matrix, tetromino.row, tetromino.col)) {
            tetromino.matrix = matrix;
        }
    }

    // Down arrow key (soft drop)
    if (e.which === 40 || e.keyCode === 40) {
        const row = tetromino.row + 1;
        if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
            tetromino.row = row - 1;
            placeTetromino();
            return;
        }

        tetromino.row = row;
    }

    if (e.which === 32 || e.keyCode === 32) {
      while (isValidMove(tetromino.matrix, tetromino.row + 1, tetromino.col)) {
          tetromino.row++;
      }
      placeTetromino();
  }
});

// Game loop
function loop() {
    rAF = requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);

    drawPlayfield();
    drawTetromino();

    if (++count > 35) {
        tetromino.row++;
        count = 0;

        if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
            tetromino.row--;
            placeTetromino();
        }
    }
}

// Fit the canvas to the screen
canvas.width = 10 * grid; // 10 columns
canvas.height = 20 * grid; // 20 rows

// Keep track of time
let count = 0;

// Start the game loop
rAF = requestAnimationFrame(loop);
