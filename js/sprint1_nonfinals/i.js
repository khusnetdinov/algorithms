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

// https://contest.yandex.ru/contest/22449/problems/I/?success=140120183#2989/2020_04_14/y8KrjDymCP
function isPowerOfFour(number) {
    // Ваше решение
    if (number <= 0) {
        return false;
    }
    while (number % 4 === 0) {
        number = Math.floor(number / 4);
    }
    return number === 1;
}

function solve() {
    const number = readInt();
    if (isPowerOfFour(number)) {
        console.log("True");
    } else {
        console.log("False");
    }
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}