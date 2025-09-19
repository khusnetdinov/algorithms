// https://contest.yandex.ru/contest/24810/run-report/142644622/



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

class Participant {
    constructor(login, solved, penalty) {
        this.login = login;
        this.solved = solved;
        this.penalty = penalty;
    }
}

function comparatorGreater(left, right) {
    if (left.solved > right.solved) {
        return true;
    } else if (left.solved === right.solved) {
        if (left.penalty < right.penalty) {
            return true;
        } else if (left.penalty === right.penalty) {
            return left.login < right.login;
        }
    }
    return false;
}

function siftDown(heap, index) {
    const size = heap.length - 1;
    const getLeftIndex = (index) => { return 2 * index };
    const getRightIndex = (index) => { return 2 * index + 1 };

    let currentIndex = index;
    while (true) {
        let leftChildIndex = getLeftIndex(currentIndex);
        let rightChildIndex = getRightIndex(currentIndex);
        let largestIndex = currentIndex;

        if (leftChildIndex <= size && comparatorGreater(heap[leftChildIndex], heap[largestIndex])) {
            largestIndex = leftChildIndex;
        }

        if (rightChildIndex <= size && comparatorGreater(heap[rightChildIndex], heap[largestIndex])) {
            largestIndex = rightChildIndex;
        }

        if (largestIndex === currentIndex) {
            break;
        }

        [heap[currentIndex], heap[largestIndex]] = [heap[largestIndex], heap[currentIndex]];
        currentIndex = largestIndex;
    }

    return currentIndex;
}

function siftUp(heap, index) {
    if (index === 1) {
        return index;
    }

    let currentIndex = index;

    while (currentIndex > 1) {
        const parentIndex = Math.floor(currentIndex / 2);

        if (comparatorGreater(heap[currentIndex], heap[parentIndex])) {
            [heap[currentIndex], heap[parentIndex]] = [heap[parentIndex], heap[currentIndex]];
            currentIndex = parentIndex;
        } else {
            break;
        }
    }

    return currentIndex;
}

function heapSort(collection) {
    const heap = [null];
    const size = collection.length;

    for (let index = 0; index < size; index += 1) {
        heap.push(collection[index]);
        siftUp(heap, heap.length - 1);
    }

    const sorted = [];
    while (heap.length > 1) {
        sorted.push(heap[1]);

        if (heap.length > 2) {
            heap[1] = heap.pop();
            siftDown(heap, 1);
        } else {
            heap.pop();
        }
    }

    for (let index = 0; index < size; index += 1) {
        collection[index] = sorted[index];
    }

    return collection;
}

function solve() {
    const n = readInt();
    const participants = [];

    for (let i = 0; i < n; i++) {
        const parts = readArray();
        participants.push(new Participant(parts[0], parseInt(parts[1], 10), parseInt(parts[2], 10)));
    }

    process.stdout.write(`${ heapSort(participants).map(p => p.login).join('\n') }`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(" ");
    _curLine++;
    return arr;
}