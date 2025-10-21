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

// https://contest.yandex.ru/contest/25069/run-report/143052572/

function times(verticesCount, edges, startVertex) {
    const adjacencyList = new Array(verticesCount + 1);
    for (let i = 1; i <= verticesCount; i++) {
        adjacencyList[i] = [];
    }

    for (let i = 0; i < edges.length; i++) {
        const u = edges[i][0], v = edges[i][1];
        adjacencyList[u].push(v);
    }

    for (let i = 1; i <= verticesCount; i++) {
        if (adjacencyList[i].length > 1) {
            adjacencyList[i].sort((a, b) => a - b);
        }
    }

    const stack = [startVertex];
    const colors = Array.from({ length: verticesCount + 1 }, () => -1);
    const tin = Array.from({ length: verticesCount + 1 }, () => 0);
    const tout = Array.from({ length: verticesCount + 1 }, () => 0);
    let timer = 0;

    while (stack.length > 0) {
        const vertex = stack.pop();

        if (colors[vertex] === -1) {
            tin[vertex] = timer++;
            colors[vertex] = 0;
            stack.push(vertex);

            for (let index = adjacencyList[vertex].length - 1; index >= 0; index -= 1) {
                const nextVertex = adjacencyList[vertex][index];
                if (colors[nextVertex] === -1) {
                    stack.push(nextVertex);
                }
            }
        } else if (colors[vertex] === 0) {
            colors[vertex] = 1;
            tout[vertex] = timer++;
        }
    }

    const result = [];
    for (let index = 1; index <= verticesCount; index += 1) {
        result.push(`${tin[index]} ${tout[index]}`);
    }

    return result;
}

function solve() {
    const data = readArray()
    const collection = readLines(data[1]);
    const startVertex = 1
    const result = times(data[0], collection, startVertex);

    for (let index = 0; index < result.length; index += 1) {
        process.stdout.write(result[index] + '\n');
    }
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
