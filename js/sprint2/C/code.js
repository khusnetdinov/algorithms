if (process.env.REMOTE_JUDGE !== 'true') {
    class Node {
      constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
      }
    }
}
// https://contest.yandex.ru/contest/22779/run-report/140409753/
function solution(head, index) {
    // Your code
    // ヽ(´▽`)/
    // Если index = 0
    if (index === 0) {
        return head.next
    }

    let currentNode = head
    let currentIndex = 0;

    while (currentNode !== null && currentIndex < index - 1) {
        currentNode = currentNode.next;
        currentIndex += 1;
    }

    // Если дошли до конца и не нашли index
    if (currentNode === null || currentNode.next === null) {
        return head
    }

    currentNode.next = currentNode.next.next

    return head
}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    var newHead = solution(node0, 1);
    // result is node0 -> node2 -> node3
}