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

// https://contest.yandex.ru/contest/23638/run-report/140896609/
function partialSort(collection) {
    let result = 0;
    let currentMax = 0;

    for (let index = 0; index < collection.length; index += 1) {
        currentMax = Math.max(currentMax, collection[index]);
        if (index === currentMax) {
            result += 1;
        }
    }

    return result;
}

function solve() {
    const count = readInt();
    const collection = readArray();

    process.stdout.write(`${partialSort(collection)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
