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

// https://contest.yandex.ru/contest/22449/run-report/140040412/
function evaluateFunction(x, a, b, c) {
    // Ваше решение
    // console.log(`X = ${ x }, A = ${ a }, B = ${ b }, C = ${c }`);

    return a * x * x + b * x + c;
}

function solve() {
    const inputNumbers = readArray();
    const a = inputNumbers[0]
    const x = inputNumbers[1]
    const b = inputNumbers[2]
    const c = inputNumbers[3]
    process.stdout.write(`${evaluateFunction(x, a, b, c)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
