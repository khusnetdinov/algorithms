if (process.env.REMOTE_JUDGE !== 'true') {
    class Node {
      constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
      }
    }
}

// https://contest.yandex.ru/contest/22779/run-report/140405020/
function solution(node) {
    // Your code
    // ヽ(´▽`)/
    let current = node;
    while (current !== null) {
        console.log(current.value);
        current = current.next;
    }
}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    solution(node0);
    /*
    Output is:
    node0
    node1
    node2
    node3
    */
}