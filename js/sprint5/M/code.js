// https://contest.yandex.ru/contest/24809/run-report/142425158/
function siftUp(heap, index) {
    // Your code
    if (index === 1) {
        return index;
    }

    let currentIndex = index;

    while (currentIndex > 1) {
        const parentIndex = Math.floor(currentIndex / 2);

        if (heap[currentIndex] > heap[parentIndex]) {
            [heap[currentIndex], heap[parentIndex]] = [heap[parentIndex], heap[currentIndex]];
            currentIndex = parentIndex;
        } else {
            break;
        }
    }

    return currentIndex;
    // “ヽ(´▽｀)ノ”
}

function test() {
    var sample = [-1, 12, 6, 8, 3, 15, 7];
    console.assert(siftUp(sample, 5) == 1);
}
