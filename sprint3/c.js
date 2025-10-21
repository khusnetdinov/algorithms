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

// https://contest.yandex.ru/contest/23638/run-report/140826697/
function isSubstring(substring, string) {
    // Ваше решение
    let result = false
    let subIndex = 0;

    // let sub = substring.sort()
    // let target = string.sort()
    // console.log(sub, target)

    for (let index = 0; index < string.length; index += 1) {
        if (string[index] === substring[subIndex]) {
            if (subIndex === (substring.length - 1)) {
                result = true
                break;
            } else {
                subIndex += 1
            }
        }
    }

    return result
}

function solve() {
    const substring = readLine();
    const string = readLine();
    if (isSubstring(substring.split(''), string.split(''))) {
        console.log("True")
    } else {
        console.log("False")
    }
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