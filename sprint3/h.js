const _readline = require('readline');
const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    if (_inputLines.length < 2) {
        _inputLines.push(line);
    }
});

process.stdin.on('end', solve);

// https://contest.yandex.ru/contest/23638/run-report/140776582/
function biggestNumber(collection) {
    return collection.map(number => number.toString()).sort((prev, next) => {
        const orderPrev = prev + next;
        const orderNext = next + prev;

        return orderNext.localeCompare(orderPrev);
    }).join('')
}

function solve() {
    const _num = readInt();
    const collection = readArray();

    process.stdout.write(`${biggestNumber(collection)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}


function readArray() {
    var arr = _inputLines[_curLine].trim().split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
