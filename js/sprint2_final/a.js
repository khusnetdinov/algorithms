// https://contest.yandex.ru/contest/22781/run-report/140683154/

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
-- ПУСТЬ:
- M - максимальный размер дека (параметр конструктора)
- N - количество входных команд для обработки

-- ПРИНЦИП РАБОТЫ --
Класс SizedDeque реализует дек (двустороннюю очередь) фиксированного размера M на основе кольцевого буфера.
При инициализации создаётся массив заданного размера M, заполненный null. Указатели head и tail инициализируются
так, чтобы head указывал на последний элемент массива, а tail - на первый. Это позволяет эффективно добавлять
и удалять элементы с обоих концов дека без перемещения элементов в памяти.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Использование кольцевого буфера гарантирует:
1. Эффективное использование памяти - все операции выполняются за O(1)
2. Корректную работу указателей head и tail благодаря модульной арифметике
3. Сохранение порядка элементов при добавлении/удалении с обоих концов
4. Контроль переполнения и опустошения дека через проверку размера

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Все операции (pushFront, popFront, pushBack, popBack) выполняются за O(1), так как:
- Используется доступ по индексу
- Нет необходимости перемещать элементы
- Все вычисления индексов выполняются за константное время
- Общая временная сложность будет зависеть от N ~ O(N), M не влияет на временную сложность, т/к
операции используют модульную арифметику и выполняются за 0(1)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
O(M) - используется фиксированный массив заданного размера.
Дополнительная память требуется только для хранения:
- Указателей head и tail (O(1))
- Текущего размера дека (O(1))
- Максимального размера (O(1))
*/
class SizedDeque {
    static ERROR_MESSAGE = 'error'

    constructor(maxSize) {
        this.collection = new Array(maxSize).fill(null);
        this.head = maxSize - 1;
        this.tail = 0;
        this.maxSize = maxSize;
        this.size = 0;
    }


    pushFront(value) {
        if (this.isFull()) {
            return SizedDeque.ERROR_MESSAGE
        }

        this.collection[this.head] = value;
        this.head = this._nextPointer(this.head, -1)
        this.size += 1;
    }

    popFront() {
        if (this.isEmpty()) {
            return SizedDeque.ERROR_MESSAGE
        }

        const popFrontIndex = this._nextPointer(this.head, 1)
        const value = this.collection[popFrontIndex];

        this.collection[popFrontIndex] = null;
        this.head = popFrontIndex;
        this.size -= 1;

        return value;
    }

    pushBack(value) {
        if (this.isFull()) {
            return SizedDeque.ERROR_MESSAGE
        }

        this.collection[this.tail] = value;
        this.tail = this._nextPointer(this.tail, 1)
        this.size += 1;
    }

    popBack() {
        if (this.isEmpty()) {
            return SizedDeque.ERROR_MESSAGE
        }

        const popBackIndex =  this._nextPointer(this.tail, -1)
        const value = this.collection[popBackIndex];

        this.collection[popBackIndex] = null;
        this.tail = popBackIndex;
        this.size -= 1;

        return value;
    }

    isEmpty() {
        return this.size === 0
    }

    isFull() {
        return this.size === this.maxSize
    }

    _nextPointer(currentPointer, deltaPointer) {
        return (currentPointer + deltaPointer + this.maxSize) % this.maxSize
    }
}

function execute(commandsCount, maxSize, commands) {
    // Ваше решение
    const RADIX = 10;
    const deque = new SizedDeque(maxSize)
    let results = []

    for (const command of commands) {
        if (command.startsWith('push_front')) {
            const value = parseInt(command.split(' ')[1], RADIX);
            const result = deque.pushFront(value);

            if (typeof result === "string") {
                results.push(result)
            }
        } else if (command === 'pop_front') {
            const result = deque.popFront();

            results.push(result);
        } else if (command.startsWith('push_back')) {
            const value = parseInt(command.split(' ')[1], RADIX);
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
