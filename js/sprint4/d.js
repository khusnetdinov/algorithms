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

// https://contest.yandex.ru/contest/23991/run-report/141439707/
function hash(base, module, string) {
    // console.log(base, module, string)

    let result = 0;

    if (string.length === 0) return result

    for (let index = 0; index < string.length; index += 1) {
        result = (result * base + string[index].charCodeAt(0)) % module;
    }

    return result
}

function solve() {
    const base = readInt();
    const module = readInt();
    const string = readArray();

    process.stdout.write(`${hash(base, module, string)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split('');
    _curLine++;
    return arr;
}