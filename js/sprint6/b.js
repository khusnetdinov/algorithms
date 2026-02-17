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

// https://contest.yandex.ru/contest/25069/run-report/142836818/

function adjacencyList(verticesCount, edges) {
    const result = []
    const graph = Array.from({ length: verticesCount + 1 }, () => {
        return Array.from({ length: verticesCount + 1 }, () => 0)
    })

    // console.log(JSON.stringify(graph))

    for (const [u, v] of edges) {
        graph[u][v] = 1
    }

    // console.log(JSON.stringify(graph))

    for (let index = 1; index < graph.length; index += 1) {
        let [_, ...rest] = graph[index]

        result.push(rest.join(' '))
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
