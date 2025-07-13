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

// https://contest.yandex.ru/contest/22449/problems/G/?success=140110633#2989/2020_04_14/LQj1AqJHrD
function getBinaryNumber(number) {
    // Ваше решение
    let result = '';
    let divisible = number;

    if (number === 0) return 0;

    while (divisible > 0) {
        // console.log(`Result = ${ result }, Divisible = ${ divisible }`);

        result = (divisible % 2).toString() + result;
        divisible = Math.floor(divisible / 2)
    }

    // console.log(`Result = ${ result }, Divisible = ${ divisible }`);

    return result;
}

function solve() {
    const n = readInt();
    process.stdout.write(`${getBinaryNumber(n)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readLine() {
    const line = _inputLines[_curLine];
    _curLine++;
    return line;
}


function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
