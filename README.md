find-subtrees
===============

Util for finding subtrees in set of tree nodes.

### Example ###
For tree
```
    root
      |
      +-- node_1
      |     |
      |     +-- node_1_1
      |     +-- node_1_2
      |     +-- node_1_3
      |
      +-- node_2
      +-- node_3
      +-- node_4
      |     |
      |     +-- node_4_1
      |     +-- node_4_2
      |     |     |
      |     |     +-- node_4_2_1
      |     |     +-- node_4_2_2
      |     |
      |     +-- node_4_3
      |
      +-- node_5

```
function created by calling
```
    findSubtrees(root)
```
called with array
```
    [ node_1_2, node_1_3, node_1, node_4_2_1, node_4_2, node_4_3 , node_4, node_3 ]
```
will return array
```
    [ node_1, node_4, node_3 ]
```


