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

// https://contest.yandex.ru/contest/22450/problems/A/?success=140192558#51450/2020_11_13/VxxSc5X0LZ
function getNearestZero(collection) {
    // Ваше решение
    // console.log(`Collection = ${ collection }`);

    let result = [];
    let leftIndex = 0;
    let leftCurrentZeroIndex = -1;
    let fromLeft = []
    let rightIndex = collection.length - 1;
    let rightCurrentZeroIndex = -1;
    let fromRight = []

    if (collection.length === 1) {
        return [0];
    }

    while (leftIndex < collection.length || rightIndex >= 0) {
        let left = collection[leftIndex];
        // console.log(`Left ${ left }, Index = ${ leftIndex }, LeftCurrentZeroIndex = ${ leftCurrentZeroIndex }`);

        if (left === 0) {
            leftCurrentZeroIndex = leftIndex;

            fromLeft[leftIndex] = 0;
        } else {
            if (leftCurrentZeroIndex >= 0) {
                fromLeft[leftIndex] = leftIndex - leftCurrentZeroIndex
            } else {
                fromLeft[leftIndex] = leftCurrentZeroIndex
            }
        }
        // console.log(`FromLeft   = ${ fromLeft }`)

        leftIndex += 1;

        let right = collection[rightIndex];
        // console.log(`Right ${ right }, Index = ${ rightIndex }, rightCurrentZeroIndex = ${ rightCurrentZeroIndex }`);

        if (right === 0) {
            rightCurrentZeroIndex = rightIndex;

            fromRight[rightIndex] = 0;
        } else {
            if (rightCurrentZeroIndex >= 0) {
                fromRight[rightIndex] = rightCurrentZeroIndex - rightIndex
            } else {
                fromRight[rightIndex] = rightCurrentZeroIndex
            }
        }
        // console.log(`FromRight  = ${ fromRight }`)

        rightIndex -= 1
    }

    // console.log(`FromLeft   = ${ fromLeft }`)
    // console.log(`FromRight  = ${ fromRight }`)

    for (let index = 0; index < collection.length; index += 1) {
        const left = fromLeft[index];
        const right = fromRight[index];

        if ((right === left) && (left === 0)) {
            result[index] = 0
        } else if ((left > 0) && (right > 0) && left !== right) {
            if (left > right) {
                result[index] = right
            } else {
                result[index] = left
            }
        } else {
            if (left > 0) {
                result[index] = left
            } else {
                result[index] = right
            }
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
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
