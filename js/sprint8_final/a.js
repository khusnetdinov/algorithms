// https://contest.yandex.ru/contest/26133/run-report/145987962/

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
* 2. ПОСЛЕДОВАТЕЛЬНЫЙ ПОИСК ОБЩЕГО ПРЕФИКСА
* - Распаковываем первую строку и используем её как начальный префикс
* - Для каждой следующей строки находим общий префикс между текущим префиксом и распакованной строкой
* - Обновляем текущий префикс или если префикс становится пустым - досрочно завершаем обработку

* -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
*   Общая сложность будет O(n * (l + l)) ~ O(n * l)
* - где:
*   n - количество строк
*   l - максимальная длина распакованной строки

* -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
* - Распаковка одной строки: O(l)
* - Хранение всех распакованных строк: O(n × l)
* - Общая сложность: O(n × l)
* - где:
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

function findCommonPrefix(string, target) {
    const minLength = Math.min(string.length, target.length);
    let commonLength = 0;

    for (let index = 0; index < minLength; index += 1) {
        if (string[index] === target[index]) {
            commonLength += 1;
        } else {
            break;
        }
    }

    return string.substring(0, commonLength);
}

function packedPrefix(collection) {
    if (collection.length === 0) return '';

    // ~
    let currentPrefix = unpack(collection[0]);

    // O(collection)
    for (let index = 1; index < collection.length; index += 1) {
        if (currentPrefix.length === 0) {
            break;
        }

        // O(unpack(collection[index]).length)
        const nextString = unpack(collection[index]);

        // O(unpack(collection[index]).length)
        currentPrefix = findCommonPrefix(currentPrefix, nextString);
    }

    return currentPrefix;
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
