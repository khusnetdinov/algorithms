// https://contest.yandex.ru/contest/26131/run-report/145189084/

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


function compareWithOneFail(passport, base) {
    const n = passport.length;
    const m = base.length;

    if (Math.abs(n - m) > 1) {
        return false;
    }

    let i = 0, j = 0;

    // Ищем первое несовпадение
    while (i < n && j < m && passport[i] === base[j]) {
        i += 1;
        j += 1;
    }

    // Если дошли до конца обеих строк - строки равны
    if (i === n && j === m) {
        return true;
    }

    // Случай замены одного символа
    if (n === m) {
        return passport.slice(i + 1) === base.slice(j + 1)
    }

    // Случай, когда passport длиннее base на 1
    if (n === m + 1) {
        return passport.slice(i + 1) === base.slice(j)
    }

    // Случай, когда base длиннее passport на 1
    if (m === n + 1) {
        return passport.slice(i) === base.slice(j + 1)
    }

    return false;
}

function solve() {
    const string = readArray();
    const target = readArray();

    process.stdout.write(`${ compareWithOneFail(string, target) ? "OK" : "FAIL" }`);
}

function readArray() {
    var arr = _inputLines[_curLine].trim();
    _curLine += 1;
    return arr;
}
