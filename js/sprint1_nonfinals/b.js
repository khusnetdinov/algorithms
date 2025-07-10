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

// https://contest.yandex.ru/contest/22449/problems/B/?success=140041469#51450/2020_11_13/KooQ6zUghr
function checkParity(a, b, c) {
    // Ваше решение
    // console.log(`A = ${ a }, B = ${ b }, C = ${c }`);
    const numbers = [a, b, c];
    // console.log(`[] = ${ numbers }`);

    const parities = numbers.map(number => number % 2 === 0);
    // console.log(`Parity = ${ parities }`);

    const isSameParity = new Set(parities).size == 1;

    return isSameParity;
}

function solve() {
    const inputNumbers = readArray();
    const a = inputNumbers[0]
    const b = inputNumbers[1]
    const c = inputNumbers[2]
    if (checkParity(a, b, c)) {
        process.stdout.write("WIN");
    } else {
        process.stdout.write("FAIL");
    }
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
