
export class MinHeap {
  heap: number[];

  // create a min heap
  constructor(array: number[]) {
    // skip 0th position to simplify calculations
    this.heap = [-Infinity];
    this.buildHeap(array);
  }

  // get first index position
  get firstIndex() {
    return 1;
  }

  // last index position
  get lastIndex() {
    return this.heap.length - 1;
  }

  // get item at index
  item(index: number) {
    return this.heap[index];
  }

  // get parent
  parentIndex(index: number) { // 3
    return Math.floor(index / 2); // 1
  }

  // get item at
  parent(index: number) {
    return this.heap[this.parentIndex(index)]
  }

  // get the left child
  leftChildIndex(index: number) {
    return 2 * index;
  }

  // get right child
  rightChildIndex(index: number) {
    return this.leftChildIndex(index) + 1;
  }

  // get left child
  leftChild(index: number)  {
    return this.heap[this.leftChildIndex(index)];
  }

  // get right child
  rightChild(index: number) {
    return this.heap[this.rightChildIndex(index)];
  }

  // check parent exists
  hasParent(index: number) {
    return this.parentIndex(index) > 0;
  }

  // check left child exists
  hasLeftChild(index: number) {
    return this.leftChildIndex(index) < this.lastIndex;
  }

  // check right child exists
  hasRightChild(index: number) {
    return this.rightChildIndex(index) < this.lastIndex;
  }

  // given an array of random integers
  // create a min heap
  buildHeap(array: number[]) {
    // builder helper for insertion
    const insertAt = (index: number) => { // 2
      const heapIndex = index + 1; // 3
      this.heap[heapIndex] = array[index]; // [-Inf, 1, 2, 0]
    }

    // for each item in array [1,2,0]
    for (let index = 0; index < array.length; index++) { // 0, 2 < 3
      // adding the root is a special case
      if (index === 0) { // skip
        insertAt(index);
        continue;
      }

      insertAt(index) // 2
      this.siftUp();
    }
  }

  // swap items in heap
  swap(src: number, target: number) { // heap: [-, 1, 2, 0], 3, 1
    // 1, 0 = 0, 1 => [-, 0, 1, 2]
    [this.heap[target], this.heap[src]] = [this.heap[src], this.heap[target]];
  }

  // make sure root node's value is in the right position
  siftDown() {
    let index = 1;

    // [ -Infinity, 24, 2, 7, 8, 6, 8 ]
    // [ -Infinity, 2, 6, 7, 8, 24, 8 ]
    // if there is no left child, there definitely is no right child
    while (this.hasLeftChild(index)) { // 2 -> 4
      const smallerChildIndex = this.leftChild(index) > this.rightChild(index) ? this.rightChildIndex(index) : this.leftChildIndex(index); // 5

      if (this.heap[smallerChildIndex] > this.heap[index]) { // 6 > 24
        // nothing to do
        break;
      }

      this.swap(index, smallerChildIndex); // 2, 5
      index = smallerChildIndex; // 5
    }
  }

  // assuming we're sifting-up the last inserted item
  // we know it shoud be in the bottom, left position
  siftUp() {
    // [-, 1, 2, 0, ...]
    // [0, 1, 2, 3]
    let index = this.lastIndex; // 3

    // heap[3] < heap[1] : 0 < 1: true
    while (this.hasParent(index) && this.heap[index] < this.parent(index)) {
      this.swap(index, this.parentIndex(index)); // heap, 3, 1
      index = this.parentIndex(index); // 1
    }
  }

  peek() {
    // Write your code here.
    return -1;
  }

  // remove the root node
  remove() {
    // place successor at root
    this.heap[this.firstIndex] = this.heap[this.lastIndex] // [ -Infinity, 24, 2, 7, 8, 6, 8, 24 ]
    this.heap = this.heap.splice(0, this.lastIndex); // [ -Infinity, 24, 2, 7, 8, 6, 8 ]
    this.siftDown();
  }

  // add item to heap and rebalance
  insert(value: number) {
    this.heap[this.lastIndex + 1] = value;
    this.siftUp();
  }
}


