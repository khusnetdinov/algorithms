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

// https://contest.yandex.ru/contest/23638/run-report/140856975/
function countUniverities(collection, counter) {
    let counters = {}

    for (let index = 0; index < collection.length; index += 1) {
        const uId = collection[index];

        if (uId in counters) {
            counters[uId] += 1
        } else {
            counters[uId] = 1
        }
    }

    // console.log(`Counters = ${ JSON.stringify(counters) }`)

    const rating = Object.keys(counters).map(id => ({
        id: parseInt(id),
        count: counters[id]
    })).sort((a, b) => {
        if (a.count !== b.count) {
            return b.count - a.count;
        } else {
            return a.id - b.id;
        }
    })

    // console.log(`rating = ${ JSON.stringify(rating) }`)

    return  rating.slice(0, counter).map(uni => uni.id);
}

function solve() {
    const _ = readInt();
    const collection = readArray();
    const counter = readInt();

    process.stdout.write(`${countUniverities(collection.split(' ').map(el => Number(el)), counter).join(' ')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine];
    _curLine++;
    return arr;
}