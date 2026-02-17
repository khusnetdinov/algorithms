/*
* -- ПРИНЦИП РАБОТЫ --
* - Алгоритм подсчета островов использует поиск в ширину (BFS) для нахождения связных компонентов:
* - Представляем карту как граф, где каждая клетка с '#' - вершина, а соседние по горизонтали/вертикали клетки соединены ребрами
* - Последовательно обходим все клетки карты слева направо, сверху вниз
* - При обнаружении непосещенной клетки с '#' запускаем BFS для обхода всего острова
* - BFS помечает все достижимые клетки острова как посещенные и подсчитывает его размер

* -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
* - BFS гарантированно обходит все клетки, достижимые из стартовой позиции
* - Использование массива visited предотвращает повторный подсчет клеток
* - Проверка всех 4 направлений (вверх/вниз/влево/вправо) обеспечивает корректное определение связности

* -- ВРЕМЕННАЯ СЛОЧНОСТЬ --
* - Инициализация списка смежности: O(n × m)
* - Обход всех элементов карты: : O(n × m)
* - Общая временная сложность: O(n × m)
*   где n - количество строк, m - количество столбцов

* -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
* - O(n × m) для хранения массива visited
* - O(n × m) для хранения входной карты
* - Общая пространственная сложность: O(n × m)
*   где n - количество строк, m - количество столбцов
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

function bfs(startRow, startCol, n, m, field, visited) {
    const queue = [[startRow, startCol]];
    visited[startRow][startCol] = true;
    let size = 1;

    const movements = [
        [0, 1],   // вправо
        [0, -1],  // влево
        [1, 0],   // вниз
        [-1, 0]   // вверх
    ];

    while (queue.length > 0) {
        const [row, col] = queue.shift();

        for (const [dr, dc] of movements) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < n &&
                newCol >= 0 && newCol < m &&
                field[newRow][newCol] === '#' &&
                !visited[newRow][newCol]) {

                visited[newRow][newCol] = true;
                queue.push([newRow, newCol]);
                size += 1;
            }
        }
    }

    return size;
}

function islands(n, m, lines) {
    const visited = Array.from({ length: n }, () => new Array(m).fill(false));

    let islandCount = 0;
    let maxIslandSize = 0;

    for (let i = 0; i < n; i += 1) {
        for (let j = 0; j < m; j += 1) {
            if (lines[i][j] === '#' && !visited[i][j]) {
                islandCount += 1;
                const islandSize = bfs(i, j, n, m, lines, visited);
                maxIslandSize = Math.max(maxIslandSize, islandSize);
            }
        }
    }

    return [islandCount, maxIslandSize]
}

function solve() {
    const dimensions = readArray();
    const n = dimensions[0];
    const m = dimensions[1];
    const lines = readLines(n)
    const [islandCount, maxIslandSize] = islands(n, m, lines)

    process.stdout.write(`${islandCount} ${maxIslandSize}`);
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}

function readLines(linesCount) {
    const arr = [];
    for (let i = 0; i < linesCount; i++) {
        arr.push(_inputLines[_curLine].trim());
        _curLine++;
    }
    return arr
}