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

// https://contest.yandex.ru/contest/22449/problems/J/?success=140126545#3484683/2020_11_16/FK4DlcVHux
function factorize(number) {
    // Ваше решение
    // Смотрим максимальное число для проверки
    let maxFactor = number
    let factors = [];

    // Смотрим четные
    while (number % 2 === 0) {
        factors.push(2);
        // console.log(`Factor = ${ 2 }`)

        number = number / 2;
    }

    // Берем только нечетные
    let oddDivisor = 3;
    while (oddDivisor * oddDivisor < maxFactor) {
        while (number % oddDivisor === 0) {
            factors.push(oddDivisor);

            // console.log(`Factor = ${ oddDivisor }`)

            number = number / oddDivisor;
        }
        oddDivisor += 2;
    }

    if (number > 1) factors.push(number);

    return factors
}

function solve() {
    const number = readInt();
    const factorization = factorize(number)
    process.stdout.write(`${factorization.join(' ')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
