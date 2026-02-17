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

// https://contest.yandex.ru/contest/23991/run-report/141794538/

function maxSub(collection) {
    let result = 0
    let left = 0
    let chars = new Set();

    // console.log(`Collection = ${collection}`);

    for (let right = 0; right < collection.length; right += 1) {
        const currentChar = collection[right];

        while (chars.has(currentChar)) {
            chars.delete(collection[left]);
            left += 1;
        }

        chars.add(currentChar);

        result = Math.max(result, right - left + 1);
    }

    return result;
}

function solve() {
    const collection = readArray()
    process.stdout.write(`${maxSub(collection)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine += 1;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split("");
    _curLine += 1;
    return arr;
}
