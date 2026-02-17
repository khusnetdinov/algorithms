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

// https://contest.yandex.ru/contest/25596/run-report/144472700/

function schedule(collection) {
    let sorted = collection.sort((prev, next) => prev[1] - next[1] || prev[0] - next[0])

    let result = []
    let lastEnd = -Infinity;

    for (let interval of sorted) {
        if (interval[0] >= lastEnd) {
            result.push(interval.join(' '))
            lastEnd = interval[1]
        }
    }

    return result
}

function solve() {
    const count = readInt()
    const collection = readLines(count);
    const result = schedule(collection);

    process.stdout.write(`${ result.length}\n`);
    process.stdout.write(`${ result.join("\n") }`);
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
