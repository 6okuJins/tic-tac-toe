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
    
    buttons.forEach((button) => button.addEventListener('click', () => {
        updateArray(button);
        updateButton(button);
    }));
    function updateArray (button) {
        gameBoard.set(button.dataset.row, button.dataset.column, "x")
    }
    function updateButton (button) {
        const text = gameBoard.get()[button.dataset.row][button.dataset.column];
        if (text) {
            button.innerHTML = text;
        }
    }
    function reset () {
        gameBoard.reset();
        buttons.forEach((button) => {
            button.innerHTML = '';
        });
    }

    return {reset}
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