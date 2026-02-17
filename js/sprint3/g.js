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

// https://contest.yandex.ru/contest/23638/run-report/140855123/
// Голландская сортировка
function colorsSort(collection) {
    if (collection.length <= 1) {
        return collection
    }

    let low = 0;
    let mid = 0;
    let high = collection.length - 1;

    while (mid <= high) {
        if (collection[mid] === 0) {
            [collection[low], collection[mid]] = [collection[mid], collection[low]];
            low += 1;
            mid += 1;
        } else if (collection[mid] === 1) {
            mid += 1;
        } else {
            [collection[mid], collection[high]] = [collection[high], collection[mid]];
            high -= 1;
        }
    }
    return collection;
}

function solve() {
    const count = readInt();

    if (count === 0) {
        return
    }

    const collection = readArray();

    process.stdout.write(`${ colorsSort(collection).join(' ') }`);
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
