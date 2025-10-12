// https://contest.yandex.ru/contest/25597/run-report/144820631/

/*
* -- ПРИНЦИП РАБОТЫ --
* Алгоритм проверки возможности разбиения массива на две части с равными суммами:
* - Сначала вычисляется общая сумма всех элементов массива
* - Если сумма нечетная, разбиение невозможно (возвращаем False)
* - Целевая сумма для каждой части равна total / 2
* - Если максимальный элемент больше целевой суммы, разбиение невозможно
* - Изначально dp[0] = true (нулевую сумму можно получить всегда)

* -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
* - O(n × target), где n - количество элементов, target = total / 2
* - Вычисление общей суммы: O(n)
* - Поиск максимального элемента: O(n)
* - Основной цикл ДП: O(n × target)
* - В худшем случае target ≈ n × max_element

* -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
* - O(target) для хранения массива dp
* - O(n) для хранения входного массива
* - Общая пространственная сложность: O(target)
*/

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

function partition(collection) {
    const total = collection.reduce((sum, num) => sum + num, 0);
    if (total % 2 !== 0) {
        return false;
    }

    const target = total / 2;
    if (Math.max(...collection) > target) {
        return false;
    }

    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (const num of collection) {
        for (let s = target; s >= num; s -= 1) {
            if (dp[s - num]) {
                dp[s] = true;
            }
        }

        if (dp[target]) {
            return true;
        }
    }

    return dp[target];
}
function solve() {
    const _ = readInt();
    const collection = readArray();
    const result = partition(collection);

    process.stdout.write(`${ result ? 'True' : 'False' }`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    const arr = _inputLines[_curLine].trim().split(' ').map(Number);
    _curLine++;
    return arr;
}