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

function isNumOrString(char) {
    return /^[a-zA-Z0-9]+$/.test(char)
}

// https://contest.yandex.ru/contest/22449/problems/F/?success=140110027#2989/2020_04_13/OKMm72e4Dn
function isPalindrome(line) {
    // Ваше решение
    let result = true;
    let left_index = 0;
    let right_index = line.length - 1;

    if (line.length === 1) return result;

    while (left_index < right_index) {
        // console.log(`Left = ${ left_index }, Right = ${ right_index }`);

        if (isNumOrString(line[left_index]) && isNumOrString(line[right_index])) {
            if (line[left_index].toLocaleLowerCase() === line[right_index].toLocaleLowerCase()) {
                left_index += 1;
                right_index -= 1;
            } else {
                result = false;

                break
            }
        } else {
            if (!isNumOrString(line[left_index])) left_index += 1;
            if (!isNumOrString(line[right_index])) right_index -= 1;
        }
    }

    return result;
}

function solve() {
    const line = readLine();
    if (isPalindrome(line)) {
        console.log("True")
    } else {
        console.log("False")
    }
}


function readLine() {
    const line = _inputLines[_curLine];
    _curLine++;
    return line;
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