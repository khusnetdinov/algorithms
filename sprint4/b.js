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

// https://contest.yandex.ru/contest/23991/run-report/141361333/
function zeroSumLength(collection) {
    // console.log(`Collection = ${collection}`)

    let currentSum = 0
    let maxLength = 0
    let sums = {}

    for (let index = 0; index < collection.length; index += 1) {
        if (collection[index] === 0) {
            currentSum += -1
        } else {
            currentSum += 1
        }

        // console.log(`CurrentSum = ${ currentSum }, MaxLength = ${ maxLength }`)

        if (currentSum === 0) {
            maxLength = Math.max(maxLength, index + 1)
        }

        if (currentSum in sums) {
            maxLength = Math.max(maxLength, index - sums[currentSum])
        } else {
            sums[currentSum] = index
        }
    }

    // console.log(`CurrentSum = ${ currentSum }, MaxLength = ${ maxLength }`)

    // console.log(JSON.stringify(sums))

    return maxLength
}

function solve() {
    const _count = readInt();
    const collection = readArray();

    process.stdout.write(`${zeroSumLength(collection)}`);
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