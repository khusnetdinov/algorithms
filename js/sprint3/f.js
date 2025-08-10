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

// https://contest.yandex.ru/contest/23638/run-report/140872188/
function triangle(collection) {
    let result = 0
    let sortedSides = collection.sort((a, b) => b - a)

    // console.log(sortedSides)

    for (let windowIndex = 0; windowIndex < collection.length - 2; windowIndex += 1) {
        // console.log(sortedSides[windowIndex], sortedSides[windowIndex + 1],  sortedSides[windowIndex + 2])

        if (sortedSides[windowIndex] < sortedSides[windowIndex + 1] + sortedSides[windowIndex + 2]) {
            result = sortedSides[windowIndex] + sortedSides[windowIndex + 1] + sortedSides[windowIndex + 2]

            break
        }
    }

    return result
}

function solve() {
    const count = readInt();
    const collection = readArray();

    process.stdout.write(`${ triangle(collection) }`);
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
