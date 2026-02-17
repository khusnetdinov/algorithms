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

// https://contest.yandex.ru/contest/22779/run-report/140451353/
function isCorrectBracketSeq(collection) {
    // Ваше решение
    // console.log(`Collection = ${ collection }`)
    let stack = []

    const pairs = {
        "(": ")",
        "{": "}",
        "[": "]"
    }

    // console.log(`Keys = ${ Object.keys(pairs) }`)

    for (let index in collection) {
        let bracket = collection[index];

        // console.log(`Bracket = ${ bracket }, => ${ pairs[bracket] }`);

        if (bracket in pairs) {
            stack.push(bracket)
        } else {
            const lastOpenBracket = stack.pop()
            // console.log(`lastOpenBracket = ${ lastOpenBracket }`);

            if (pairs[lastOpenBracket] === bracket) {
                continue
            } else {
                return 'False'
            }
        }
    }

    if (stack.length === 0) {
        return 'True'
    } else {
        return 'False'
    }
}

function solve() {
    const brackets = readArray();
    process.stdout.write(`${isCorrectBracketSeq(brackets)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim().split("");
    _curLine++;
    return arr;
}
