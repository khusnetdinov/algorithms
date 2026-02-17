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

// https://contest.yandex.ru/contest/25596/run-report/144588834/

function flowers(n, m, lines) {
    let dp = Array.from({ length: n }, () => new Array(m).fill(0));
    let path = Array.from({ length: n }, () => new Array(m).fill(''));

    dp[n-1][0] = lines[n-1][0] === 1 ? 1 : 0;

    // Заполняем первый столбец (движение только вверх)
    for (let i = n-2; i >= 0; i -= 1) {
        dp[i][0] = dp[i+1][0] + (lines[i][0] === 1 ? 1 : 0);
        path[i][0] = 'U'; // Пришли снизу (Up)
    }

    // Заполняем последнюю строку (движение только вправо)
    for (let j = 1; j < m; j += 1) {
        dp[n-1][j] = dp[n-1][j-1] + (lines[n-1][j] === 1 ? 1 : 0);
        path[n-1][j] = 'R'; // Пришли слева (Right)
    }

    // Заполняем остальную часть матрицы
    for (let i = n-2; i >= 0; i--) {
        for (let j = 1; j < m; j++) {
            let fromBottom = dp[i+1][j];
            let fromLeft = dp[i][j-1];

            if (fromBottom >= fromLeft) {
                // Пришли снизу
                dp[i][j] = fromBottom + (lines[i][j] === 1 ? 1 : 0);
                path[i][j] = 'U';
            } else {
                // Пришли слева
                dp[i][j] = fromLeft + (lines[i][j] === 1 ? 1 : 0);
                path[i][j] = 'R';
            }
        }
    }

    // Восстанавливаем путь от конечной точки к начальной
    let route = [];
    let i = 0, j = m-1;

    // Идем от конца к началу, пока не достигнем стартовой клетки
    while (!(i === n-1 && j === 0)) {
        route.push(path[i][j]);
        if (path[i][j] === 'U') {
            i += 1; // Шли снизу - двигаемся вниз
        } else {
            j -= 1; // Шли слева - двигаемся влево
        }
    }

    route.reverse();

    return {
        maxFlowers: dp[0][m-1],
        path: route.join('')
    };
}

function solve() {
    const data = readArray(" ");
    const lines = readLines(data[0], '');

    const result = flowers(data[0], data[1], lines);

    process.stdout.write(`${result.maxFlowers}\n`);
    process.stdout.write(`${result.path}\n`);
}

function readArray(separator) {
    const arr = _inputLines[_curLine].trim().split(separator).map(Number);
    _curLine++;
    return arr;
}

function readLines(linesCount, separator) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        // Для чтения строки без разделителя (каждая строка - один массив символов)
        const line = _inputLines[_curLine].trim();
        const row = line.split('').map(Number);
        arr.push(row);
        _curLine++;
    }
    return arr;
}