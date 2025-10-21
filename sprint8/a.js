// https://contest.yandex.ru/contest/26131/run-report/145171643/

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


function reverse(collection) {
    let result = '';

    for (const word of collection) {
        result = word + " " + result
    }

    return result
}

function solve() {
    const collection = readArray();

    process.stdout.write(`${ reverse(collection) }`);
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split(" ");
    _curLine += 1;
    return arr;
}
