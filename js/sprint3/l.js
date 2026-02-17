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

// https://contest.yandex.ru/contest/23638/run-report/140726303/

function search(days, price) {
    return [
        binarySearch(days, price, 0, days.length),
        binarySearch(days, 2 * price, 0, days.length)
    ];
}

function binarySearch(days, target, left, right) {
    // console.log(`Days = ${ days }, Target = ${ target }, Left = ${ left }, Right = ${ right }`)

    if (right <= left) {
        if (days[left] <= target || days[left] > target) return left + 1;

        return -1
    }

    const mid = Math.floor((left + right) / 2);
    if (days[mid - 2] < target && days[mid - 1] >= target) {
        return mid
    } else {
        if (days[mid] < target) {
            return binarySearch(days, target, mid + 1, right)
        } else {
            return binarySearch(days, target, left, mid);
        }
    }
}

function solve() {
    const _count = readInt();
    const days = readArray();
    const price = readInt();
    process.stdout.write(`${search(days, price).join(' ')}`);
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
