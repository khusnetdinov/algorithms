const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n, m;
const edgeMap = new Map();
let isFirstLine = true;

rl.on('line', (line) => {
    if (isFirstLine) {
        const [nStr, mStr] = line.trim().split(' ');
        n = parseInt(nStr);
        m = parseInt(mStr);
        isFirstLine = false;
        return;
    }

    const [u, v] = line.trim().split(' ').map(Number);

    if (u !== v) {
        const key = u < v ? `${u},${v}` : `${v},${u}`;
        edgeMap.set(key, true);
    }
});

rl.on('close', () => {
    const expected = n * (n - 1) / 2;
    console.log(edgeMap.size === expected ? "YES" : "NO");
});