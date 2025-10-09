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

// https://contest.yandex.ru/contest/25596/run-report/144477196/

function gold(maxMass, collection) {
    let sorted = collection.sort((prev, next) => next[0] - prev[0])
    let remainingCapacity = maxMass
    let result = 0

    for (const heap of sorted) {
        if (remainingCapacity === 0) {
            break;
        }

        if (heap[1] <= remainingCapacity) {
            result += heap[0] * heap[1]
            remainingCapacity -= heap[1];
        } else {
            result += heap[0] * remainingCapacity;
            remainingCapacity = 0;
        }
    }

    return result
}

function solve() {
    const maxMass = readInt()
    const count = readInt()
    const collection = readLines(count);
    const result = gold(maxMass, collection);

    process.stdout.write(`${ result}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readLines(linesCount) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray())
    }
    return arr;
}


function readArray() {
    var arr = _inputLines[_curLine].trim().split(" ").map(el => parseFloat(el));
    _curLine += 1;
    return arr;
}
