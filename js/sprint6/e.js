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

function coupledComponents(verticesCount, edgesCount, collection) {
    const colors = new Array(verticesCount + 1).fill(WHITE);
    const adjacencyList = new Array(verticesCount + 1);
    for (let index = 1; index <= verticesCount; index += 1) {
        adjacencyList[index] = [];
    }

    for (let index = 0; index < edgesCount; index += 1) {
        const u = collection[index][0], v = collection[index][1];
        adjacencyList[u].push(v);
        adjacencyList[v].push(u);
    }

    const components = [];
    let currentComponent = [];

    for (let vertexIndex = 1; vertexIndex <= verticesCount; vertexIndex += 1) {
        if (colors[vertexIndex] === WHITE) {
            currentComponent = [];
            const stack = [vertexIndex];

            while (stack.length > 0) {
                const vertex = stack.pop();

                if (colors[vertex] === WHITE) {
                    colors[vertex] = GRAY;
                    stack.push(vertex);
                    currentComponent.push(vertex);

                    adjacencyList[vertex].sort((a, b) => b - a);

                    for (let index = 0; index < adjacencyList[vertex].length; index += 1) {
                        const neighbor = adjacencyList[vertex][index];
                        if (colors[neighbor] === WHITE) {
                            stack.push(neighbor);
                        }
                    }
                } else if (colors[vertex] === GRAY) {
                    colors[vertex] = BLACK;
                }
            }

            currentComponent.sort((a, b) => a - b);
            components.push(currentComponent);
        }
    }

    components.sort((a, b) => a[0] - b[0]);

    return components;
}

function solve() {
    const data = readArray();
    const collection = readLines(data[1]);
    const components = coupledComponents(data[0], data[1], collection);

    console.log(components.length);
    for (const component of components) {
        console.log(component.join(' '));
    }
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(" ").map(Number);
    _curLine++;
    return arr;
}

function readLines(linesCount) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray());
    }
    return arr;
}