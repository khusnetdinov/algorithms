if (process.env.REMOTE_JUDGE !== 'true') {
    class Node {
        constructor(value, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
}

// https://contest.yandex.ru/contest/24809/run-report/142066733/

function insert(node, value) {
    // Ваш код
    if (node === null) {
        return new Node(value)
    }

    if (value < node.value) {
        node.left = insert(node.left, value)
    } else {
        node.right = insert(node.right, value)
    }

    return node
    // «ヽ(´▽｀)ノ»
}
function test() {
    var node1 = new Node(7, null, null);
    var node2 = new Node(8, node1, null);
    var node3 = new Node(7, null, node2);
    var newHead = insert(node3, 6);
    console.assert(newHead === node3);
    console.assert(newHead.left.value === 6);
}
