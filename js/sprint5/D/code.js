if (process.env.REMOTE_JUDGE !== 'true') {
    class CNode {
        constructor(value, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
}

// https://contest.yandex.ru/contest/24809/run-report/142430509/
function solution(root1, root2) {
    // Your code

    function isEqual(node1, node2) {
        if (node1 === null && node2 === null) {
            return true
        }

        if (node1 === null || node2 === null) {
            return false
        }

        return node1.value === node2.value && isEqual(node1.left, node2.left) && isEqual(node1.right, node2.right)
    }


    return isEqual(root1, root2)
    // “ヽ(´▽｀)ノ”
}

function test() {
    var node1 = new CNode(1,  null,  null);
    var node2 = new CNode(2,  null,  null);
    var node3 = new CNode(3,  node1,  node2);

    var node4 = new CNode(1,  null,  null);
    var node5 = new CNode(2,  null,  null);
    var node6 = new CNode(3,  node4,  node5);
    
    console.assert(solution(node3, node6));
}