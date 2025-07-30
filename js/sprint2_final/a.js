// https://contest.yandex.ru/contest/22781/run-report/140601147/

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
class SizedDeque {
    // Создается массив collection заданного размера (maxSize), заполненный null
    // Указатель head (Front) устанавливается в -1 (перед началом массива)
    // Указатель tail (Back) устанавливается в 0 (первый элемент массива)
    // Запоминается максимальный размер (maxSize)
    // Текущий размер (size) устанавливается в 0
    // Временная сложность: Вставка и удаление выполняется за O(1), доступ к элементу в середине очереди за 0(maxSize)
    // Пространственная сложность: O(maxSize) - this.collection, остальные как числа 0(1), для всех 0(4 * 1)
    constructor(maxSize) {

        this.collection = new Array(maxSize).fill(null);
        this.head = maxSize - 1;
        this.tail = 0;
        this.maxSize = maxSize;
        this.size = 0;
    }

    // Проверяет, не заполнен ли дек
    // Записывает значение в текущую позицию head
    // Перемещает head на одну позицию назад (Back -> Front направление, с учетом кругового буфера)
    // Увеличивает счетчик размера
    // Операция выполняется за 0(1) т/к доступ по индексу, который мы храним в head
    pushFront(value) {
        if (this.size < this.maxSize) {
            this.collection[this.head] = value;
            this.head = (this.head - 1 + this.maxSize) % this.maxSize;
            this.size += 1;
        } else {
            return 'error'
        }
    }

    // Проверяет, не пуст ли дек
    // Вычисляет реальный индекс головы (head + 1, т.к. head указывает перед элементом)
    // Получает значение и очищает ячейку
    // Перемещает head на извлеченную позицию
    // Уменьшает счетчик размера
    // Возвращает значение
    // Операция выполняется за 0(1) т/к доступ по индексу, который мы храним в head
    popFront() {
        if (this.size !== 0) {
            const popFrontIndex = (this.head + 1) % this.maxSize;
            const value = this.collection[popFrontIndex];

            this.collection[popFrontIndex] = null;
            this.head = popFrontIndex;
            this.size -= 1;

            return value;
        } else {
            return 'error'
        }
    }

    // Проверяет, не заполнен ли дек
    // Записывает значение в текущую позицию tail
    // Перемещает tail на одну позицию вперед (Front -> Back направление, с учетом кругового буфера)
    // Увеличивает счетчик размера
    // Операция выполняется за 0(1) т/к доступ по индексу, который мы храним в head
    pushBack(value) {
        if (this.size < this.maxSize) {
            this.collection[this.tail] = value;
            this.tail = (this.tail + 1) % this.maxSize;
            this.size += 1;
        } else {
            return 'error'
        }
    }

    // Проверяет, не пуст ли дек
    // Вычисляет реальный индекс хвоста (tail - 1, т.к. tail указывает после элемента)
    // Получает значение и очищает ячейку
    // Перемещает tail на извлеченную позицию
    // Уменьшает счетчик размера
    // Возвращает значение
    // Операция выполняется за 0(1) т/к доступ по индексу, который мы храним в tail
    popBack() {
        if (this.size !== 0) {
            const popBackIndex = (this.tail - 1 + this.maxSize) % this.maxSize;
            const value = this.collection[popBackIndex];

            this.collection[popBackIndex] = null;
            this.tail = popBackIndex;
            this.size -= 1;

            return value;
        } else {
            return 'error'
        }
    }
}

function execute(commandsCount, maxSize, commands) {
    // Ваше решение
    let results = []
    const deque = new SizedDeque(maxSize)

    for (const command of commands) {
        if (command.startsWith('push_front')) {
            const value = parseInt(command.split(' ')[1]);
            const result = deque.pushFront(value);

            if (typeof result === "string") {
                results.push(result)
            }
        } else if (command === 'pop_front') {
            const result = deque.popFront();

            results.push(result);
        } else if (command.startsWith('push_back')) {
            const value = parseInt(command.split(' ')[1]);
            const result = deque.pushBack(value);

            if (typeof result === "string") {
                results.push(result)
            }
        } else if (command === 'pop_back') {
            const result = deque.popBack();

            results.push(result);
        }
    }

    return results
}

function solve() {
    const commandsCount = readInt();
    const maxSize = readInt();
    const commands = readCommands(commandsCount);
    const result = execute(commandsCount, maxSize, commands);

    process.stdout.write(result.join('\n'));
}
function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine];
    _curLine++;
    return arr;
}

function readCommands(commandsCount) {
    var arr = [];
    for (let i = 0; i !== commandsCount; i++) {
        arr.push(readArray())
    }
    return arr;
}
