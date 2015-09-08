describe("Simple Binary Tree", function() {

    it("should allow access to contents", function () {
        var tree = createBinaryTree();
        var rootNode = tree.rootNode();
        rootNode.value(1);
        rootNode.leftValue({name: 'Ted'});
        rootNode.rightValue(2);

        expect(tree.rootNode().value()).toBe(1);
        expect(tree.rootNode().leftValue().name).toBe('Ted');
        expect(tree.rootNode().rightValue()).toBe(2);

        expect(tree.rootNode().leftChild().value().name).toBe('Ted');
        expect(tree.rootNode().rightChild().value()).toBe(2);
    });

    it("should allow efficient asymmetric growth", function () {
        var tree = createBinaryTree();
        var rootNode = tree.rootNode();

        expect(tree.rootNode().value()).toBe(null);
        expect(tree.rootNode().leftValue()).toBe(null);
        expect(tree.rootNode().leftChild()).toBe(null);

        rootNode.value(1);
        rootNode.leftValue(2);
        rootNode.leftChild().leftValue(3);

        expect(tree.rootNode().value()).toBe(1);
        expect(tree.rootNode().leftValue()).toBe(2);
        expect(tree.rootNode().leftChild().leftValue()).toBe(3);
        expect(tree.rootNode().rightChild()).toBe(null);
    });

});

describe("Preorder traversal of a Binary Tree", function() {

    it("should traverse left children first", function () {
        var tree = createBinaryTree();
        var rootNode = tree.rootNode();
        rootNode.value('D');
        rootNode.leftValue('B');
        rootNode.rightValue('E');

        var bNode = rootNode.leftChild();
        bNode.leftValue('A');
        bNode.rightValue('C');

        var values = [];
        function visitorCallback(value) {
            values.push(value);
        }

        tree.preorderTraversal(visitorCallback);
        var list = values.join(',');
        expect(list).toBe('D,B,A,C,E');

    });

});

describe("Inorder traversal of a Binary Tree", function() {

    it("should traverse in sort order", function () {
        var tree = createBinaryTree();
        var rootNode = tree.rootNode();
        rootNode.value('D');
        rootNode.leftValue('B');
        rootNode.rightValue('E');

        var bNode = rootNode.leftChild();
        bNode.leftValue('A');
        bNode.rightValue('C');

        var values = [];
        function visitorCallback(value) {
            values.push(value);
        }

        tree.inorderTraversal(visitorCallback);
        var list = values.join(',');
        expect(list).toBe('A,B,C,D,E');

    });

});