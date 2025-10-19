// https://contest.yandex.ru/contest/26133/run-report/145853400/

/*
* -- ПРИНЦИП РАБОТЫ --
* Алгоритм состоит из двух основных этапов:
*
* 1. РАСПАКОВКА СТРОК
* Используется стековый алгоритм для обработки запакованных строк:
* - currentString - накапливает текущую распакованную часть
* - currentNum - сохраняет число повторений для следующего паттерна
* - При встрече '[': текущее состояние (строка и число) сохраняется в стек
* - При встрече ']': из стека извлекается предыдущее состояние и текущая строка повторяется нужное количество раз
* - Буквы и цифры обрабатываются по мере чтения строки
*
* 2. ПОИСК ОБЩЕГО ПРЕФИКСА
* После распаковки всех строк:
* - Находим минимальную длину среди всех распакованных строк
* - Последовательно сравниваем символы на одинаковых позициях во всех строках
* - Как только находим несовпадение - останавливаемся
* - Собираем общую часть до первого несовпадения

* -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
*
* Пусть:
* - Распаковка одной строки: O(l)
* - Распаковка всех строк: O(n * l)
* - Поиск общего префикса: O(n * m)
* - ОБЩАЯ: O(n * l + n * m) ~ O(n * l + n * l) ~ O(n * l), где
*   n - количество строк
*   l - максимальная длина распакованной строки
*   m - длина найденного общего префикса

* -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
* - Распаковка одной строки: O(l)
* - Хранение всех распакованных строк: O(n × l)
* - ОБЩАЯ: O(n × l), где
*   n - количество строк
*   l - максимальная длина распакованной строки
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

function unpack(string) {
    const stack = [];

    let currentString = '';
    let currentNum = 0;

    for (let index = 0; index < string.length; index += 1) {
        const char = string[index];

        if (char >= '0' && char <= '9') {
            currentNum = currentNum * 10 + parseInt(char, 10);
        } else if (char === '[') {
            stack.push({ string: currentString, num: currentNum });
            currentString = '';
            currentNum = 0;
        } else if (char === ']') {
            const { string: prev, num: repeatCount } = stack.pop();
            currentString = prev + currentString.repeat(repeatCount);
        } else {
            currentString += char;
        }
    }

    return currentString;
}

function packedPrefix(collection) {
    const unpacked = collection.map(unpack)
    // console.log(unpacked)

    const minLength = Math.min(...unpacked.map(s => s.length));

    let prefix = '';
    for (let index = 0; index < minLength; index += 1) {
        const currentChar = unpacked[0][index];

        if (unpacked.every(s => s[index] === currentChar)) {
            prefix += currentChar;
        } else {
            break;
        }
    }

    return prefix;
}

function solve() {
    const count = readInt()
    const collection = readLines(count);

    process.stdout.write(`${ packedPrefix(collection) }`);
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
