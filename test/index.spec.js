var proxyquire = require('proxyquireify')(require);

var findSubtrees = proxyquire('../index.js', { });


describe('findSubtrees function test', function() {

    it('Should be a function', function() {
        expect(typeof findSubtrees).toBe('function');
    });

    it('Should throw if at least one argument is not passed', function() {
        expect(function() {
            findSubtrees();
        }).toThrow();
    });

    it('Should not to throw if one argument is passed', function() {
        expect(function() {
            findSubtrees({ });
        }).not.toThrow();
    });

    it('Should return a function', function() {
        expect(typeof findSubtrees({ })).toBe('function');
    });
});


describe('findSubtrees finding test', function() {
    function _createTree(parentKey) {
        var tree = { };

        tree.root = { name: 'root' };

        tree.node_1 = { name: 'node_1' };
        tree.node_1[parentKey] = tree.root;
        
        tree.node_1_1 = { name: 'node_1_1' };
        tree.node_1_1[parentKey] = tree.node_1;
        
        tree.node_1_2 = { name: 'node_1_2' };
        tree.node_1_2[parentKey] = tree.node_1;
        
        tree.node_1_3 = { name: 'node_1_3' };
        tree.node_1_3[parentKey] = tree.node_1;

        
        tree.node_2 = { name: 'node_2' };
        tree.node_2[parentKey] = tree.root;

        
        tree.node_3 = { name: 'node_3' };
        tree.node_3[parentKey] = tree.root;

        
        tree.node_4 = { name: 'node_4' };
        tree.node_4[parentKey] = tree.root;
        
        tree.node_4_1 = { name: 'node_4_1' };
        tree.node_4_1[parentKey] = tree.node_4;
        
        tree.node_4_2 = { name: 'node_4_2' };
        tree.node_4_2[parentKey] = tree.node_4;
        
        tree.node_4_2_1 = { name: 'node_4_2_1' };
        tree.node_4_2_1[parentKey] = tree.node_4_2;
        
        tree.node_4_2_2 = { name: 'node_4_2_2' };
        tree.node_4_2_2[parentKey] = tree.node_4_2;
        
        tree.node_4_3 = { name: 'node_4_3' };
        tree.node_4_3[parentKey] = tree.node_4;

        
        tree.node_5 = { name: 'node_5' };
        tree.node_5[parentKey] = tree.root;

        return tree;
    }

    var parentKey = 'parent';
    var find;
    var tree;


    beforeEach(function() {
        tree = _createTree(parentKey);
        find = findSubtrees(tree.root, parentKey);
    });

    afterEach(function() {
        find = null;
        tree = null;
    });


    it('Should return nodes on high levels', function() {
        var input = [ tree.node_1_1, tree.node_1, tree.node_4_2_1, tree.node_4 ];
        var output = find(input);

        expect(output.indexOf(tree.node_1)).not.toBe(-1);
        expect(output.indexOf(tree.node_4)).not.toBe(-1);
    });

    it('Should not return nodes if their ancestors are passed', function() {
        var input = [ tree.node_1_1, tree.node_1, tree.node_4_2_1, tree.node_4 ];
        var output = find(input);

        expect(output.indexOf(tree.node_1_1)).toBe(-1);
        expect(output.indexOf(tree.node_4_2_1)).toBe(-1);
    });

    it('Should return nodes if their ancestors are not passed', function() {
        var input = [ tree.node_1_1, tree.node_2, tree.node_4_2_1, tree.node_3 ];
        var output = find(input);

        expect(output.indexOf(tree.node_1_1)).not.toBe(-1);
        expect(output.indexOf(tree.node_4_2_1)).not.toBe(-1);
    });

    it('Should return node on the highest possible level from all nodes belonging to given branch', function() {
        var input = [ tree.node_4_2_1, tree.node_4_2_2, tree.node_4_2, tree.node_4, tree.node_1_3, tree.node_1, tree.node_2 ];
        var output = find(input);

        expect(output).toEqual([ tree.node_4, tree.node_1, tree.node_2 ]);
    });

    it('Should return collection same with input if only leafs are passed', function() {
        var input = [ tree.node_1_1, tree.node_1_2, tree.node_1_3, tree.node_2, tree.node_3, tree.node_4_1, tree.node_4_2_1, tree.node_4_2_2, tree.node_4_3, tree.node_5 ];
        var output = find(input);

        expect(output).toEqual(input);
        expect(output).not.toBe(input);
    });

    it('Should return root if it is in input collection', function() {
        var input = [ tree.root, tree.node_1_1, tree.node_1_2, tree.node_1_3, tree.node_2, tree.node_3, tree.node_4_1, tree.node_4_2_1, tree.node_4_2_2, tree.node_4_3, tree.node_5 ];
        var output = find(input);

        expect(output).toEqual([ tree.root ]);
    });

    it('Should returns the same output for the same tree but with different parentKey', function() {
        function _replaceParentKey(node, newParentKey) {
            return JSON.parse(JSON.stringify(node).replace(/"[^"]+"\:(?={)/g, '"' + newParentKey + '":'));
        }

        
        var outputs = [ 'parent', 'parentNode', 'p', '^' ].map(function(parentKey) {
            var tree = _createTree(parentKey);
            var find = findSubtrees(tree.root, parentKey);

            return find([ tree.node_1, tree.node_1_2, tree.node_1_3, tree.node_2, tree.node_4, tree.node_4_2_1 ]);
        });

        outputs.every(function(output1) {
            outputs.every(function(output2) {
                if(output1 !== output2) {
                    expect(_replaceParentKey(a, 'parentKey')).toEqual(_replaceParentKey(b, 'parentKey'));
                }
            });
        });
    });

});