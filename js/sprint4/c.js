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


// https://contest.yandex.ru/contest/23991/run-report/141364988/
function isEqlString(ss, ts) {
    // console.log(ss, ts)

    if (ss.length !== ts.length) {
        return "NO"
    }

    const sToT = new Map();
    const tToS = new Map();

    for (let i = 0; i < ss.length; i++) {
        const charS = ss[i];
        const charT = ts[i];

        if (sToT.has(charS)) {
            if (sToT.get(charS) !== charT) {
                return 'NO'
            }
        } else {
            sToT.set(charS, charT);
        }

        if (tToS.has(charT)) {
            if (tToS.get(charT) !== charS) {
                return 'NO'
            }
        } else {
            tToS.set(charT, charS);
        }
    }

    return 'YES'
}

function solve() {
    const ss = readArray();
    const ts = readArray();

    process.stdout.write(`${isEqlString(ss, ts)}`);
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