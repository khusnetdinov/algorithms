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


// https://contest.yandex.ru/contest/23638/run-report/140899102/
function midiana(hs, ts) {
    if (hs.length > ts.length) {
        [hs, ts] = [ts, hs];
    }

    const m = hs.length;
    const n = ts.length;
    let left = 0;
    let right = m;

    while (left <= right) {
        const hsIndex = Math.floor((left + right) / 2);
        const maxLeft1 = (hsIndex === 0) ? -Infinity : hs[hsIndex - 1];
        const minRight1 = (hsIndex === m) ? Infinity : hs[hsIndex];

        const tsIndex = Math.floor((m + n + 1) / 2) - hsIndex;
        const maxLeft2 = (tsIndex === 0) ? -Infinity : ts[tsIndex - 1];
        const minRight2 = (tsIndex === n) ? Infinity : ts[tsIndex];

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 === 1) {
                return Math.max(maxLeft1, maxLeft2);
            } else {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            }
        } else if (maxLeft1 > minRight2) {
            right = hsIndex - 1;
        } else {
            left = hsIndex + 1;
        }
    }

    return 0; // Сюда не дойдём, если входные данные корректны
}

function solve() {
    const _headCount = readInt();
    const _tailCount = readArray();
    const hs = readArray();
    const ts = readArray();

    process.stdout.write(`${midiana(hs, ts)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
