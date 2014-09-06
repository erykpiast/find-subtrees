module.exports = (function() {

    function findSubtrees(root, parentKey) {
        if(arguments.length < 1) {
            throw new Error('root of the tree must be passed');
        } else if(arguments.length < 2) {
            parentKey = 'parent';
        }

        return function(nodes) {
            if(nodes.indexOf(root) !== -1) {
                return [ root ];
            } else {
                var i, maxi;

                var nodesCopy = [ ];
                for(i = 0, maxi = nodes.length; i < maxi; i++) {
                    nodesCopy[i] = nodes[i];
                }

                var node, parent;
                for(i = 0, maxi = nodesCopy.length; i < maxi; i++) {
                    node = nodesCopy[i];

                    while(node && (node !== root)) {
                        parent = node[parentKey];

                        if(nodesCopy.indexOf(parent) !== -1) {
                            nodesCopy[i] = null;

                            break;
                        } else {
                            node = parent;
                        }
                    }
                }

                for(i = 0; i < nodesCopy.length; i++) {
                    if(!nodesCopy[i]) {
                        nodesCopy.splice(i--, 1);
                    }
                }

                return nodesCopy;
            }
        };
    }


    return findSubtrees;

})();