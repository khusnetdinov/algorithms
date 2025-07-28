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

// https://contest.yandex.ru/contest/22779/run-report/140524124/
function fibo(number) {
    // Ваше решение
    if (number === 0) return 1;
    if (number === 1) return 1;

    return fibo(number - 1) + fibo(number - 2);
}

function solve() {
    const number = readInt();
    const result = fibo(parseInt(number));

    process.stdout.write(result.toString());
}
function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}
