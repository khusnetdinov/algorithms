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

// https://contest.yandex.ru/contest/25069/run-report/142877259/

function stackDfs(verticesCount, edges, startVertex) {
    const adjacencyList = Array.from({ length: verticesCount + 1 }, () => []);

    for (const [u, v] of edges) {
        adjacencyList[u].push(v)
        adjacencyList[v].push(u)
    }

    const result = []
    const stack = [startVertex];
    const colors = Array.from({ length: verticesCount + 1 }).fill('white');

    while (stack.length > 0) {
        const vertex = stack.pop();

        if (colors[vertex] === "white") {
            colors[vertex] = "gray";
            result.push(vertex);
            stack.push(vertex);

            adjacencyList[vertex].sort((a, b) => b - a)

            for (let nextVertex of adjacencyList[vertex]) {
                if (colors[nextVertex] === 'white') {
                    stack.push(nextVertex)
                }
            }

        } else if (colors[vertex] === 'gray') {
            colors[vertex] = 'black'
        }
    }

    return result
}

function recursionDfs(verticesCount, edges, startVertex) {
    const adjacencyList = Array.from({ length: verticesCount + 1 }, () => []);

    for (const [u, v] of edges) {
        adjacencyList[u].push(v)
        adjacencyList[v].push(u)
    }

    for (let index = 1; index <= verticesCount; index += 1) {
        adjacencyList[index].sort((a, b) => a - b);
    }

    const result = []
    const visited = Array.from({ length: verticesCount + 1 }).fill(false);
    function dfs(startVertex) {
        visited[startVertex] = true
        result.push(startVertex)

        const outgoingVertexes = adjacencyList[startVertex]

        for (const nextVertex of outgoingVertexes ) {
            if (!visited[nextVertex]) {
                dfs(nextVertex)
            }
        }
    }

    dfs(startVertex)

    return result
}

function dfs(verticesCount, edges, startVertex) {
    return stackDfs(verticesCount, edges, startVertex)
}

function solve() {
    const data = readArray()
    const collection = readLines(data[1]);
    const startVertex = readInt()

    process.stdout.write(`${ dfs(data[0], collection, startVertex).join(' ') }`);
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
