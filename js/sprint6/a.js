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

// https://contest.yandex.ru/contest/25069/run-report/142823523/

function adjacencyList(verticesCount, edges) {
    const result = []
    const list = Array.from({ length: verticesCount + 1 }, () => [])

    // console.log(JSON.stringify(list))

    for (const [u, v] of edges) {
        list[u].push(v)
    }

    // console.log(JSON.stringify(list))

    for (let index = 1; index < list.length; index += 1) {
        result.push(`${ list[index].length } ${ list[index].sort((p, n) => p - n).join(' ') }`)
    }

    // console.log(JSON.stringify(result))

    return result
}

function solve() {
    const data = readArray()
    const collection = readLines(data[1]);

    process.stdout.write(`${ adjacencyList(data[0], collection).join("\n") }`);
}

function readLines(linesCount) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray())
    }
    return arr;
}


function readArray() {
    var arr = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
    _curLine += 1;
    return arr;
}
