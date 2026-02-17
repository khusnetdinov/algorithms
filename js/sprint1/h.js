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

// https://contest.yandex.ru/contest/22449/problems/H/?success=140117564#2989/2020_04_13/vTLkp8umJC
function sumOfBinaries(firstNumber, secondNumber) {
    // Ваше решение
    // console.log(`First = ${ firstNumber }, Second = ${ secondNumber }`);

    let result = '';
    let transfer = 0;
    let firstIndex = firstNumber.length - 1;
    let secondIndex = secondNumber.length - 1;

    while (firstIndex >= 0 || secondIndex >= 0) {
        // console.log(`FirstIndex= ${ firstIndex }, SecondIndex = ${ secondIndex }, Transfer ${ transfer }`);

        const first = firstIndex >= 0 ? parseInt(firstNumber[firstIndex]) : 0;
        const second = secondIndex >= 0 ? parseInt(secondNumber[secondIndex]) : 0;

        // console.log(`First= ${ first }, SecondIndex = ${ second }, Transfer ${ transfer }`);

        let sum = first + second + transfer;

        result = (sum % 2).toString() + result;
        transfer = Math.floor(sum / 2)

        // console.log(`Sum= ${ sum }, Result = ${ result }, Transfer ${ transfer }`);

        firstIndex -= 1;
        secondIndex -= 1;
    }

    if (transfer > 0) {
        result = transfer.toString() + result;
    }

    return result;
}

function solve() {
    const firstNumber = readLine();
    const secondNumber = readLine();
    process.stdout.write(`${sumOfBinaries(firstNumber, secondNumber)}`);
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