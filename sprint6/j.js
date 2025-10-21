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

const WHITE = -1;
const GRAY = 0;
const BLACK = 1;

// https://contest.yandex.ru/contest/25069/run-report/143477709/

function topSort(verticesCount, edgesCount, collection) {
    const adjacencyList = new Array(verticesCount + 1);
    for (let index = 1; index <= verticesCount; index += 1) {
        adjacencyList[index] = [];
    }

    for (let index = 0; index < edgesCount; index += 1) {
        const u = collection[index][0], v = collection[index][1];

        adjacencyList[u].push(v);
    }

    const result = [];
    const colors = new Array(verticesCount + 1).fill(WHITE);

    for (let vertexIndex = 1; vertexIndex <= verticesCount; vertexIndex += 1) {
        if (colors[vertexIndex] === WHITE) {
            const stack = [vertexIndex];

            while (stack.length > 0) {
                const vertex = stack.pop();

                if (colors[vertex] === WHITE) {
                    colors[vertex] = GRAY;
                    stack.push(vertex);

                    adjacencyList[vertex].sort((a, b) => b - a);

                    for (let index = 0; index < adjacencyList[vertex].length; index += 1) {
                        if (colors[adjacencyList[vertex][index]] === WHITE) {
                            stack.push(adjacencyList[vertex][index]);
                        }
                    }
                } else {
                    if (colors[vertex] === GRAY) {
                        result.push(vertex);
                        colors[vertex] = BLACK;
                    }
                }
            }
        }
    }

    return result.reverse();
}

function solve() {
    const data = readArray()
    const collection = readLines(data[1]);
    const result = topSort(data[0], data[1], collection);

    console.log(result.join(' '));
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(" ").map(Number);
    _curLine++;
    return arr;
}

function readLines(linesCount) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray())
    }
    return arr;
}
