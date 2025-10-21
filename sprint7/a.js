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

// https://contest.yandex.ru/contest/25596/run-report/144192474/


function trades(collection) {
    let result = 0

    if (collection.length < 2) {
        return result
    }

    for (let index = 0; index < collection.length - 1; index += 1) {
        const current_price = collection[index]
        const next_price = collection[index + 1]

        if (next_price > current_price) {
            result = result + next_price - current_price
        }
    }

    return result
}

function solve() {
    const _ = readInt()
    const collection = readArray();

    process.stdout.write(`${ trades(collection) }`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
    _curLine += 1;
    return arr;
}
