const Queue = require('queuejs');

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
        let recurse
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
        let currentTree = queue.deq();
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
        let tree = this,
            chaildToRemove = null,
            parent = null,
            index;

        let callback = (node) => {
            if (node.data === fromData) {
                parent = node
            }
        }

        this.containers(callback, tr);

        if (!parent) {
            throw new Error('Parent does not exist');
        }
        if (index === undefined) {
            throw new Error('Node does not exist');
        }
        index = findIndex(parent.children, data)
        chaildToRemove = parent.children.splice(index, 1);

        return chaildToRemove;

    }
}

function findIndex(arr, data) {
    let index;
    for (let element = 0; element < arr.length; element++) {
        if (arr[element].data === data) {
            index = element
        }
    }
    return index;
}

let tree = new Tree('one');

tree.root.children.push(new Node('two'));
tree.root.children[0].parent = tree;
tree.root.children.push(new Node('three'));
tree.root.children[1].parent = tree;
tree.root.children.push(new Node('four'));
tree.root.children[2].parent = tree;
tree.root.children[0].children.push(new Node('five'));
tree.root.children[0].children[0].parent = tree.root.children[0];
tree.root.children[0].children.push(new Node('six'));
tree.root.children[0].children[1].parent = tree.root.children[0];
tree.root.children[2].children.push(new Node('seven'));
tree.root.children[2].children[0].parent = tree.root.children[2];


tree.travelHeight((node) => {
    console.log(node.data);
})

tree.travelWidth((node) => {
    console.log(node.data)
})