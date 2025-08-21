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
function hashNumber(base = 1000, module = 123987123, string) {
    // console.log(base, module, string)

    let result = 0;

    if (string.length === 0) return result

    for (let index = 0; index < string.length; index += 1) {
        result = (result * base + string[index].charCodeAt(0)) % module;
    }

    return result
}

// https://contest.yandex.ru/contest/23991/run-report/141440296/
function findCollision() {
    const module = 123987123;
    const base = 1000;
    const seen = new Map();
    const chars = 'abcdefghijklmnopqrstuvwxyz';

    for (let index = 0; index < 1000000; index += 1) {
        const length = 10;

        let randomString = '';
        for (let j = 0; j < length; j++) {
            randomString += chars[Math.floor(Math.random() * chars.length)];
        }

        console.log(`Seen = ${ randomString }`)

        const hash = hashNumber(base, module, randomString);

        if (seen.has(hash)) {
            const existingString = seen.get(hash);
            if (existingString !== randomString) {
                return [existingString, randomString];
            }
        } else {
            seen.set(hash, randomString);
        }
    }

    return ["collision", "notfound"]; // В крайнем случае
}

function solve() {
    process.stdout.write(`${findCollision()}`);
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