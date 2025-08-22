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

// Если ответ существует, верните список из двух элементов
// Если нет - то верните пустой список 
function twoSum(raw_array, targetSum) {
    // Ваше решение
    let array = raw_array.sort((a, b) => a - b);
    // console.log(`Array: ${ array }`);
    let left_index = 0;
    let right_index = array.length - 1;

    while (left_index < right_index) {
        const left = array[left_index];
        const right = array[right_index];
        const currentSum =  left + right;
        // console.log("------");
        // console.log(`Left: ${ left_index }`);
        // console.log(`Right: ${ right_index }`);

        if (currentSum === targetSum) {
            // console.log(`Sum = ${ currentSum } === Target ${ targetSum }`);
            return [array[left_index], array[right_index]];
        } else if (currentSum < targetSum) {
            // console.log(`Sum = ${ currentSum } < Target ${ targetSum }`);
            left_index += 1;
        } else if (currentSum > targetSum) {
            // console.log(`Sum = ${ currentSum } > Target ${ targetSum }`);
            right_index -= 1;
            // console.log("------");
        }
    }

    // const previous = new Set();
    //
    // for (const number of raw_array) {
    //     const last = targetSum - number;
    //
    //     // Если Y уже лежит в previous, то вернуть A, Y
    //     if (previous.has(last)) {
    //         return [last, number];
    //     }
    //
    //     // Иначе добавить A в previous
    //     previous.add(number);
    // }

    return [];
}

function solve() {
    const n = readInt();
    const array = readArray();
    const targetSum = readInt();
    const ans = twoSum(array, targetSum);
    if (ans.length === 0) {
        console.log("None")    
    } else {
        process.stdout.write(`${ans.join(' ')}`);
    }
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