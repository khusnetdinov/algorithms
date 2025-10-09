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

// https://contest.yandex.ru/contest/25596/run-report/144479772/

const MOD = 1000000007n;

function fibonacci(n) {
    if (n === 0 || n === 1) return 1;

    let prev2 = 1n;
    let prev1 = 1n;

    for (let i = 2; i <= n; i++) {
        let current = (prev1 + prev2) % MOD;
        prev2 = prev1;
        prev1 = current;
    }

    return Number(prev1);
}
function solve() {
    const number = readInt()
    const result = fibonacci(number);

    process.stdout.write(`${ result}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}