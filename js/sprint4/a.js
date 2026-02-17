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

// https://contest.yandex.ru/contest/23991/run-report/141153570/
function clubs(collection) {
    let clubs = new Set;

    for (let club of collection) {
        clubs.add(club)
    }

    // console.log(collection)
    // console.log(clubs)

    return Array.from(clubs)
}

function solve() {
    const linesCount = readInt();
    const collection = readLines(linesCount);

    process.stdout.write(`${clubs(collection).join('\n')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine];
    _curLine++;
    return arr;
}

function readLines(linesCount) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray())
    }
    return arr;
}
