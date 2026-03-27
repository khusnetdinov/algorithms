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

function solve() {
    const data = _inputLines[0].split(' ');
    const n = parseInt(data[0], 10);
    const k = parseInt(data[1], 10);
    const s = _inputLines[1];
    const L = s.length;

    // Для k=1 все подстроки длины n подходят
    if (k === 1) {
        const result = [];
        for (let i = 0; i <= L - n; i++) {
            result.push(i);
        }
        process.stdout.write(result.join(' '));
        return;
    }

    // Используем 64-битное хеширование для минимизации коллизий
    const base = 911382323; // Большое простое число

    // Предвычисляем степени base (используем BigInt для 64-битной арифметики)
    const pow = new Array(n);
    pow[0] = 1n;
    for (let i = 1; i < n; i++) {
        pow[i] = pow[i-1] * BigInt(base);
    }

    // Вычисляем хеш первой подстроки
    let hash = 0n;
    for (let i = 0; i < n; i++) {
        hash = hash * BigInt(base) + BigInt(s.charCodeAt(i));
    }

    // Создаем массив для хранения пар [хеш, индекс]
    const hashes = new Array(L - n + 1);
    hashes[0] = [hash, 0];

    // Вычисляем хеши для всех остальных подстрок
    for (let i = 1; i <= L - n; i++) {
        hash = hash - BigInt(s.charCodeAt(i-1)) * pow[n-1];
        hash = hash * BigInt(base) + BigInt(s.charCodeAt(i + n - 1));
        hashes[i] = [hash, i];
    }

    // Сортируем по хешу
    hashes.sort((a, b) => {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
    });

    // Находим группы одинаковых хешей
    const result = [];
    let count = 1;
    let firstIndex = hashes[0][1];

    for (let i = 1; i < hashes.length; i++) {
        if (hashes[i][0] === hashes[i-1][0]) {
            count++;
            // Проверяем, действительно ли подстроки одинаковые (на случай коллизий)
            // Это дополнительная проверка для надежности
            if (s.substring(hashes[i][1], hashes[i][1] + n) ===
                s.substring(hashes[i-1][1], hashes[i-1][1] + n)) {
                firstIndex = Math.min(firstIndex, hashes[i][1]);
            } else {
                // Коллизия хеша - разные строки
                if (count > 1) {
                    // Завершаем предыдущую группу
                    if (count - 1 >= k) {
                        result.push(firstIndex);
                    }
                    // Начинаем новую группу
                    count = 2;
                    firstIndex = Math.min(hashes[i-1][1], hashes[i][1]);
                } else {
                    count = 1;
                    firstIndex = hashes[i][1];
                }
            }
        } else {
            if (count >= k) {
                result.push(firstIndex);
            }
            count = 1;
            firstIndex = hashes[i][1];
        }
    }

    if (count >= k) {
        result.push(firstIndex);
    }

    // Сортируем индексы для вывода
    result.sort((a, b) => a - b);
    process.stdout.write(result.join(' '));
}