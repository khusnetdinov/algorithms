//https://contest.yandex.ru/contest/23815/run-report/140995600/

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

/*
 * Реализация алгоритма быстрой сортировки (QuickSort) с компаратором для сложных объектов.
 *
 * -- ПРИНЦИП РАБОТЫ --
 * 1. Выбирается опорный элемент (pivot) - в данной реализации это последний элемент диапазона
 * 2. Массив разбивается на две части функцией partition():
 *    - В левой части элементы, которые "меньше" опорного (по правилам компаратора)
 *    - В правой части элементы, которые "больше или равны" опорному
 * 3. Рекурсивно применяется сортировка к обеим частям
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Алгоритм корректен, так как:
 * 1. После работы partition() опорный элемент занимает свою окончательную позицию
 * 2. Все элементы слева от опорного будут "меньше" его (по правилам компаратора)
 * 3. Все элементы справа будут "больше или равны"
 * 4. Рекурсивная обработка подмассивов гарантирует полную сортировку
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * В среднем случае: O(n log n) - оптимальное разбиение на примерно равные части
 * В худшем случае: O(n²) - при неудачном выборе опорного элемента (массив уже отсортирован)
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * O(log n) - глубина рекурсии (при оптимальном разбиении)
 * O(n) - в худшем случае (несбалансированные разбиения)
 */
function quickSort(collection, left = 0, right = collection.length - 1) {
    // Ваше решение
    if (left < right) {
        const pivot = partition(collection, left, right);

        quickSort(collection, left, pivot - 1);
        quickSort(collection, pivot + 1, right);
    }
    
    return collection;
}

function partition(collection, left, right) {
    const pivot = collection[right];
    let leftIndex = left - 1;

    for (let rightIndex = left; rightIndex < right; rightIndex += 1) {
        if (ratingComparator(collection[rightIndex], pivot) < 0) {
            leftIndex += 1;
            [collection[leftIndex], collection[rightIndex]] = [collection[rightIndex], collection[leftIndex]];
        }
    }

    [collection[leftIndex + 1], collection[right]] = [collection[right], collection[leftIndex + 1]];

    return leftIndex + 1;
}

function ratingComparator(prev, next) {
    if (prev.tasks !== next.tasks) {
        return next.tasks - prev.tasks;
    } else if (prev.penalty !== next.penalty) {
        return prev.penalty - next.penalty;
    } else {
        return prev.name.localeCompare(next.name);
    }
}

function solve() {
    const rows = readInt();
    const rating = readRating(rows);

    process.stdout.write(quickSort(rating).map(row => row.name).join('\n'));
}
function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].split(" ");
    _curLine++;
    return arr;
}

function readRating(rowsCount) {
    var arr = [];
    for (let leftIndex = 0; leftIndex !== rowsCount; leftIndex++) {
        let record = readArray()

        arr.push({
            name: record[0],
            tasks: parseInt(record[1], 10),
            penalty: parseInt(record[2], 10),
        })
    }
    return arr;
}
