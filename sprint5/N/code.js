// if (process.env.REMOTE_JUDGE !== 'true') {
    class Node {
        constructor(value, left = null, right = null, size = 0) {
            this.value = value;
            this.left = left;
            this.right = right;
            this.size = size;
        }
    }
// }

// https://contest.yandex.ru/contest/24809/run-report/142433750/
function split(node, k) {
    if (node === null) {
        return [null, null];
    }

    let leftSize = node.left ? node.left.size : 0;
    if (k <= leftSize) {
        const [left, right] = split(node.left, k);
        const newRight = new Node(node.value, null, node.right, 1 + (node.right ? node.right.size : 0));
        if (right !== null) {
            newRight.left = right;
            newRight.size += right.size;
        }
        return [left, newRight];
    } else {
        const [left, right] = split(node.right, k - leftSize - 1);
        const newLeft = new Node(node.value, node.left, null, 1 + leftSize);
        if (left !== null) {
            newLeft.right = left;
            newLeft.size += left.size;
        }
        return [newLeft, right];
    }
}

function test() {
    const node1 = new Node(3, null, null, 1);
    const node2 = new Node(2, null, node1, 2);
    const node3 = new Node(8, null, null, 1);
    const node4 = new Node(11, null, null, 1);
    const node5 = new Node(10, node3, node4, 3);
    const node6 = new Node(5, node2, node5, 6);
    const res = split(node6, 4);

    console.assert(res[0].size === 4);
    console.assert(res[1].size === 2);
}

test()