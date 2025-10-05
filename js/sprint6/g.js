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

// https://contest.yandex.ru/contest/25069/run-report/143982121/

function bfsMaxDistance(verticesCount, edges, startVertex) {
    const adjacencyList = Array.from({ length: verticesCount + 1 }, () => []);

    for (const [u, v] of edges) {
        adjacencyList[u].push(v);
        adjacencyList[v].push(u);
    }

    const visited = new Array(verticesCount + 1).fill(false);
    const queue = [];
    let front = 0;

    queue.push(startVertex);
    visited[startVertex] = true;

    let maxDistance = 0;
    let currentLevelSize = 1;
    let nextLevelSize = 0;
    let level = 0;

    while (front < queue.length) {
        const u = queue[front++];
        currentLevelSize--;

        for (const v of adjacencyList[u]) {
            if (!visited[v]) {
                visited[v] = true;
                queue.push(v);
                nextLevelSize++;
            }
        }

        if (currentLevelSize === 0) {
            currentLevelSize = nextLevelSize;
            nextLevelSize = 0;
            if (currentLevelSize > 0) {
                level++;
                maxDistance = level;
            }
        }
    }

    return maxDistance;
}

function solve() {
    const [n, m] = readArray();
    const edges = readLines(m);
    const s = readInt();

    const result = bfsMaxDistance(n, edges, s);
    console.log(result);
}

function readLines(linesCount) {
    const arr = [];
    for (let i = 0; i < linesCount; i++) {
        arr.push(readArray());
    }
    return arr;
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(" ").map(Number);
    _curLine++;
    return arr;
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}