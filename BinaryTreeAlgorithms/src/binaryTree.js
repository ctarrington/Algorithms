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

        return {
            value: getOrSetValue,
            leftValue: getOrSetLeftValue,
            rightValue: getOrSetRightValue,
            leftChild: getLeftChild,
            rightChild: getRightChild
        };
    }

    function getRootNode() { return rootNode; }




    // exposed object
    return {
        rootNode: getRootNode
    };

}