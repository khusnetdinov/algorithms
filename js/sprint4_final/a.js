// https://contest.yandex.ru/contest/24414/run-report/141497611/

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
 * Реализация поисковой системы с использованием обратного индекса.
 *
 * -- ПРИНЦИП РАБОТЫ --
 * 1. Построение индекса:
 *    - Для каждого документа создается хеш частотности слов
 *    - Для каждого слова создается список пар [ID документа, частота слова]
 * 2. Обработка поисковых запросов:
 *    - Для каждого запроса удаляются дубликаты слов через Set
 *    - Для каждого уникального слова запроса находится список документов в индексе
 *    - Вычисляется релевантность документов по сумме частот слов запроса
 * 3. Сортировка и фильтрация результатов:
 *    - Документы сортируются по убыванию релевантности
 *    - При равенстве баллов предпочтение отдается документам с меньшим ID
 *    - Выбираются топ-5 наиболее релевантных документов
 *
 * -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 * Алгоритм корректен, так как:
 * 1. Обратный индекс считает частоту слов в документах
 * 2. Подсчет релевантности учитывает все уникальные слова запроса и их частоту
 * 3. Сортировка гарантирует, что наиболее релевантные документы будут показаны первыми
 *
 * -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 * Построение индекса: O(D × 2W) ~ O(D × W), где:
 *   - D - количество документов на входе
 *   - W - количество слов в документе
 *
 * Обработка запроса: O(Q × (QW × QW + QW)) ~ O(Q × QW × QW), где:
 *   - Q - количество запросов
 *   - QW - количество слов в запросе (в худшем варианте все слова из запроса в индексе)
 *
 * Общая сложность: O(D × W + Q × QW × QW)
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * O(W) для хранения индекса, где:
 *   - W - количество слов
 *
 * O(Q) для хранения промежуточных результатов при обработке запроса
 *   - Q - количество слов в запросе
 *
 * Общая сложность O(W + Q)
 */
function search(documents, queries) {
    const invertedIndex = new Map();
    for (let documentId = 0; documentId < documents.length; documentId += 1) {
        const words = documents[documentId];
        const wordCounts = new Map();

        for (const word of words) {
            wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
        }

        for (const [word, count] of wordCounts) {
            if (!invertedIndex.has(word)) {
                invertedIndex.set(word, []);
            }
            invertedIndex.get(word).push([documentId, count]);
        }
    }

    const results = [];
    for (const queryDocument of queries) {
        const queryWords = new Set(queryDocument);
        const documentScores = new Map();

        for (const word of queryWords) {
            if (invertedIndex.has(word)) {
                for (const [documentId, count] of invertedIndex.get(word)) {
                    documentScores.set(documentId, (documentScores.get(documentId) || 0) + count);
                }
            }
        }

        const scoredDocs = Array.from(documentScores.entries())
            .sort((prev, next) => next[1] - prev[1] || prev[0] - next[0])
            .slice(0, 5)
            .map(([documentId]) => documentId + 1)

        results.push(scoredDocs.join(' '));
    }

    return results
}

function solve() {
    const documentsCount = readInt();
    const documents = readLines(documentsCount);
    const searchCount = readInt();
    const searches = readLines(searchCount);

    process.stdout.write(`${search(documents, searches).join('\n')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].split(" ");
    _curLine++;
    return arr;
}

function readLines(linesCount) {
    var arr = [];
    for (let i = 0; i !== linesCount; i++) {
        arr.push(readArray())
    }
    return arr;
}