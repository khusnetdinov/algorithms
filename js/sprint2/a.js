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


// https://contest.yandex.ru/contest/22779/run-report/140403466/
function transposeMatrix(rows, cols, matrix) {
    // Ваше решение
    // console.log(`Rows = ${ rows }`);
    // console.log(`Cols = ${ cols }`)
    // console.log(`Matrix = ${ matrix }`)

    let result = new Array(cols)
    for (let colIndex = 0; colIndex < cols; colIndex += 1) {
        result[colIndex] = new Array(rows);
    }

    // console.log(`Result = ${ result.length }`)

    for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
        for (let colIndex = 0; colIndex < cols; colIndex +=1) {
            // console.log(`Row = ${ rowIndex }, Col = ${ colIndex }, = ${ matrix[colIndex][rowIndex] }`)
            result[colIndex][rowIndex] = matrix[rowIndex][colIndex];
        }
    }

    // console.log(`Result = ${ result }`)

    return result
}

function solve() {
    const rows = readInt();
    const cols = readInt();
    const matrix = readMatrix(rows);
    const transposed = transposeMatrix(rows, cols, matrix);

    process.stdout.write(transposed.map(row => row.join(' ')).join('\n'));
}
function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}

function readMatrix(rowsCount) {
    var arr = [];
    for (let i = 0; i !== rowsCount; i++) {
        arr.push(readArray())
    }
    return arr;
}
