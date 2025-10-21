// https://contest.yandex.ru/contest/23638/run-report/140724206/
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


// https://contest.yandex.ru/contest/23638/run-report/140871141/
// Ваше решение
function getMaxCombination(limit, collection) {
    let result = 0
    let totalSpent = 0;
    let houseIndex = 0;
    let housesByPrice  = collection.sort((a, b) => a - b)

    while (houseIndex < housesByPrice.length && totalSpent + housesByPrice[houseIndex] <= limit) {
        totalSpent += housesByPrice[houseIndex];
        result += 1;
        houseIndex += 1;
    }

    return result
}

function solve() {
    const [_count, limit] = readArray();
    const collection = readArray();
    process.stdout.write(`${getMaxCombination(limit, collection)}`);
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
