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

// https://contest.yandex.ru/contest/23991/run-report/141796994/

function anagramsCount(collection) {
    let words = new Map()

    for (let index = 0; index < collection.length; index += 1) {
        let word = collection[index].split('').sort().join()

        if (!words.has(word)) {
            words.set(word, [])
        }

        words.get(word).push(index)
    }

    // console.log(words)

    return Array.from(words.values()).map(value => value.join(' '))
}

function solve() {
    const _ = readInt()
    const collection = readArray()
    process.stdout.write(`${anagramsCount(collection).join('\n')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine += 1;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split(" ");
    _curLine += 1;
    return arr;
}
