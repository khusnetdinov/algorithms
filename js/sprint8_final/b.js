// https://contest.yandex.ru/contest/26133/run-report/146114842/

/*
* -- ПРИНЦИП РАБОТЫ --
* Алгоритм использует префиксное дерево (Trie) для эффективного поиска слов в тексте и динамическое программирование для проверки возможности разбиения.
*
* 1. ПРЕФИКСНОЕ ДЕРЕВО (Trie):
* - Строится дерево, где каждый узел представляет символ, а путь от корня до узла образует префикс слова
* - Конец слова помечается флагом isEndOfWord
* - Метод find(text, start) находит все слова из словаря, которые начинаются с позиции start в тексте
*
* 2. ДИНАМИЧЕСКОЕ ПРОГРАММИРОВАНИЕ:
* - dp[i] = true, если префикс текста длиной i можно разбить на слова из словаря
* - База: dp[0] = true (пустая строка всегда разбивается)
* - Для каждой позиции i, где dp[i] = true, ищем все слова, начинающиеся с этой позиции
*
* -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
* - Построение Trie: O(m * l) - вставка m слов максимальной длины l
* - Заполнение dp массива: O(n * l) - для каждой из n позиций в худшем случае проверяем l символов в Trie
* - Общая: O(m * l + n * l) ~ O((m + n) * l) , где:
*   n - длина текста T
*   m - количество слов в словаре
*   l - максимальная длина слова
*
* -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
* - Память для Trie: O(m * l) - в худшем случае все слова не имеют общих префиксов
* - Массив dp: O(n)
* - Общая: O(m * l + n), где:
*   n - длина текста T
*   m - количество слов в словаре
*   l - максимальная длина слова
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

class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEndOfWord = true;
    }

    find(text, start) {
        const result = [];
        let node = this.root;

        for (let index = start; index < text.length; index += 1) {
            const char = text[index];
            if (!node.children.has(char)) {
                break;
            }
            node = node.children.get(char);
            if (node.isEndOfWord) {
                result.push(index - start + 1);
            }
        }

        return result;
    }
}

function canSegmentText(text, words) {
    const dp = new Array(text.length + 1).fill(false);
    dp[0] = true;


    const trie = new Trie();
    for (const word of words) {
        trie.insert(word);
    }

    for (let index = 0; index <= text.length; index += 1) {
        if (!dp[index]) continue;

        const wordLengths = trie.find(text, index);
        for (const wordLen of wordLengths) {
            if (index + wordLen <= text.length) {
                dp[index + wordLen] = true;
            }
        }
    }

    return dp[text.length];
}

function solve() {
    const string = readArray()
    const count = readInt()
    const collection = readLines(count);

    process.stdout.write(`${ canSegmentText(string, collection) ? "YES" : "NO" }`);
}

function readArray() {
    var arr = _inputLines[_curLine].trim();
    _curLine += 1;
    return arr;
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readLines(linesCount) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray())
    }
    return arr;
}