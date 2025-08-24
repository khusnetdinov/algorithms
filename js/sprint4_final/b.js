// https://contest.yandex.ru/contest/24414/run-report/141502409/
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
 * Реализация хэш-таблицы с методом цепочек для разрешения коллизий.
 *
 * -- ПРИНЦИП РАБОТЫ --
 * 1. Структура данных:
 *    - Хэш-таблица использует массив фиксированного размера (100000)
 *    - Каждая ячейка массива содержит связный список для обработки коллизий
 *    - Для вычисления хэша используется полиномиальная хэш-функция
 *
 * 2. Основные операции:
 *    - put(key, value): добавляет или обновляет значение по ключу
 *    - get(key): возвращает значение по ключу или 'None' если ключ отсутствует
 *    - delete(key): удаляет ключ и возвращает его значение или 'None'
 *
 * 3. Обработка коллизий:
 *    - При коллизии элементы добавляются в связный список соответствующей ячейки
 *    - Поиск, обновление и удаление работают через обход связного списка
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Алгоритм корректен, так как:
 * 1. Хэш-функция равномерно распределяет ключи по ячейкам таблицы
 * 2. Метод цепочек гарантирует, что все операции сохраняют целостность данных
 * 3. Операции put, get, delete корректно обрабатывают все случаи:
 *    - Добавление нового ключа
 *    - Обновление существующего ключа
 *    - Поиск отсутствующего ключа
 *    - Удаление ключа из середины/начала списка
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * В среднем случае (равномерное распределение): O(1) для всех операций
 * В худшем случае (все ключи в одной ячейке): O(n) для операций с списком
 * Хэш-функция: O(L) где L - длина ключа
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * O(n + m) где:
 *   - n - количество элементов в таблице
 *   - m - размер таблицы (100000 ячеек)
 * Дополнительная память для узлов связных списков: O(n)
 */
class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
}

LinkedList.prototype.append = function(key, value) {
    const newNode = new ListNode(key, value);
    if (!this.head) {
        this.head = newNode;
        return;
    }

    let current = this.head;
    while (current.next) {
        current = current.next;
    }
    current.next = newNode;
}

LinkedList.prototype.find = function(key) {
    let current = this.head;
    while (current) {
        if (current.key === key) {
            return current;
        }
        current = current.next;
    }
    return null;
}

LinkedList.prototype.update = function(key, value) {
    const node = this.find(key);
    if (node) {
        node.value = value;
        return value;
    }
    return null;
}

LinkedList.prototype.delete = function(key) {
    if (!this.head) return null;

    if (this.head.key === key) {
        const value = this.head.value;
        this.head = this.head.next;

        return value;
    }

    let current = this.head;
    while (current.next) {
        if (current.next.key === key) {
            const value = current.next.value;
            current.next = current.next.next;

            return value;
        }
        current = current.next;
    }

    return null;
}

class HashTable {
    constructor(size = 100000, base = 31, module = size + 3) {
        this.base = base;
        this.module = module;
        this.size = size;
        this.table = new Array(size);
    }
}

HashTable.prototype._hashFunction = function (key) {
    let hash = 0;
    let power = 1;

    for (let index = key.length - 1; index >= 0; index -= 1) {
        hash = (hash + key.charCodeAt(index) * power) % this.module;
        power = (power * this.base) % this.module;
    }

    return hash % this.size;
}

HashTable.prototype.put = function(key, value) {
    const index = this._hashFunction(key);
    const list = this.table[index] || (this.table[index] = new LinkedList());

    if (!list.update(key, value)) {
        list.append(key, value);
    }
}

HashTable.prototype.get = function(key) {
    const index = this._hashFunction(key);

    if (this.table[index]) {
        let node = this.table[index].find(key)

        if (node) {
            return node.value
        }
    }

    return null
}

HashTable.prototype.delete = function(key) {
    const index = this._hashFunction(key);

    if (this.table[index]) {
        let value = this.table[index].delete(key)

        if (value) {
            return value
        }
    }

    return null
}

function execute(commands) {
    const hashTable = new HashTable()

    let results = []
    for (const commandString of commands) {
        const command = commandString.split(' ')

        if (command[0] === 'put') {
            const key = command[1]
            const value = command[2]

            hashTable.put(key, value)
        } else if (command[0] === 'get') {
            const result = hashTable.get(command[1])

            results.push(result ? result : 'None')
        } else if (command[0] === 'delete') {
            const result = hashTable.delete(command[1])

            results.push(result ? result : 'None')
        }
    }

    return results
}

function solve() {
    const commandsCount = readInt();
    const commands = readCommands(commandsCount);
    const result = execute(commands);

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
