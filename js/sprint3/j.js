const _readline = require('readline');
const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    if (_inputLines.length < 2) {
        _inputLines.push(line);
    }
});

process.stdin.on('end', solve);

// https://contest.yandex.ru/contest/23638/run-report/140775916/
function bubbleSort(collection) {
    let result = []
    const collectionSize = collection.length;
    // console.log(`Collection = ${ collection }, Size = ${ collectionSize }`)

    for (let sortIndex = 1; sortIndex < collectionSize; sortIndex += 1) {
        // console.log(`==> SortIndex = ${ sortIndex }`);

        let isSorted = true;
        for (let swapIndex = 0; swapIndex < collectionSize - sortIndex; swapIndex += 1) {
            // console.log(`SortIndex = ${ sortIndex }, swapIndex = ${ swapIndex }, RestIndex = ${ collectionSize - sortIndex }`);

            if (collection[swapIndex] > collection[swapIndex + 1]) {
                const tempSwapValue = collection[swapIndex];

                collection[swapIndex] = collection[swapIndex + 1];
                collection[swapIndex + 1] = tempSwapValue;
                isSorted = false;
            }
        }

        if (isSorted) {
            break;
        }

        result.push(collection.join(' '))
    }

    if (result.length === 0) result.push(collection.join(' '))

    return result
}

function solve() {
    const _num = readInt();
    const collection = readArray();

    // console.log(_inputLines, _num, collection);

    process.stdout.write(`${bubbleSort(collection).join('\n')}`);
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
