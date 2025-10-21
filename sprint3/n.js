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


// https://contest.yandex.ru/contest/23638/run-report/140826175/
function flowerBeds(collection) {
    let result = []

    collection.sort((prev, next) => prev[0] - next[0])
    // console.log(collection)
    result.push(collection[0]);

    for (let index = 1; index < collection.length; index += 1) {
        // console.log(`Index = ${ index }, Bed = ${ collection[index]}`)
        let prev = result[result.length - 1];
        let next = collection[index];


        if (prev[1] < next[0]) {
            result.push(next)
        } else {
            result[result.length - 1] = [Math.min(prev[0], next[0]), Math.max(prev[1], next[1])]
        }

        // console.log(index, prev, next);
    }

    // console.log(result)

    return result
}

function solve() {
    const linesCount = readInt();
    const collection = readLines(linesCount);

    process.stdout.write(`${flowerBeds(collection).map((el) => el.join(' ')).join('\n')}`);
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

function readLines(linesCount) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray())
    }
    return arr;
}
