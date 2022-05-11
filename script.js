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
    const Player1 = Player('X');
    const Player2 = Player('O');

    let round = 0;
    let stagedPlayer;
    let gameOver = false;

    buttons.forEach((button) => button.addEventListener('click', () => {
        if (gameOver) {
            return
        }
        stagedPlayer = checkTurn();
        updateArray(button);
        updateButton(button);
        round++;
        gameOver = checkGameOver();
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
        return false
    }
    function getRound () {
        return round
    }
    function reset () {
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