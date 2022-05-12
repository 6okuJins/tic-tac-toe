const gameBoard = (() => {
    let array = Array(3).fill();
    const reset = () => {
        array = array.map(() => Array(3).fill())
    };
    reset();
    const get = () => array;
    const set = (i, j, value) => {
        if (!(array[i][j])){
            array[i][j] = value;
        }
    }
        return {
        reset,
        get,
        set
    }
})();

const displayController = (() => {
    const buttons = document.querySelectorAll('.game-board>button');
    const resetButton = document.querySelector('button.reset');
    const announce = document.querySelector('.announce')
    const Player1 = Player('X');
    const Player2 = Player('O');

    let round = 0;
    let stagedPlayer = Player1;
    let gameOver = false;
    announce.textContent = stagedPlayer.getMarker() + "'s turn."

    resetButton.addEventListener('click', () => {
        reset();
        announce.textContent = stagedPlayer.getMarker() + "'s turn.";
    });
    buttons.forEach((button) => button.addEventListener('click', () => {
        if (gameOver) {
            return
        }
        stagedPlayer = checkTurn();
        updateArray(button);
        updateButton(button);
        round++;
        announce.textContent = checkTurn().getMarker() + "'s turn."

        gameOver = checkGameOver();
        if (gameOver) {
            announce.textContent = stagedPlayer.getMarker() + " wins!";
        }
    }));
    function updateArray (button) {
        gameBoard.set(button.dataset.row, button.dataset.column, stagedPlayer.getMarker());
    }
    function updateButton (button) {
        const text = gameBoard.get()[button.dataset.row][button.dataset.column];
        if (text) {
            button.innerHTML = text;
        }
    }
    function checkTurn () {
        return (round % 2 ? Player2 : Player1)
    }
    function checkGameOver () {
        if (round == 9){
            return true
        }

        const matrix = gameBoard.get();
        const transpose =
        // create a mapping to an array the size of a row from the original matrix. Each element in the array will be a new row.
        matrix[0].map((_, i) =>
        // map the ith element of each row from the original matrix to the ith row of transpose
        matrix.map(row => row[i]));
        return (checkCompleteRow(matrix) || checkCompleteRow(transpose) || checkCompleteDiagonal(matrix))
    }
    function getRound () {
        return round
    }
    function checkCompleteRow (matrix) {
        let result = false;
        matrix.every(row => {
            const set = new Set(row);
            // when converted to a set, a complete row will only contain 1 element
            if (!set.has(undefined) && set.size == 1) {
                result = true;
                return false
            }
            return true
        })
        return result
    }
    function checkCompleteDiagonal (matrix) {
        let result = false;
        if (matrix[1][1]){
            if (matrix[0][0] == matrix[1][1] && matrix[1][1] == matrix[2][2]) {
                result = true;
            }
            else if (matrix[0][2] == matrix[1][1] && matrix[1][1] == matrix[2][0]) {
                result = true;
            }
        }
        return result
    }
    function reset () {
        gameOver = false;
        round = 0;
        stagedPlayer = Player1;
        gameBoard.reset();
        buttons.forEach((button) => {
            button.innerHTML = '';
        });
    }

    return {reset, checkGameOver, getRound}
})();

function Player (marker) {
    const getMarker = () => marker;
    const setMarker = (newMarker) => {
        marker = newMarker;
    }
    return {
        getMarker,
        setMarker
    }

}