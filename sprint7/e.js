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

// https://contest.yandex.ru/contest/25596/run-report/144481676/

function minBanknotes(sum, denominations) {
    const INF = Number.MAX_SAFE_INTEGER;

    // Создаем массив dp размером sum + 1, заполняем "бесконечностью"
    const dp = new Array(sum + 1).fill(INF);

    // Нулевую сумму можно набрать 0 банкнотами
    dp[0] = 0;

    // Для каждой суммы от 1 до sum
    for (let i = 1; i <= sum; i++) {
        // Перебираем все номиналы
        for (let j = 0; j < denominations.length; j++) {
            const currentDenomination = denominations[j];

            // Если текущий номинал меньше или равен текущей сумме
            if (currentDenomination <= i) {
                // Пробуем использовать эту банкноту
                dp[i] = Math.min(dp[i], dp[i - currentDenomination] + 1);
            }
        }
    }

    // Если сумму x набрать невозможно, вернем -1
    return dp[sum] === INF ? -1 : dp[sum];
}

function solve() {
    const sum = readInt();
    const k = readInt();
    const denominations = readArray();

    const result = minBanknotes(sum, denominations);
    process.stdout.write(`${ result }`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    // Читаем одну строку и преобразуем в массив чисел
    const arr = _inputLines[_curLine].trim().split(' ').map(Number);
    _curLine++;
    return arr;
}