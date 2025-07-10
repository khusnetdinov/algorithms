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

function movingAverage(array, windowSize) {
  // Ваше решение
  let result = [];

  // Наивное решение: begin
  // let maxIndex = array.length - (windowSize - 1);
  // for (let index = 0; index < maxIndex; index += 1) {
  //   let windowSum = 0;
  //   for (let windowIndex = index; windowIndex < index + windowSize; windowIndex += 1) {
  //     let indexValue = array[windowIndex];

  //     windowSum += indexValue;
  //   }

  //   let windowAverage =  windowSum / windowSize;

  //   result.push(windowAverage);
  // }
  // Наивное решение: end

  // Оптимизированное решение: begin
  let currentWindowSum = 0;
  for (let index = 0; index < windowSize; index += 1) {
    currentWindowSum += array[index];
  }
  // console.log(`Sum[0] = ${currentWindowSum}`);
  result.push(currentWindowSum / windowSize);

  let maxIndex = array.length - windowSize;
  for (let index = 0; index < maxIndex; index += 1) {
    currentWindowSum -= array[index];
    currentWindowSum += array[index + windowSize];

    result.push(currentWindowSum / windowSize);
  }
  // Оптимизированное решение: end

  return result;
}

function solve() {
  const n = readInt();
  const arr = readArray();
  const windowSize = readInt();
  process.stdout.write(`${movingAverage(arr, windowSize).join(' ')}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
  _curLine++;
  return arr;
}
