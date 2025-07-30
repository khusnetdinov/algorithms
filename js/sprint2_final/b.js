// https://contest.yandex.ru/contest/22781/run-report/140602913/
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

// Алгоритм постфиксной нотации на стеке
// На вход подается массив строк.
// Если строка может быть кастована в число, то мы кладем на стек.
// Если строка не может быть кастована -> считаем, что это операция
// Берем со стека 2 числа и выполняем операцию
// результат назад в стек, т/к у нас должно быть всегда 2 числа на стеке, чтоб можно было выполнить операцию
// В конце останется один резeзультат
// Временная сложность: зависит от количества элементов в строке, O(tokens.lenght), O(n), в любом случае мы должны пройти все элементы. Операции на стеке O(1)
// Пространственная сложность: O(n) - зависимость от количества токенов, в нотации количество чисел будет всегда на 1 больше чем операций 1 1 +,
// может быть, что на стеке половина + 1 числа, и числа - 1 элемент операторов можно предположить что 0(n/2) -> 0(n)
function calculate(tokens) {
    // Ваше решение
    let stack = [];

    // Операция прохода O(n)
    for (const token of tokens) {
        // Проверяем, что токен число или операция
        if (isNaN(token)) {
            let result = 0;

            // Достаем O(1)
            const right = stack.pop();
            const left = stack.pop()

            switch (token) {
                case '+':
                    result = left + right;
                    break;
                case '-':
                    result = left - right;
                    break;
                case '*':
                    result = left * right;
                    break;
                case '/':
                    result = Math.floor(left / right);
                    break;
            }

            // Кладем O(1)
            stack.push(result);
        } else {
            // Кладем O(1)
            stack.push(parseInt(token, 10))
        }
    }

    return stack.pop();
}

function solve() {
    const tokens = readLine();

    process.stdout.write(`${ calculate(tokens.split(' ')) }`);
}

function readLine() {
    const line = _inputLines[_curLine];
    _curLine++;
    return line;
}
