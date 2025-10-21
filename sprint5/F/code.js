// if (process.env.REMOTE_JUDGE !== 'true') {
    class CNode {
        constructor(value, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
// }

// https://contest.yandex.ru/contest/24809/run-report/142430925/

function solution(root) {
    // Your code
    function maxDeep(root, deep) {
        if (root === null) {
            return deep
        }

        return Math.max(maxDeep(root.left, deep + 1), maxDeep(root.right, deep + 1))
    }

    return maxDeep(root, 0)
    // “ヽ(´▽｀)ノ”
}

function test() {
    var node1 = new CNode(1, null, null);
    var node2 = new CNode(4, null, null);
    var node3 = new CNode(3, node1, node2);
    var node4 = new CNode(8, null, null);
    var node5 = new CNode(5, node3, node4);
    console.assert(solution(node5) === 3);
}