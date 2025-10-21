// https://contest.yandex.ru/contest/26131/run-report/145174768/

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


function insert(string, collection) {
    let insertions = new Map();
    for (const insertion of collection) {
        insertions[insertion[1]] = insertion[0]
    }

    let result = ''
    for (let index = 0; index < string.length + 1; index += 1) {
        if (insertions[index.toString()] !== undefined) {
            result += insertions[index]
        }

        if (string[index] !== undefined) {
            result += string[index]
        }
    }

    return result
}

function solve() {
    const string = readArray().split('');
    const count = readInt()
    const collection = readLines(count);

    process.stdout.write(`${ insert(string, collection) }`);
}

function readArray() {
    var arr = _inputLines[_curLine].trim();
    _curLine += 1;
    return arr;
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readLines(linesCount) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray().split(" "))
    }
    return arr;
}

