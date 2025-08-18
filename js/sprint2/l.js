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

// https://contest.yandex.ru/contest/22779/run-report/140548727/
function fibo(number, digits) {
    // Ваше решение
    // console.log(`Number ${ number }, Digits = ${ digits }`)

    const module = Math.pow(10, digits);

    if (number === 0) return 1 % module;
    if (number === 1) return 1 % module;

    let before1 = 1;
    let before2 = 1;
    for (let index = 2; index <= number; index += 1) {
        let fibo = (before1 + before2) % module ;
        // console.log(`Index = ${ index }, Fibos = ${ fibo } (${ before1 } + ${ before2 })`)
        before2 = before1
        before1 = fibo
    }

    // console.log(`Before1 = ${ before1 }, Before2 ${ before2 }`);

    return before1
}

function solve() {
    const number = readArray();
    const result = fibo(parseInt(number[0]), parseInt(number[1]));

    process.stdout.write(result.toString());
}
function readArray() {
    var arr = _inputLines[_curLine].trim().split(" ");
    _curLine++;
    return arr;
}
