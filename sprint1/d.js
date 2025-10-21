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

// https://contest.yandex.ru/contest/22449/problems/D/?success=140095846#51450/2020_11_12/vkfhXbR9AZ
function getWeatherRandomness(temperatures) {
    // Ваше решение
    const maxIndex = temperatures.length - 1;

    if (maxIndex === 0) return 1;
    if (maxIndex === 1) {
        if (temperatures[0] !== temperatures[1]) {
            return 1;
        } else {
            return 0;
        }
    }

    let result = 0;

    if (temperatures[0] > temperatures[1]) result += 1;
    for (let index = 1; index < maxIndex; index += 1) {
        if ((temperatures[index - 1] < temperatures[index]) && (temperatures[index] > temperatures[index + 1])) result += 1;
    }
    if (temperatures[maxIndex - 1] < temperatures[maxIndex]) result += 1;

    return result;
}

function solve() {
    const n = readInt();
    const temperatures = readArray();
    process.stdout.write(`${getWeatherRandomness(temperatures)}`);
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
