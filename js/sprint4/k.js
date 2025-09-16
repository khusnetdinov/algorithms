const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let metroExits = [];
let busStops = [];
let n = 0;
let m = 0;
let lineCount = 0;

rl.on('line', (line) => {
    if (lineCount === 0) {
        n = parseInt(line);
    } else if (lineCount <= n) {
        const [x, y] = line.split(' ').map(Number);
        metroExits.push({ x, y, index: lineCount });
    } else if (lineCount === n + 1) {
        m = parseInt(line);
    } else if (lineCount <= n + 1 + m) {
        const [x, y] = line.split(' ').map(Number);
        busStops.push({ x, y });
    }

    lineCount++;

    if (lineCount === n + 1 + m + 1) {
        solveOptimized();
        rl.close();
    }
});

// https://contest.yandex.ru/contest/23991/run-report/142435128/

function solveOptimized() {
    const gridSize = 100;
    const grid = new Map();

    for (let i = 0; i < busStops.length; i++) {
        const stop = busStops[i];
        const cellX = Math.floor(stop.x / gridSize);
        const cellY = Math.floor(stop.y / gridSize);
        const cellKey = `${cellX},${cellY}`;

        if (!grid.has(cellKey)) {
            grid.set(cellKey, []);
        }
        grid.get(cellKey).push(stop);
    }

    let maxCount = -1;
    let bestExitIndex = -1;

    for (let i = 0; i < metroExits.length; i++) {
        const exit = metroExits[i];
        let count = 0;

        const minX = Math.floor((exit.x - 20) / gridSize);
        const maxX = Math.floor((exit.x + 20) / gridSize);
        const minY = Math.floor((exit.y - 20) / gridSize);
        const maxY = Math.floor((exit.y + 20) / gridSize);

        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                const cellKey = `${x},${y}`;
                if (grid.has(cellKey)) {
                    const stopsInCell = grid.get(cellKey);
                    for (const stop of stopsInCell) {
                        const distanceSquared = Math.pow(exit.x - stop.x, 2) + Math.pow(exit.y - stop.y, 2);
                        if (distanceSquared <= 400) {
                            count++;
                        }
                    }
                }
            }
        }

        if (count > maxCount) {
            maxCount = count;
            bestExitIndex = exit.index;
        }
    }

    console.log(bestExitIndex);
}