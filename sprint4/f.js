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

// https://contest.yandex.ru/contest/23991/run-report/141463152/
function subHashes(base, module, string, collection) {
    let result = []

    // basePowers[index] = pⁱ mod m
    const basePowers = new Array(string.length + 1);
    basePowers[0] = 1;
    for (let index = 1; index <= string.length; index += 1) {
        basePowers[index] = (basePowers[index - 1] * base) % module;
    }

    const prefixHashes = new Array(string.length + 1);
    prefixHashes[0] = 0;
    for (let index = 0; index < string.length; index += 1) {
        const charCode = string.charCodeAt(index);
        prefixHashes[index + 1] = (prefixHashes[index] * base + charCode) % module;
    }

    for (let index = 0; index < collection.length; index += 1) {
        const left = parseInt(collection[index][0], 10) - 1;
        const right = parseInt(collection[index][1], 10) - 1;

        const length = right - left + 1;
        let hash = (prefixHashes[right + 1] - prefixHashes[left] * basePowers[length]) % module;

        if (hash < 0) {
            hash += module;
        }

        result.push(hash);
    }

    // Не эффективное решение:
    // for (let index = 0; index < collection.length; index += 1) {
    //     const startIndex = parseInt(collection[index][0], 10) - 1
    //     const endIndex = parseInt(collection[index][1], 10)
    //     // console.log(`Start = ${ startIndex }, End = ${ endIndex }`)
    //
    //     result.push(hash(base, module, string.slice(startIndex, endIndex)))
    // }

    return result;
}

function solve() {
    const base = readInt();
    const module = readInt();
    const string = readArray();
    const count = readInt()
    const collection = readLines(count)

    process.stdout.write(`${subHashes(base, module, string[0], collection).join('\n')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split(' ');
    _curLine++;
    return arr;
}

function readLines(linesCount) {
    var arr = [];
    for (let index = 0; index !== linesCount; index++) {
        arr.push(readArray())
    }
    return arr;
}
