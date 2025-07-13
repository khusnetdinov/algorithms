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

// https://contest.yandex.ru/contest/22449/problems/L/?success=140130106#2989/2020_04_14/KQUhHWBJrB
function getExcessiveLetter(firstLine, secondLine) {
    // Ваше решение
    let result = {};

    for (let index = 0; index < firstLine.length; index += 1) {
        let char = firstLine[index];

        if (char in result) {
            result[char] = result[char] + 1;
        } else {
            result[char] = 1;
        }
    }

    for (let index = 0; index < secondLine.length; index += 1) {
        let char = secondLine[index];

        if (char in result) {
            if (result[char] === 1) {
                delete result[char];
            } else {
                result[char] = result[char] - 1;
            }
        } else {
            result[char] = -1;
        }
    }

    let keys = Object.keys(result);
    // console.log(JSON.stringify(keys));

    return keys;
}

function solve() {
    const firstLine = readLine();
    const secondLine = readLine();
    process.stdout.write(`${getExcessiveLetter(firstLine, secondLine)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}

function readLine() {
    const line = _inputLines[_curLine];
    _curLine++;
    return line;
}