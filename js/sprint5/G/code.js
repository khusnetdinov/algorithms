if (process.env.REMOTE_JUDGE !== 'true') {
    class CNode {
        constructor(value, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
}

// https://contest.yandex.ru/contest/24809/run-report/142432611/
function solution(root) {
    let maxSum = Number.NEGATIVE_INFINITY;

    function dfs(node) {
        if (node === null) return 0;

        const leftMax = Math.max(dfs(node.left), 0);
        const rightMax = Math.max(dfs(node.right), 0);

        const currentMax = node.value + leftMax + rightMax;
        maxSum = Math.max(maxSum, currentMax);

        return node.value + Math.max(leftMax, rightMax);
    }

    dfs(root);
    return maxSum;
}

function test() {
    var node1 = new CNode(5, null, null);
    var node2 = new CNode(1, null, null);
    var node3 = new CNode(-3, node2, node1);
    var node4 = new CNode(2, null, null);
    var node5 = new CNode(2, node4, node3);
    console.assert(solution(node5) === 6);
}