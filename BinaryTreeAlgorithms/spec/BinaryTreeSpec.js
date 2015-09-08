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