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

function isSameAsPrevious(index, collection) {
    return index > 0 && collection[index] === collection[index - 1];
}
// https://contest.yandex.ru/contest/23991/run-report/141792681/
// Перебираем все пары:
// Цикл (1 2 цикл )  + два указателя (3 4 индексы)
function sumOf4(target, rawCollection) {
    const collection = [...rawCollection].sort((a, b) => a - b);
    // console.log(`Target = ${target}, Collection = ${collection}`);

    const collectionSize = collection.length;
    const result = [];
    const seenQuadruplets = new Set();

    for (let firstIndex = 0; firstIndex < collectionSize - 3; firstIndex += 1) {
        if (isSameAsPrevious(firstIndex, collection)) continue;

        for (let secondIndex = firstIndex + 1; secondIndex < collectionSize - 2; secondIndex += 1) {
            if (secondIndex > firstIndex + 1 && isSameAsPrevious(secondIndex, collection)) continue;

            let thirdIndex = secondIndex + 1;
            let fourthIndex = collectionSize - 1;

            // console.log(`=> `, firstIndex, secondIndex, thirdIndex, fourthIndex);

            while (thirdIndex < fourthIndex) {
                const currentSum = collection[firstIndex] + collection[secondIndex] +
                    collection[thirdIndex] + collection[fourthIndex];

                // console.log(`?? `, firstIndex, secondIndex, thirdIndex, fourthIndex);

                if (currentSum === target) {
                    const quadruplet = [
                        collection[firstIndex],
                        collection[secondIndex],
                        collection[thirdIndex],
                        collection[fourthIndex]
                    ];
                    const quadrupletKey = quadruplet.join(',');

                    if (!seenQuadruplets.has(quadrupletKey)) {
                        seenQuadruplets.add(quadrupletKey);
                        result.push(quadruplet);
                    }

                    thirdIndex += 1;
                    fourthIndex -= 1;

                    while (thirdIndex < fourthIndex && collection[thirdIndex] === collection[thirdIndex - 1]) {
                        thirdIndex += 1;
                    }
                    while (thirdIndex < fourthIndex && collection[fourthIndex] === collection[fourthIndex + 1]) {
                        fourthIndex -= 1;
                    }
                } else if (currentSum < target) {
                    thirdIndex += 1;
                } else {
                    fourthIndex -= 1;
                }
            }
        }
    }

    return result;
}

function solve() {
    const _ = readInt()
    const target = readInt()
    const collection = readArray()
    let result = sumOf4(target, collection)

    process.stdout.write(`${result.length}`);
    process.stdout.write('\n');
    process.stdout.write(`${result.map(fours => fours.join(' ')).join('\n')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine += 1;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split(" ").map(el => Number(el));
    _curLine += 1;
    return arr;
}
