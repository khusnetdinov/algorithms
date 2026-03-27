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

https://contest.yandex.ru/contest/25069/problems/F/#51450/2020_08_07/XNUASlxHmH

function findShortestDistance(verticesCount, edges, startVertex, endVertex) {
    // Создаём список смежности
    const adjacencyList = Array.from({ length: verticesCount + 1 }, () => []);

    // Заполняем рёбра
    for (const [u, v] of edges) {
        adjacencyList[u].push(v);
        adjacencyList[v].push(u);
    }

    // Сортируем соседей (опционально)
    for (let i = 1; i <= verticesCount; i++) {
        if (adjacencyList[i].length > 0) {
            adjacencyList[i].sort((a, b) => a - b);
        }
    }

    // BFS для поиска кратчайшего расстояния
    const queue = [startVertex];
    const distance = new Array(verticesCount + 1).fill(-1);
    distance[startVertex] = 0;

    while (queue.length > 0) {
        const vertex = queue.shift();

        if (vertex === endVertex) {
            return distance[vertex];
        }

        for (const nextVertex of adjacencyList[vertex]) {
            if (distance[nextVertex] === -1) {
                distance[nextVertex] = distance[vertex] + 1;
                queue.push(nextVertex);
            }
        }
    }

    return -1;
}

function solve() {
    // Читаем n и m
    const [n, m] = readArray();

    // Читаем m рёбер
    const edges = [];
    for (let i = 0; i < m; i++) {
        edges.push(readArray());
    }

    // Читаем start и end
    const [s, t] = readArray();

    // Находим и выводим результат
    const result = findShortestDistance(n, edges, s, t);
    process.stdout.write(String(result));
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(" ").map(Number);
    _curLine++;
    return arr;
}