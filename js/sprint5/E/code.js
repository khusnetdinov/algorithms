if (process.env.REMOTE_JUDGE !== 'true') {
    class CNode {
        constructor(value, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
}
// https://contest.yandex.ru/contest/24809/run-report/142010795/

function solution(root, min = -Infinity, max = +Infinity) {
    // Your code
    if (root === null) {
        return true
    }

    let valueBiggerThanRight = root.value >= max;
    let valueSmallerThanLeft = root.value <= min;
    if (valueBiggerThanRight || valueSmallerThanLeft) {
        return false
    }

    return solution(root.left, min, root.value) && solution(root.right, root.value, max)
    // “ヽ(´▽｀)ノ”
}

function test() {
    var node1 = new CNode(1, null, null);
    var node2 = new CNode(4, null, null);
    var node3 = new CNode(3, node1, node2);
    var node4 = new CNode(8, null, null);
    var node5 = new CNode(5, node3, node4);
    var node5 = new CNode(5, node3, node4);
    console.assert(solution(node5));
    node4.value = 5;
    console.assert(!solution(node5));
}
