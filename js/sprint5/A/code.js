if (process.env.REMOTE_JUDGE !== 'true') {
    class CNode {
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
}
// https://contest.yandex.ru/contest/24809/run-report/141949972/

function solution(root) {
    // Your code
    let result = root.value

    if (root.left) {
        result = Math.max(result, solution(root.left))
    }

    if (root.right) {
        result = Math.max(result, solution(root.right))
    }

    return result
    // “ヽ(´▽｀)ノ”
}

function test() {
    var node1 = new CNode(1);
    var node2 = new CNode(-5);
    var node3 = new CNode(3);
    node3.left = node1;
    node3.right = node2;
    var node4 = new CNode(2);
    node4.left = node3;
    console.assert(solution(node4) === 3);
}