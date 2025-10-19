// https://contest.yandex.ru/contest/26131/run-report/145284020/

const _readline = require("readline");
const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];
let _curLine = 0;

_reader.on("line", (line) => {
  _inputLines.push(line);
});

process.stdin.on("end", solve);

function findPatternWithShift(n, measurements, m, pattern) {
  const result = [];

  // Если длина шаблона больше длины последовательности
  if (m > n) {
    return result;
  }

  // Если шаблон длины 1 - особый случай
  if (m === 1) {
    for (let i = 0; i <= n - m; i++) {
      result.push(i + 1);
    }
    return result;
  }

  // Вычисляем разности для шаблона
  const patternDiffs = [];
  for (let i = 1; i < m; i++) {
    patternDiffs.push(pattern[i] - pattern[i - 1]);
  }

  // Вычисляем разности для последовательности
  const measurementDiffs = [];
  for (let i = 1; i < n; i++) {
    measurementDiffs.push(measurements[i] - measurements[i - 1]);
  }

  // Ищем шаблон разностей в последовательности разностей
  for (let i = 0; i <= measurementDiffs.length - patternDiffs.length; i++) {
    let match = true;

    // Проверяем совпадение разностей
    for (let j = 0; j < patternDiffs.length; j++) {
      if (measurementDiffs[i + j] !== patternDiffs[j]) {
        match = false;
        break;
      }
    }

    // Если разности совпали, проверяем полное совпадение с учетом сдвига
    if (match) {
      const shift = measurements[i] - pattern[0];
      let fullMatch = true;

      for (let j = 0; j < m; j++) {
        if (measurements[i + j] !== pattern[j] + shift) {
          fullMatch = false;
          break;
        }
      }

      if (fullMatch) {
        result.push(i + 1); // +1 потому что нумерация с 1
      }
    }
  }

  return result;
}

function solve() {
  const m = readInt();
  const ms = readArray();
  const n = readInt();
  const ns = readArray();

  process.stdout.write(`${findPatternWithShift(m, ms, n, ns).join(" ")}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  var arr = _inputLines[_curLine].trim().split(" ").map(Number);
  _curLine += 1;
  return arr;
}
