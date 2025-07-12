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

// https://contest.yandex.ru/contest/22449/problems/E/?success=140096620#3484683/2020_11_16/bDCqWy22Oq
function getLongestWord(length, line) {
    // Ваше решение
    const SPACE = ' ';
    let longestWord = ''
    let currentWord = ''

    for (let index = 0; index < line.length; index += 1) {
        // console.log(`Index = ${ index }, Char = ${ line[index] } current = ${ currentWord }, longest = ${ longestWord }`);

        if (line[index] === SPACE) {
            if (currentWord.length > longestWord.length) {
                longestWord = currentWord
            }

            currentWord = '';
        } else {
            currentWord += line[index]
        }
    }

    if (currentWord.length > longestWord.length) {
        longestWord = currentWord
    }

    return longestWord;
}

function solve() {
    const length = readInt();
    const line = readLine();
    const longestWord = getLongestWord(length, line)
    process.stdout.write(`${longestWord}`);
    process.stdout.write("\n");
    process.stdout.write(`${longestWord.length}`);
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