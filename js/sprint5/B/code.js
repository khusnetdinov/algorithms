if (process.env.REMOTE_JUDGE !== 'true') {
    class CNode {
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
}
// https://contest.yandex.ru/contest/24809/run-report/142182015/

function solution(root) {
    function isBalanced(node) {
        if (node === null) {
            return [true, 0];
        }

        let [leftIsBalanced, leftHeight] = isBalanced(node.left);
        let [rightIsBalanced, rightHeight] = isBalanced(node.right);

        if (!leftIsBalanced || !rightIsBalanced) {
            return [false, 0];
        }

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return [false, 0];
        }

        return [true, Math.max(leftHeight, rightHeight) + 1];
    }

    return isBalanced(root)[0];
}

function test() {
    var node1 = new CNode(1);
    var node2 = new CNode(-5);
    var node3 = new CNode(3);
    node3.left = node1;
    node3.right = node2;
    var node4 = new CNode(10);
    var node5 = new CNode(2);
    node5.left = node3;
    node5.right = node4;
    console.assert(solution(node5));
}