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

 // https://contest.yandex.ru/contest/23991/run-report/142427927/

function maxSubArray(lefts, rights) {
    let maxLength = 0;
    const n = lefts.length;
    const m = rights.length;

    const indexMap = new Map();
    for (let j = 0; j < m; j++) {
        if (!indexMap.has(rights[j])) {
            indexMap.set(rights[j], []);
        }
        indexMap.get(rights[j]).push(j);
    }

    for (let i = 0; i < n; i++) {
        if (n - i <= maxLength) break;

        const value = lefts[i];
        if (!indexMap.has(value)) continue;

        const positions = indexMap.get(value);

        if (i > 0 && lefts[i] === lefts[i-1]) {
            continue;
        }

        for (const j of positions) {
            if (m - j <= maxLength) break;

            if (j > 0 && rights[j] === rights[j-1]) {
                continue;
            }

            let currentLength = 0;
            while (i + currentLength < n &&
            j + currentLength < m &&
            lefts[i + currentLength] === rights[j + currentLength]) {
                currentLength++;
            }

            if (currentLength > maxLength) {
                maxLength = currentLength;
                if (maxLength === Math.min(n, m)) {
                    return maxLength;
                }
            }

            i += Math.max(0, currentLength - 2);
        }
    }

    return maxLength;
}
function solve() {
    const n = readInt();
    const lefts = readArray();
    const m = readInt();
    const rights = readArray();

    process.stdout.write(`${maxSubArray(lefts, rights)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine += 1;
    return n;
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
    _curLine += 1;
    return arr;
}