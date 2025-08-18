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

class StackMax {
    constructor() {
        this.stack = [];
        this.maxStack = []; // Вспомогательный стек для хранения максимумов
    }

    push(value) {
        this.stack.push(value);
        if (this.maxStack.length === 0 || value >= this.maxStack[this.maxStack.length - 1]) {
            this.maxStack.push(value);
        }
    }

    pop() {
        if (this.stack.length === 0) {
            return 'error';
        }
        const poppedValue = this.stack.pop();
        if (poppedValue === this.maxStack[this.maxStack.length - 1]) {
            this.maxStack.pop();
        }
        return null
    }

    top() {
        if (this.stack.length === 0) {
            return 'error';
        }

        return this.stack[this.stack.length - 1]
    }

    get_max() {
        if (this.stack.length === 0) {
            return 'None';
        }
        return this.maxStack[this.maxStack.length - 1];
    }

}


// https://contest.yandex.ru/contest/22779/run-report/140450362/
function execute(commandsCount, commands) {
    // Ваше решение
    let results = []
    // console.log(`Count = ${ commandsCount }`)
    // console.log(`Commands = ${ commands }`)

    const stack = new StackMax()

    for (const command of commands) {
        if (command.startsWith('push')) {
            const value = parseInt(command.split(' ')[1]);
            // console.log(`Command = ${ command }`)
            stack.push(value);
        } else if (command === 'pop') {
            const result = stack.pop();

            if (result !== null) {
                results.push(result)
            }
            // console.log(`Command = ${ command } Result = ${ result }`)
        } else if (command === 'top') {
            const result = stack.top();

            results.push(result)
            // console.log(`Command = ${ command } Result = ${ result }`)
        } else if (command === 'get_max') {
            const result = stack.get_max();
            // console.log(`Command = ${ command } Result = ${ result }`)

            results.push(result)
        }

        // console.log(`Stack = ${ stack.stack }, Max = ${ stack.maxStack }`)
    }
    // console.log(`Results = ${ results }`)

    return results
}

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
