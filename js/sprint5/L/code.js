
// https://contest.yandex.ru/contest/24809/run-report/142424415/
function siftDown(heap, index) {
    // Your code
    const size = heap.length - 1;
    const getLeftIndex = (index) => { return 2 * index };
    const getRightIndex = (index) => { return 2 * index + 1 }

    let currentIndex = index
    while (true) {
        let leftChildIndex = getLeftIndex(currentIndex)
        let rightChildIndex = getRightIndex(currentIndex)
        let largestIndex = currentIndex

        // console.log(`left = ${ heap[leftChildIndex] } root = ${ heap[currentIndex] } right = ${ heap[rightChildIndex] }`)

        if (leftChildIndex <= size && heap[leftChildIndex] > heap[largestIndex]) {
            largestIndex = leftChildIndex;
        }

        if (rightChildIndex <= size && heap[rightChildIndex] > heap[largestIndex]) {
            largestIndex = rightChildIndex;
        }

        if (largestIndex === currentIndex) {
            break;
        }

        [heap[currentIndex], heap[largestIndex]] = [heap[largestIndex], heap[currentIndex]];

        currentIndex = largestIndex;
    }

    return currentIndex;
    // “ヽ(´▽｀)ノ”
}

function test() {
    var sample = [-1, 12, 1, 8, 3, 4, 7];
    console.assert(siftDown(sample, 2) == 5);
}
