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

// https://contest.yandex.ru/contest/25596/run-report/144481863/

function countWays(m, denominations) {
    // Создаем массив dp размером m+1, заполняем нулями
    const dp = new Array(m + 1).fill(0);

    // Нулевую сумму можно набрать 1 способом - взять 0 банкнот
    dp[0] = 1;

    // Перебираем все номиналы по одному
    for (let d of denominations) {
        // Для каждой суммы от текущего номинала до m
        for (let i = d; i <= m; i++) {
            // Добавляем способы, которые получаются использованием банкноты d
            dp[i] += dp[i - d];
        }
    }

    return dp[m];
}
function solve() {
    const sum = readInt();
    const k = readInt();
    const denominations = readArray();

    const result = countWays(sum, denominations);
    process.stdout.write(`${ result }`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(' ').map(Number);
    _curLine++;
    return arr;
}