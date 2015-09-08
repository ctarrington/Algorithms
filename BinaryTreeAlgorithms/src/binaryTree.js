function createBinaryTree()
{
    var rootNode = createNode();

    function createNode()
    {
        var value = null;
        var leftChild = null;
        var rightChild = null;

        function getOrSetValue(arg) {
            if (arguments.length === 1) {
                value = arg;
            }

            return value;
        }

        function getOrSetLeftValue(arg) {
            if (arguments.length === 1) {
                if (leftChild == null) { leftChild = createNode(); }
                leftChild.value(arg);
            }

            return (leftChild != null) ? leftChild.value() : null;
        }

        function getOrSetRightValue(arg) {
            if (arguments.length === 1) {
                if (rightChild == null) { rightChild = createNode(); }
                rightChild.value(arg);
            }

            return (rightChild != null) ? rightChild.value() : null;
        }

        function getLeftChild() { return leftChild; }
        function getRightChild() { return rightChild; }

        function preorderTraversal(cb)
        {
            cb(value);

            if (leftChild != null) { leftChild.preorderTraversal(cb); }
            if (rightChild != null) { rightChild.preorderTraversal(cb); }
        }

        function inorderTraversal(cb)
        {
            if (leftChild != null) { leftChild.inorderTraversal(cb); }
            cb(value);
            if (rightChild != null) { rightChild.inorderTraversal(cb); }
        }

        return {
            value: getOrSetValue,
            leftValue: getOrSetLeftValue,
            rightValue: getOrSetRightValue,
            leftChild: getLeftChild,
            rightChild: getRightChild,
            preorderTraversal: preorderTraversal,
            inorderTraversal: inorderTraversal
        };
    }

    function getRootNode() { return rootNode; }

    function preorderTraversal(cb) { rootNode.preorderTraversal(cb); }
    function inorderTraversal(cb) { rootNode.inorderTraversal(cb); }


    // exposed object
    return {
        rootNode: getRootNode,
        preorderTraversal: preorderTraversal,
        inorderTraversal: inorderTraversal
    };

}