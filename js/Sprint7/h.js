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

// https://contest.yandex.ru/contest/25596/run-report/144587605/

function flowers(n, m, lines) {
    // Правильно создаем матрицу dp - каждая строка должна быть отдельным массивом
    let dp = Array.from({ length: n }, () => new Array(m).fill(0));

    // Инициализация стартовой клетки (левый нижний угол)
    dp[n-1][0] = lines[n-1][0] === 1 ? 1 : 0;

    // Заполняем первый столбец (движение только вверх)
    for (let i = n-2; i >= 0; i -= 1) {
        dp[i][0] = dp[i+1][0] + (lines[i][0] === 1 ? 1 : 0);
    }

    // Заполняем последнюю строку (движение только вправо)
    for (let j = 1; j < m; j += 1) {
        dp[n-1][j] = dp[n-1][j-1] + (lines[n-1][j] === 1 ? 1 : 0);
    }

    // Заполняем остальную часть матрицы
    for (let i = n-2; i >= 0; i--) {
        for (let j = 1; j < m; j++) {
            dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]) + (lines[i][j] === 1 ? 1 : 0);
        }
    }

    return dp[0][m-1];
}

function solve() {
    const data = readArray(" ");
    const lines = readLines(data[0], '')

    process.stdout.write(`${ flowers(data[0], data[1], lines) }`);
}

function readArray(separator) {
    const arr = _inputLines[_curLine].trim().split(separator).map(Number);
    _curLine++;
    return arr;
}

function readLines(linesCount, separator) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray(separator))
    }
    return arr;
}