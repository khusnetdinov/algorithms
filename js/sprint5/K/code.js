if (process.env.REMOTE_JUDGE !== 'true') {
    class Node {
        constructor(value, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
}

// https://contest.yandex.ru/contest/24809/run-report/142062552/

function printRange(root, min, max) {
    // Your code
    if (root.left && root.value >= min) {
        printRange(root.left, min, max)
    }

    if (root.value >= min && root.value <= max) {
        process.stdout.write(`${ root.value } `);
    }

    if (root.right && root.value <= max) {
        printRange(root.right, min, max)
    }
    // “ヽ(´▽｀)ノ”
}

function test() {
    var node1 = new Node(2, null, null);
    var node2 = new Node(1, null, node1);
    var node3 = new Node(8, null, null);
    var node4 = new Node(8, null, node3);
    var node5 = new Node(9, node4, null);
    var node6 = new Node(10, node5, null);
    var node7 = new Node(5, node2, node6);
    printRange(node7, 2, 8);
    // expected output: 2 5 8 8
}