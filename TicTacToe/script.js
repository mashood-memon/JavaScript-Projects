const displayController = (() => {
    const renderMessage = (message) => {
        document.getElementById("message").innerHTML = message;
    };

    const renderTurn = (player) => {
        document.getElementById("message").innerHTML = `${player.name}'s turn (${player.mark})`;
    };

    return { renderMessage, renderTurn };
})();

const GameBoard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        let HTMLboard = '';
        gameboard.forEach((square, index) => {
            HTMLboard += `<div class="square" id="square-${index}">${square}</div>`;
        });
        document.getElementById('gameBoard').innerHTML = HTMLboard;
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        });
    };

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    };

    const getGameBoard = () => gameboard;

    return { render, update, getGameBoard };
})();

const createPlayer = (name, mark) => {
    return { name, mark };
};

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.getElementById('player1').value, 'X'),
            createPlayer(document.getElementById('player2').value, 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        GameBoard.render();
        displayController.renderTurn(players[currentPlayerIndex]);
    };

    const handleClick = (e) => {
        if (gameOver) {
            return;
        }
        const index = parseInt(e.target.id.split('-')[1]);
        if (GameBoard.getGameBoard()[index] !== '') return;
        GameBoard.update(index, players[currentPlayerIndex].mark);

        if (checkForWin(GameBoard.getGameBoard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name} WON!`);
        } else if (checkForTie(GameBoard.getGameBoard())) {
            gameOver = true;
            displayController.renderMessage('ITS A TIE!!!');
        } else {
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
            displayController.renderTurn(players[currentPlayerIndex]);
        }
    };

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            GameBoard.update(i, '');
        }
        GameBoard.render();
        document.getElementById('message').innerHTML = '';
        gameOver = false;
        displayController.renderTurn(players[currentPlayerIndex]);
    };

    return { start, handleClick, restart };
})();

function checkForWin(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkForTie(board) {
    return board.every(cell => cell !== '');
}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    Game.start();
});

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
    Game.restart();
});