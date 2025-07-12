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

function getNeighbours(matrix, row, col) {
    // Ваше решение
    let rowsCount = matrix.length;
    let columnsCount = matrix[0].length;
    // console.log(`RowCount = ${ rowsCount }`);
    // console.log(`ColCount = ${ columnsCount }`);

    // for (let rowIndex = 0; rowIndex < matrix.length ; rowIndex += 1) {
    //     console.log(matrix[rowIndex]);
    // }
    // console.log(`Row = ${ row }`);
    // console.log(`Col = ${ col }`);

    let results = []

    // console.log(matrix[row]);
    // console.log(matrix[row + 1]);
    // console.log(matrix[row + 1][col]);

    if (rowsCount === 1) {
        // Ничего не делаем
    } else if (row === 0) {
        let down = matrix[row + 1][col];

        results.push(down);

        // console.log(`Result = ${ results } `);
    } else if (row === (rowsCount - 1)) {
        let up = matrix[row - 1][col];

        results.push(up);
        // console.log(`Result = ${ results } `);
    } else {
        let up = matrix[row - 1][col];
        let down = matrix[row + 1][col];

        results.push(down);
        results.push(up);
        // console.log(`Result = ${ results } `);
    }
    if (columnsCount === 1) {
      // Ничего не делаем
    } else if (col === 0) {
        let right = matrix[row][col + 1];

        results.push(right);
    } else if (col === (columnsCount - 1)) {
        let left = matrix[row][col - 1];

        results.push(left);
    } else {
        let right = matrix[row][col + 1];
        let left = matrix[row][col - 1];

        results.push(right);
        results.push(left);
    }

    return results.sort((a, b) => a - b)
}

function solve() {
    const rows = readInt();
    const cols = readInt();
    const matrix = readMatrix(rows);
    const rowId = readInt();
    const colId = readInt();
    
    process.stdout.write(`${getNeighbours(matrix, rowId, colId).join(' ')}`);
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

function readMatrix(rowsCount) {
    var arr = [];
    for (let i = 0; i !== rowsCount; i++) {
        arr.push(readArray())
    }
    return arr;
}
