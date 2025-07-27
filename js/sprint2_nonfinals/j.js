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

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class MyQueueSized {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    put(value) {
        const newNode = new Node(value);

        if (this.tail) {
            this.tail.next = newNode;
        } else {
            this.head = newNode;
        }

        this.tail = newNode;
        this.length += 1;
    }

    get() {
        if (!this.head) {
            return 'error';
        }

        const value = this.head.value;
        this.head = this.head.next;

        if (!this.head) {
            this.tail = null;
        }

        this.length -= 1;
        return value;
    }

    size() {
        return this.length
    }
}

function execute(commandsCount, commands) {
    // Ваше решение
    let results = []
    // console.log(`Count = ${ commandsCount }`)
    // console.log(`Commands = ${ commands }`)

    const queue = new MyQueueSized()

    for (const command of commands) {
        if (command.startsWith('put')) {
            const value = parseInt(command.split(' ')[1]);

            queue.put(value);
            // console.log(`Command = ${ command }`)
        } else if (command === 'get') {
            const result = queue.get();

            if (result !== undefined) {
                results.push(result.toString());
            }
            // console.log(`Command = ${ command } Result = ${ result }`)
        } else if (command === 'size') {
            const result = queue.size().toString()

            results.push(result);
            // console.log(`Command = ${ command } Result = ${ result }`)
        }
    }
    // console.log(`Results = ${ results }`)

    return results
}

//https://contest.yandex.ru/contest/22779/run-report/140517893/
function solve() {
    const commandsCount = readInt();
    const commands = readCommands(commandsCount);
    const result = execute(commandsCount, commands);

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
