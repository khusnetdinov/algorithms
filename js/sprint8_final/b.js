// https://contest.yandex.ru/contest/26133/problems/B/#51450/2020_07_21/q5eMaCPDPy

/*
* -- ПРИНЦИП РАБОТЫ --
* Используется динамическое программирование:
* - dp[i] = true, если первые i символов строки можно разбить на слова
* - Начинаем с dp[0] = true (пустая строка всегда разбивается)
* - Для каждой позиции i проверяем все слова из списка:
*   Если слово длины L заканчивается на позиции i И dp[i - L] = true (префикс до слова разбивается), тогда dp[i] = true, гдe:
*   l - средняя длина слова

* -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
* - O(n * m * l), где:
*   n - длина текста
*   m - количество слов
*   l - средняя длина слова

* -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
* - O(n) - массив dp длиной n + 1
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

function canSegmentText(text, words) {
    const dp = new Array(text.length + 1).fill(false);
    dp[0] = true;

    for (let index = 1; index <= text.length; index += 1) {
        if (dp[index]) continue;

        for (const word of words) {
            const wordLen = word.length;
            if (index < wordLen) continue;

            if (dp[index - wordLen] && text.substring(index - wordLen, index) === word) {
                dp[index] = true;
                break;
            }
        }
    }

    return dp[text.length];
}

function solve() {
    const string = readArray()
    const count = readInt()
    const collection = readLines(count);

    process.stdout.write(`${ canSegmentText(string, collection) ? "YES" : "NO" }`);
}

function readArray() {
    var arr = _inputLines[_curLine].trim();
    _curLine += 1;
    return arr;
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readLines(linesCount) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray())
    }
    return arr;
}
