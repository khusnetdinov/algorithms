https://contest.yandex.ru/contest/22450/run-report/140372717/
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

function getNearestZero(collection) {
    // Ваше решение
    let maxDistance = collection.length;
    let result = [...collection];

    if (collection[0] !== 0) {
        result[0] = maxDistance
    }

    for (let index = 1; index < maxDistance; index += 1) {
        if (collection[index] !== 0) {
            result[index] = (result[index - 1] + 1)
        }
    }

    for (let index = maxDistance - 2; index >= 0; index -= 1) {
        if (result[index] !== 0) {
            result[index] = Math.min(result[index], result[index + 1] + 1);
        }
    }

    return result;
}

function solve() {
    const n = readInt();
    const collection = readArray();
    process.stdout.write(`${getNearestZero(collection).join(' ')}`);
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
