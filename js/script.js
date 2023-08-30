let board = Array(9).fill(null);
let human = 'X', ai = 'O', EMPTY = null;
let currentPlayer = human;
let humanWins = 0, aiWins = 0, ties = 0, gamesPlayed = 0;

let cells = Array.from(document.querySelectorAll('#board .cell'));
cells.forEach(cell => {
    cell.addEventListener('click', click, false);
});

let scores = {
    [human]: -1,
    [ai]: 1,
    'tie': 0
};

function resetBoard(initialPlayer) {
    board = Array(9).fill(null);
    currentPlayer = initialPlayer;
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => cell.classList.remove(human, ai));

    if (currentPlayer === ai) {
        makeAIMove();
    }
}

function checkWin(board) {
    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        if (board[condition[0]] && board[condition[0]] === board[condition[1]] && board[condition[0]] === board[condition[2]]) {
            return board[condition[0]];
        }
    }

    if (!board.includes(null)) {
        return 'tie';
    }

    return null;
}

function updateScores(winner) {
    gamesPlayed++;
    document.getElementById('games-played').innerText = gamesPlayed;
    if (winner === human) {
        humanWins++;
        document.getElementById('human-wins').innerText = humanWins;
    } else if (winner === ai) {
        aiWins++;
        document.getElementById('ai-wins').innerText = aiWins;
    } else if (winner === 'tie') {
        ties++;
        document.getElementById('ties').innerText = ties;
        console.log("empate")
    }
}

function click(e) {
    let index = cells.indexOf(e.target);
    if (board[index] == null) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer);
        currentPlayer = currentPlayer === human ? ai : human;
        let result = checkWin(board);
        if(result) {
            updateScores(result);
            let nextPlayer = (currentPlayer === human) ? ai : human;  // Determine o próximo jogador
            resetBoard(nextPlayer);  // Reinicie o tabuleiro
        }
        // Se não há um vencedor, permita que a IA jogue.
        if(!result && currentPlayer === ai) makeAIMove();
    }
}


function makeAIMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (board[i] === EMPTY) {
            board[i] = ai;
            let score = minimax(board, 0, false);
            board[i] = EMPTY;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    if (move !== undefined) {
        board[move] = ai;
        cells[move].textContent = ai;
        cells[move].classList.add(ai);
        currentPlayer = currentPlayer === ai ? human : ai;
        let result = checkWin(board);
        if(result) {
            updateScores(result);
            board = Array(9).fill(null);
            cells.forEach(cell => cell.textContent = '');
            cells.forEach(cell => cell.classList.remove(human, ai));
        }
    }
}

function minimax(board, depth, isMaximizingPlayer) {
    let result = checkWin(board);
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = ai;
                let score = minimax(board, depth + 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = human;
                let score = minimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

resetBoard(human);
