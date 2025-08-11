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

// https://contest.yandex.ru/contest/23638/run-report/140895591/
function binarySearchByResult(collection, k) {
    collection.sort((a, b) => a - b);
    
    let left = 0;
    let right = collection[collection.length - 1] - collection[0];
    let result = 0;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const count = countPairsLessOrEqual(collection, mid);

        if (count < k) {
            left = mid + 1;
        } else {
            result = mid;
            right = mid - 1;
        }
    }

    return result;
}

function countPairsLessOrEqual(collection, maxDiff) {
    let count = 0;
    let left = 0;

    for (let right = 1; right < collection.length; right += 1) {
        while (collection[right] - collection[left] > maxDiff) {
            left += 1;
        }
        count += right - left;
    }

    return count;
}

function solve() {
    const count = readInt();
    const collection = readArray();
    const target = readInt()

    process.stdout.write(`${binarySearchByResult(collection, target)}`);
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