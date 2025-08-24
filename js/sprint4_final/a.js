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
 * Построение индекса: O(N × M), где:
 *   - N - количество документов
 *   - M - количество слов в документе
 * Обработка запроса: O(K × L), где:
 *   - K - количество уникальных слов в запросе
 *   - L - количество документов, содержащих слово
 * Сортировка результатов: O(D log D) для каждого запроса, где D - количество документов
 *
 * -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 * O(N × M) для хранения индекса, где:
 *   - N - количество уникальных слов
 *   - M - количество документов, содержащих слово
 * O(D) для хранения промежуточных результатов при обработке запроса
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
            .filter(([_, score]) => score > 0)
            .sort((a, b) => {
                if (b[1] !== a[1]) {
                    return b[1] - a[1];
                }
                return a[0] - b[0];
            })
            .slice(0, 5)
            .map(([documentId]) => (documentId + 1).toString());

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