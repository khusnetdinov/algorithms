// if (process.env.REMOTE_JUDGE !== 'true') {
class CNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
// }

// https://contest.yandex.ru/contest/24809/run-report/142433420/

function solution(root) {
    let totalSum = 0;

    function dfs(node, currentValue) {
        if (!node) return;

        currentValue = currentValue * 10 + node.value;

        if (!node.left && !node.right) {
            totalSum += currentValue;
            return;
        }

        if (node.left) {
            dfs(node.left, currentValue);
        }
        if (node.right) {
            dfs(node.right, currentValue);
        }
    }

    if (root) {
        dfs(root, 0);
    }

    return totalSum;
}

function test() {
    var node1 = new CNode(2, null, null);
    var node2 = new CNode(1, null, null);
    var node3 = new CNode(3, node1, node2);
    var node4 = new CNode(2, null, null);
    var node5 = new CNode(1, node4, node3);
    console.assert(solution(node5) === 275);
}