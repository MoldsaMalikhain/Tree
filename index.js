var Queue = require('queuejs');

class Node {
    constructor(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
    }
}

class Tree {
    constructor(data) {
        let node = new Node(data);
        this.root = node;
    }

    travelHeight(callback) {
        (recurse = (currentNode) => {
            for (let floor = 0; floor < currentNode.children.length; floor++) {
                recurse(currentNode.children[floor])
            }
            callback(currentNode);
        })(this.root);
    }
    travelWidth(callback) {
        let queue = new Queue();
        queue.enq(this.root);
        currentTree = queue.deq();
        while (currentTree) {
            for (let width = 0; width < currentTree.children.length; width++) {
                queue.enq(currentTree.children[width])
            }
            callback(currentTree);
            currentTree = queue.deq();
        }
    }
    containers(callback, tr) {
        tr.call(this, callback);
    }
    add(data, toData, tr) {
        let child = new Node(data),
            parent = null,
            callback = (node) => {
                if (node.data === toData) {
                    parent = node
                }
            };
        this.containers(callback, tr);
        if (!parent) {
            throw new Error('Non-existing parent');
        }
        parent.children.push(child);
        child.parent = parent;

    }
    remove(data, fromData, tr) {

    }
}
