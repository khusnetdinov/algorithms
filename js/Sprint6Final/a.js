// https://contest.yandex.ru/contest/25070/run-report/143986188/

/*
* -- ПРИНЦИП РАБОТЫ --
* Алгоритм Прима для построения максимального остовного дерева:
* - Начинаем с произвольной вершины (в данном случае вершина 1)
* - Используем максимальную кучу (приоритетную очередь) для хранения рёбер, отсортированных по убыванию веса
* - На каждом шаге извлекаем ребро с максимальным весом из кучи
* - Если ребро соединяет дерево с новой вершиной, добавляем её в дерево и увеличиваем общий вес
* - Добавляем все рёбра из новой вершины в кучу
* - Процесс продолжается пока все вершины не будут включены в дерево или пока куча не опустеет
* - Проверяем связность графа: если количество вершин в дереве ≠ V, граф несвязный
*
* -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
* - Инициализация списка смежности: O(E)
* - Операции с кучей (вставка и извлечение): O(log(E))
* - Общее время: O(Elog(V)) в худшем случае
*   где E — количество рёбер в графе, а V — количество вершин.
*
* -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
* - Список смежности: O(V + E)
* - Массив visited: O(V)
* - Максимальная куча: O(E) в худшем случае
* - Общая пространственная сложность: O(V + E)
*   где E — количество рёбер в графе, а V — количество вершин.
*/

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


class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(weight, vertex) {
        this.heap.push([weight, vertex]);
        this._siftUp(this.heap.length - 1);
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._siftDown(0);
        return max;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    _siftUp(index) {
        const element = this.heap[index];

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];

            if (element[0] <= parent[0]) break;

            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    _siftDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let swap = null;
            let leftChild, rightChild;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild[0] > element[0]) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if ((swap === null && rightChild[0] > element[0]) ||
                    (swap !== null && rightChild[0] > leftChild[0])) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;

            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}

function maxOstTree(verticesCount, edges) {
    if (verticesCount > 1 && edges.length === 0) {
        return "Oops! I did it again";
    }

    const adjacencyList = Array.from({ length: verticesCount + 1 }, () => []);

    for (const [u, v, w] of edges) {
        if (u !== v) {
            adjacencyList[u].push([v, w]);
            adjacencyList[v].push([u, w]);
        }
    }

    const visited = new Array(verticesCount + 1).fill(false);
    const priorityQueue = new MaxHeap();

    let totalWeight = 0;
    let verticesInTree = 0;

    visited[1] = true;
    verticesInTree += 1;

    for (const [neighbor, weight] of adjacencyList[1]) {
        priorityQueue.insert(weight, neighbor);
    }

    while (!priorityQueue.isEmpty() && verticesInTree < verticesCount) {
        const [weight, vertex] = priorityQueue.extractMax();

        if (visited[vertex]) {
            continue;
        }

        visited[vertex] = true;
        verticesInTree += 1;
        totalWeight += weight;

        for (const [neighbor, edgeWeight] of adjacencyList[vertex]) {
            if (!visited[neighbor]) {
                priorityQueue.insert(edgeWeight, neighbor);
            }
        }
    }

    if (verticesInTree !== verticesCount) {
        return "Oops! I did it again";
    }

    return totalWeight.toString();
}

function solve() {
    const [n, m] = readArray();
    const edges = readLines(m);

    process.stdout.write(`${maxOstTree(n, edges)}`);
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