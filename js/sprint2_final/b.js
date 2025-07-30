// https://contest.yandex.ru/contest/22450/run-report/140366447/
const _readline = require('readline');
const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

function getScores(keys, board) {
    // Ваше решение
    const PLAYERS = 2;
    const MAX_GAMES = 9;

    let result = 0
    let keyboard = board.flat();
    let buttonCounted = {}

    for (let index = 0; index < keyboard.length; index += 1) {
        let button = keyboard[index];

        buttonCounted[button] = (buttonCounted[button] ?? 0) + 1
    }

    for (let gameTry = 1; gameTry < MAX_GAMES + 1; gameTry += 1) {
        if (gameTry in buttonCounted) {
            const requiredButtonsPushed = buttonCounted[gameTry];

            if (requiredButtonsPushed <= PLAYERS * keys) {
                result += 1;
            }
        }
    }

    return result;
}

function solve() {
    const k = readInt();
    const board = readMatrix(4);

    process.stdout.write(`${getScores(k, board)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split("");
    _curLine++;
    return arr;
}

function readMatrix(rowsCount) {
    var arr = [];
    for (let i = 0; i !== rowsCount; i++) {
        arr.push(readArray())
    }
    return arr;
}
