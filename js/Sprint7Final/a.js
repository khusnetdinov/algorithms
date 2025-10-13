// https://contest.yandex.ru/contest/25597/run-report/144761179/

/*
* -- ПРИНЦИП РАБОТЫ --
* Алгоритм вычисления расстояния Левенштейна между двумя строками:
* - previousRow хранит результаты для предыдущей строки (dp[i-1][j])
* - currentRow вычисляет результаты для текущей строки (dp[i][j])
* Базовые случаи:
* - previousRow[j] = j (преобразование пустой строки в префикс длины j)
* - currentRow[0] = i (преобразование префикса длины i в пустую строку)
* Для каждой пары символов рассматриваются 3 операции:
* - Удаление (previousRow[j] + 1)
* - Вставка (currentRow[j - 1] + 1)
* - Замена (previousRow[j - 1] + cost), где cost = 0 если символы совпадают, иначе 1

* -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
* - Общая временная сложность: O(n × m), где n и m - длины строк

* -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
* - Пространственная сложность: O(min(n, m))
* - где n и m - длины строк
*/

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

function levenshteinDistance(string, target) {
    const stringLength = string.length;
    const targetLength = target.length;

    if (stringLength === 0) return targetLength;
    if (targetLength === 0) return stringLength;

    let previousRow = new Array(targetLength + 1);
    let currentRow = new Array(targetLength + 1);

    for (let targetIndex = 0; targetIndex <= targetLength; targetIndex += 1) {
        previousRow[targetIndex] = targetIndex;
    }

    for (let stringIndex = 1; stringIndex <= stringLength; stringIndex += 1) {
        currentRow[0] = stringIndex;

        for (let targetIndex = 1; targetIndex <= targetLength; targetIndex += 1) {
            if (string[stringIndex - 1] === target[targetIndex - 1]) {
                currentRow[targetIndex] = previousRow[targetIndex - 1];
            } else {
                const deleteAction = previousRow[targetIndex];
                const insertAction = currentRow[targetIndex - 1];
                const updateAction = previousRow[targetIndex - 1];

                currentRow[targetIndex] = 1 + Math.min(deleteAction, insertAction, updateAction);
            }
        }

        [previousRow, currentRow] = [currentRow, previousRow];
    }

    return previousRow[targetLength];
}

function solve() {
    const string = readArray();
    const target = readArray();

    process.stdout.write(`${ levenshteinDistance(string, target) }`);
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split('');
    _curLine += 1;
    return arr;
}