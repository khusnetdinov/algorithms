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

function greedyCookies(greeds, cs) {
    // Ваше решение
    let result = 0;
    greeds.sort((a, b) => a - b)
    cs.sort((a, b) => a - b)
    // console.log(`Greeds = ${ greeds }, Cookies = ${ cs }`)

    let greedsIndex = 0
    let cookiesIndex = 0
    while (greedsIndex < greeds.length && cookiesIndex < cs.length) {
        if (greeds[greedsIndex] <= cs[cookiesIndex]) {
            result += 1
            greedsIndex += 1
            cookiesIndex +=1
        } else {
            cookiesIndex += 1
        }
    }

    return result;
}
// https://contest.yandex.ru/contest/23638/run-report/140868245/
function solve() {
    const _greedsCount = readInt();
    const greeds = readArray()
    const _cookiesCount = readInt();
    const cookies = readArray()

    process.stdout.write(`${greedyCookies(greeds, cookies)}`);
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