# Min heap

## Basics

A min-heap is an Abstract Data type which follows three rules:

1. It is a complete binary tree - left-side is filled before right-side.
2. A parent has a smaller value than any of it's children
3. There is no relationship between nodes on the same level

Although a Min-heaps are Binary Trees, for performance reasons, they are implemented with arrays where the indices are -

- 0th index = null (to make the Math easier)
- left-child = 2\*index
- right-child = 2\*index + 1
- parent = Math.floor(index/2)

For example, this is a min heap:

```
array:    [null, 1,  5,  3,  7,  9,  8]
indices:  [ 0,   1,  2,  3,  4,  5,  6]
binary tree:
            1
        /       \
       5         3
     /   \     /
    7     9   6
```

## Operations

### Insert

- Add the new value to the next available slot - bottom, left-most null node.
- Bubble-up the node to its correct position in the heap

### Delete

- Only the root node can be deleted
- When deleted, replace with the bottom, left-most node
- Bubble-down the root node to its correct position in the heap

### Peek

- Get the root node e.g. smallest value

## Performance

Since a Min heap is a complete binary tree, it's height is guaranteed to be O(log(N)) and operate at O(log(N)) for insert and delete.
