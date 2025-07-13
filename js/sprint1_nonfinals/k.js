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

// https://contest.yandex.ru/contest/22449/problems/K/?success=140129097#2989/2020_04_14/oiNq5SI4HQ
function getSum(listNumber, number) {
    // Ваше решение
    let result = [];
    let transfer = 0;
    let firstList = listNumber;
    let secondList = number.toString().split('');
    let firstIndex = firstList.length - 1;
    let secondIndex = secondList.length - 1;

    while (firstIndex >= 0 || secondIndex >= 0) {
        const first = firstIndex >= 0 ? parseInt(firstList[firstIndex]) : 0;
        const second = secondIndex >= 0 ? parseInt(secondList[secondIndex]) : 0;

        // console.log(`First= ${ first }, SecondIndex = ${ second }, Transfer ${ transfer }`);

        let sum = first + second + transfer;

        result.unshift(sum % 10)
        transfer = Math.floor(sum / 10);

        // console.log(`Sum= ${ sum }, Result = ${ result }, Transfer ${ transfer }`);

        firstIndex -= 1;
        secondIndex -= 1;
    }

    if (transfer !== 0) {
        result.unshift(transfer);
    }

    return result;
}

function solve() {
    const length = readInt();
    const listNumber = readArray()
    const number = readInt();

    process.stdout.write(`${getSum(listNumber, number).join(' ')}`);
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