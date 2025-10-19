// https://contest.yandex.ru/contest/26131/run-report/145828138/

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

function prefix(string) {
  const result = new Array(string.length).fill(0);

  for (let i = 1; i < string.length; i += 1) {
    let j = result[i - 1];

    while (j > 0 && string[i] !== string[j]) {
      j = result[j - 1];
    }

    if (string[i] === string[j]) {
      j += 1;
    }

    result[i] = j;
  }

  return result;
}

function solve() {
  const string = readArray();

  process.stdout.write(`${prefix(string).join(" ")}`);
}

function readArray() {
  var arr = _inputLines[_curLine].trim();
  _curLine += 1;
  return arr;
}
