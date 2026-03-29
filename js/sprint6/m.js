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

function solve() {
    const [n, m] = readArray();

    // Список смежности - основная память
    const adj = Array(n + 1);
    for (let i = 1; i <= n; i++) {
        adj[i] = [];
    }

    // Заполняем список смежности
    for (let i = 0; i < m; i++) {
        const [u, v] = readArray();
        adj[u].push(v);
        adj[v].push(u);
    }

    // Используем Uint8Array для цветов (1 байт на вершину вместо 8)
    const color = new Uint8Array(n + 1);
    // 0 - не посещена, 1 и 2 - цвета долей

    const queue = new Array(n); // Выделяем память один раз
    let queueStart = 0;
    let queueEnd = 0;

    for (let i = 1; i <= n; i++) {
        if (color[i] === 0) {
            // Начинаем BFS
            queue[queueEnd++] = i;
            color[i] = 1;

            while (queueStart < queueEnd) {
                const u = queue[queueStart++];
                const currentColor = color[u];
                const nextColor = currentColor === 1 ? 2 : 1;

                for (let j = 0; j < adj[u].length; j++) {
                    const v = adj[u][j];
                    if (color[v] === 0) {
                        color[v] = nextColor;
                        queue[queueEnd++] = v;
                    } else if (color[v] !== nextColor) {
                        console.log("NO");
                        return;
                    }
                }
            }

            // Сбрасываем указатели для следующей компоненты
            queueStart = 0;
            queueEnd = 0;
        }
    }

    console.log("YES");
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
    _curLine++;
    return arr;
}