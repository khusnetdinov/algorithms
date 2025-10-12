// https://contest.yandex.ru/contest/25597/run-report/144761179/

/*
* -- ПРИНЦИП РАБОТЫ --
* Алгоритм вычисления расстояния Левенштейна (редакционного расстояния) между двумя строками:
* - Используется динамическое программирование с двумерной таблицей dp[i][j]
* - dp[i][j] хранит минимальное количество операций для преобразования префикса первой строки длины i в префикс второй строки длины j
* - Базовые случаи:
*   * dp[i][0] = i (удалить i символов из первой строки)
*   * dp[0][j] = j (вставить j символов во вторую строку)
* - Для каждой пары символов рассматриваются 3 операции:
*   * Удаление (dp[i - 1][j] + 1)
*   * Вставка (dp[i][j - 1] + 1)
*   * Замена (dp[i - 1][j - 1] + 1, если символы разные)
* - Если символы совпадают, стоимость замены = 0
*
* -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
* - Заполнение таблицы размером (n + 1) × (m + 1), где n и m - длины строк
* - Каждая ячейка заполняется за O(1) операций
* - Общая временная сложность: O(n × m)
*
* -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
* - Используется двумерный массив размером (n + 1) × (m + 1)
* - Пространственная сложность: O(n × m)
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
    const dp = Array.from({ length: string.length + 1 }, () => new Array(target.length + 1).fill(0));

    for (let stringIndex = 0; stringIndex <= string.length; stringIndex += 1) {
        dp[stringIndex][0] = stringIndex;
    }
    for (let targetIndex = 0; targetIndex <= target.length; targetIndex += 1) {
        dp[0][targetIndex] = targetIndex;
    }

    for (let stringIndex = 1; stringIndex <= string.length; stringIndex += 1) {
        for (let targetIndex = 1; targetIndex <= target.length; targetIndex += 1) {
            if (string[stringIndex - 1] === target[targetIndex - 1]) {
                dp[stringIndex][targetIndex] = dp[stringIndex - 1][targetIndex - 1];
            } else {
                const deleteAction = dp[stringIndex - 1][targetIndex];
                const insertAction = dp[stringIndex][targetIndex - 1];
                const updateAction = dp[stringIndex - 1][targetIndex - 1];

                dp[stringIndex][targetIndex] = 1 + Math.min(deleteAction, insertAction, updateAction);
            }
        }
    }

    return dp[string.length][target.length];
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
