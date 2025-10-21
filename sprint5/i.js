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

// https://contest.yandex.ru/contest/24809/run-report/142025642/

function countBST(number, memo = {}) {
    if (number === 0 || number === 1) return 1;
    if (memo[number]) return memo[number];

    let result = 0;
    for (let index = 0; index < number; index += 1) {
        result += countBST(index, memo) * countBST(number - 1 - index, memo);
    }

    memo[number] = result;
    return result;
}

function solve() {
    const number = readInt()

    process.stdout.write(`${ countBST(number)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine += 1;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
    _curLine += 1;
    return arr;
}
