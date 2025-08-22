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

function hash(base, module, string) {
    // console.log(base, module, string)

    let result = 0;

    if (string.length === 0) return result

    for (let index = 0; index < string.length; index += 1) {
        result = (result * base + string[index].charCodeAt(0)) % module;
    }

    return result
}

function subHash(base, module, string, collection) {
    let result = []

    // console.log(base, module, string, collection)

    for (let index = 0; index < collection.length; index += 1) {
        const startIndex = parseInt(collection[index][0], 10) - 1
        const endIndex = parseInt(collection[index][1], 10)
        // console.log(`Start = ${ startIndex }, End = ${ endIndex }`)

        result.push(hash(base, module, string.slice(startIndex, endIndex)))
    }

    return result
}

function solve() {
    const base = readInt();
    const module = readInt();
    const string = readArray();
    const count = readInt()
    const collection = readLines(count)

    process.stdout.write(`${subHash(base, module, string[0], collection).join('\n')}`);
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
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray())
    }
    return arr;
}
