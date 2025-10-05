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

// https://contest.yandex.ru/contest/25069/run-report/143980857/

function bfs(verticesCount, edges, startVertex) {
    const adjacencyList = Array.from({ length: verticesCount + 1 }, () => []);

    for (const [u, v] of edges) {
        adjacencyList[u].push(v)
        adjacencyList[v].push(u)
    }

    for (let index = 1; index <= verticesCount; index += 1) {
        adjacencyList[index].sort((a, b) => a - b);
    }

    const result = []
    const queue = [startVertex];
    const visited = Array.from({ length: verticesCount + 1 }).fill(false);
    visited[startVertex] = true;

    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);

        for (let nextVertex of adjacencyList[vertex]) {
            if (!visited[nextVertex]) {
                visited[nextVertex] = true;
                queue.push(nextVertex);
            }
        }
    }

    return result
}

function solve() {
    const data = readArray()
    const collection = readLines(data[1]);
    const startVertex = readInt()

    process.stdout.write(`${ bfs(data[0], collection, startVertex).join(' ') }`);
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

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine += 1;
    return n;
}