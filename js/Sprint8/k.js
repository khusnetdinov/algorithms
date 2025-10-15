// https://contest.yandex.ru/contest/26131/run-report/145190543/

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

function filterEven(string) {
    return string.split('').filter(char => {
        const pos = char.charCodeAt(0) - 96;
        return pos % 2 === 0;
    }).join('');
}

function compare(string, target) {
    const filteredString = filterEven(string)
    const filteredTarget = filterEven(target)

    return filteredString < filteredTarget ? -1 : filteredString === filteredTarget ? 0 : 1
}

function solve() {
    const string = readArray();
    const target = readArray();

    process.stdout.write(`${ compare(string, target) }`);
}

function readArray() {
    var arr = _inputLines[_curLine].trim();
    _curLine += 1;
    return arr;
}
