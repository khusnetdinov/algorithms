// https://contest.yandex.ru/contest/23638/run-report/140722885/
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

// Ваше решение
const OPEN = '(';
const CLOSE = ')';

function bracketGenerator(count) {
    let result = [];

    if (count === 0) {
        return result
    }

    if (count === 1) {
        result.push(OPEN + CLOSE)

        return result
    }

    generate("", 0, 0, count, result);
    // console.log(`Result = ${ result }`)

    return result;
}

function generate(currentBrackets, openCount, closeCount, count, result) {
    // console.log(`Current = ${ currentBrackets }, Open = ${ openCount }, Close = ${ closeCount }`)

    if (currentBrackets.length === 2 * count) {
        result.push(currentBrackets)
    } else {
        if (openCount < count) {
            generate(currentBrackets + OPEN, openCount + 1, closeCount, count, result)
        }

        if (openCount > closeCount) {
            generate(currentBrackets + CLOSE, openCount, closeCount + 1, count, result)
        }
    }
}

function solve() {
    const count = readInt();
    process.stdout.write(`${bracketGenerator(count).join('\n')}`);
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
