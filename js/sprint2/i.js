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

class MyQueueSized {
    constructor(maxSize) {
        this.queue = [];
        this.maxSize = maxSize;
    }

    push(value) {
        if (this.queue.length < this.maxSize) {
            this.queue.push(value)
        } else {
            return 'error'
        }
    }

    pop() {
        if (this.queue.length === 0) {
            return 'None'
        } else {
            return this.queue.shift()
        }
    }

    peek() {
        if (this.queue.length === 0) {
            return 'None'
        } else {
            return this.queue[0]
        }
    }

    size() {
        return this.queue.length
    }
}

// https://contest.yandex.ru/contest/22779/run-report/140517551/
function execute(commandsCount, maxSize, commands) {
    // Ваше решение
    let results = []
    // console.log(`Count = ${ commandsCount }`)
    // console.log(`MaxSize = ${ maxSize }`)
    // console.log(`Commands = ${ commands }`)

    const queue = new MyQueueSized(maxSize)

    for (const command of commands) {
        if (command.startsWith('push')) {
            const value = parseInt(command.split(' ')[1]);
            const result = queue.push(value);

            if (typeof result === "string") {
                results.push(result)
            }
            // console.log(`Command = ${ command }`)
        } else if (command === 'pop') {
            const result = queue.pop();

            results.push(result)
            // console.log(`Command = ${ command } Result = ${ result }`)
        } else if (command === 'peek') {
            const result = queue.peek();

            results.push(result)
            // console.log(`Command = ${ command } Result = ${ result }`)
        } else if (command === 'size') {
            const result = queue.size();

            results.push(result)
            // console.log(`Command = ${ command } Result = ${ result }`)
        }

        // console.log(`Queue = ${ queue.queue }, Max = ${ queue.maxSize }`)
    }
    // console.log(`Results = ${ results }`)

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
