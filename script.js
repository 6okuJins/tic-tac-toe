const gameBoard = (() => {
    let array = Array(3).fill();
    const reset = () => {
        array = array.map(() => Array(3).fill())
    };
    reset();
    const get = () => array;
    const set = (i, j, value) => {
        array[i][j] = value;
    }
        return {
        reset,
        get,
        set
    }
})();