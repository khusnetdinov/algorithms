// https://contest.yandex.ru/contest/23638/run-report/140724206/
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
const BUTTONS = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz"
}
function getCombinations(keys) {
    let result = [];

    combinate("", keys, result)
    // console.log(`\n Result = ${ result }`)

    return result;
}

function combinate(current, keys, result) {
    // console.log(`Current = '${ current }', Keys = [${ keys }]`)

    if (keys.length === 0) {
        // console.log(`! Current = '${ current }'`)
        result.push(current)
    } else {
        const [key, ...rest] = keys;

        for (const char of BUTTONS[key].split('')) {
            // console.log(`==> Current = '${ current }', Key = '${ key }', Keys = [${ keys }], Char = '${ char }' \n`)

            combinate(current + char, rest, result)
        }
    }
}

function solve() {
    const keys = readArray();
    process.stdout.write(`${getCombinations(keys).join(' ')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split("").map(num => Number(num));
    _curLine++;
    return arr;
}
