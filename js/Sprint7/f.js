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

// https://contest.yandex.ru/contest/25596/run-report/144480990/

function countWays(n, k) {
    const MOD = 10**9 + 7;

    if (n === 1) return 1;

    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;

    for (let i = 2; i <= n; i += 1) {
        for (let j = 1; j <= k; j += 1) {
            if (i - j >= 1) {
                dp[i] = (dp[i] + dp[i - j]) % MOD;
            }
        }
    }

    return dp[n];
}

function solve() {
    const data = readArray();

    process.stdout.write(`${ countWays(data[0], data[1]) }`);
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
    _curLine += 1;
    return arr;
}
