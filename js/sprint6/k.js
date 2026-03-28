const fs = require('fs');

function solve() {
    const input = fs.readFileSync('/dev/stdin', 'utf8').trim().split('\n');
    const [n, m] = input[0].split(' ').map(Number);

    const INF = Infinity;
    const dist = Array(n).fill().map(() => Array(n).fill(INF));

    // Инициализация диагонали
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
    }

    // Заполнение рёбер
    for (let i = 1; i <= m; i++) {
        const [u, v, l] = input[i].split(' ').map(Number);
        const uIdx = u - 1;
        const vIdx = v - 1;

        dist[uIdx][vIdx] = Math.min(dist[uIdx][vIdx], l);
        dist[vIdx][uIdx] = Math.min(dist[vIdx][uIdx], l);
    }

    // Алгоритм Флойда-Уоршелла
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            if (dist[i][k] === INF) continue;
            for (let j = 0; j < n; j++) {
                if (dist[k][j] === INF) continue;
                const newDist = dist[i][k] + dist[k][j];
                if (newDist < dist[i][j]) {
                    dist[i][j] = newDist;
                }
            }
        }
    }

    // Вывод результата
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(dist[i][j] === INF ? -1 : dist[i][j]);
        }
        console.log(row.join(' '));
    }
}

solve();