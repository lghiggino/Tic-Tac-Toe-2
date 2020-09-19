const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];



const restart = () => {
    replayMessage.classList.remove("show");
    clearGrid()
    enableListeners();
};

const clearGrid = () => {
    grid().forEach(_qEl => _qEl.innerText = "");
    grid().forEach(_qEl => _qEl.classList.remove("winner"));
}

const replayMessage = document.querySelector("#replay");
const replayButton = document.querySelector("#replayBtn").addEventListener("click", restart)

const grid = () => Array.from(document.querySelectorAll(".q")); 
const qNumId = (qEl) => Number.parseInt(qEl.id.replace("q", ""));
const emptyQs = () => grid().filter(_qEl => _qEl.innerText === "");
const allSame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== "");

const takeTurn = (index, letter) => grid()[index].innerText = letter;
const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]);

const endGame = (winningSequence) => {
    winningSequence.forEach(_qEl => _qEl.classList.add("winner"));
    disableListeners()
    replayMessage.classList.add("show")
};
const checkForVictory = () => {
    let victory = false;

    winningCombos.forEach(_combo => {
        const _grid = grid();
        const sequence = [_grid[_combo[0]], _grid[_combo[1]], _grid[_combo[2]]];
        if (allSame(sequence)) {
            victory = true;
            endGame(sequence)
        } else if (!allSame(sequence) && emptyQs().length === 0){
            replayMessage.classList.add("show")
        }
    });

    return victory;
};

const opponentTurn = () => {
    disableListeners();
    setTimeout(() => {
        takeTurn(opponentChoice(), "o");
        if(!checkForVictory())
        enableListeners();
    }, 1000 * Math.random());
}

const clickFn = (e) => {
    takeTurn(qNumId(e.target), "x");
    if(!checkForVictory())
    opponentTurn();
};

const enableListeners = () => grid().forEach(_qEl => _qEl.addEventListener("click", clickFn))
const disableListeners = () => grid().forEach(_qEl => _qEl.removeEventListener("click", clickFn))

enableListeners()