// https://contest.yandex.ru/contest/24810/run-report/142647630/

/*
 * -- ПРИНЦИП РАБОТЫ --
 * 1. Поиск узла: Рекурсивно спускаемся по дереву, сравнивая ключ с текущим значением узла
 * 2. Три случая удаления:
 *    - Нет левого потомка: возвращаем правый потомок
 *    - Нет правого потомка: возвращаем левый потомок
 *    - Есть оба потомка: находим минимальный узел в правом поддереве, копируем его значение и рекурсивно удаляем его
 *
 * Сложность:
 * - Время: O(h), где h - высота дерева
 * - Память: O(h) для рекурсивных вызовов
 */
if (process.env.REMOTE_JUDGE !== 'true') {
    class Node {
        constructor(value, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
}

function remove(node, key) {
    if (node === null) {
        return null;
    }

    if (key < node.value) {
        node.left = remove(node.left, key);
    } else if (key > node.value) {
        node.right = remove(node.right, key);
    } else {
        if (node.left === null) {
            return node.right;
        } else if (node.right === null) {
            return node.left;
        } else {
            let minNode = findMin(node.right);

            node.value = minNode.value;
            node.right = remove(node.right, minNode.value);
        }
    }

    return node;
}

function findMin(node) {
    let current = node;

    while (current.left !== null) {
        current = current.left;
    }

    return current;
}

function test() {
    var node1 = new Node(2, null, null);
    var node2 = new Node(3, node1, null);
    var node3 = new Node(1, null, node2);
    var node4 = new Node(6, null, null);
    var node5 = new Node(8, node4, null);
    var node6 = new Node(10, node5, null);
    var node7 = new Node(5, node3, node6);
    var newHead = remove(node7, 10);
    console.assert(newHead.value === 5);
    console.assert(newHead.right === node5);
    console.assert(newHead.right.value === 8);
}