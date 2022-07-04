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
  parentIndex(index: number) {
    return Math.floor(index / 2);
  }

  // get item at
  parent(index: number) {
    return this.heap[this.parentIndex(index)];
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
  leftChild(index: number) {
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
    const insertAt = (index: number) => {
      const heapIndex = index + 1;
      this.heap[heapIndex] = array[index];
    };

    for (let index = 0; index < array.length; index++) {
      // adding the root is a special case
      if (index === 0) {
        insertAt(index);
        continue;
      }

      insertAt(index);
      this.siftUp();
    }
  }

  // swap items in heap
  swap(src: number, target: number) {
    [this.heap[target], this.heap[src]] = [this.heap[src], this.heap[target]];
  }

  // make sure root node's value is in the right position
  siftDown() {
    let index = 1;

    // if there is no left child, there definitely is no right child
    while (this.hasLeftChild(index)) {
      const smallerChildIndex =
        this.leftChild(index) > this.rightChild(index)
          ? this.rightChildIndex(index)
          : this.leftChildIndex(index); // 5

      if (this.heap[smallerChildIndex] > this.heap[index]) {
        // nothing to do
        break;
      }

      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  // rebalance heap starting with the item in the last index
  siftUp() {
    let index = this.lastIndex;

    // keep swapping with bigger parents
    while (this.hasParent(index) && this.heap[index] < this.parent(index)) {
      this.swap(index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }

  // get the first item
  peek() {
    return this.heap[this.firstIndex];
  }

  // remove the root node
  remove() {
    // the successor of the root is the last item in the heap
    this.heap[this.firstIndex] = this.heap[this.lastIndex];
    // only way to resize an array
    this.heap = this.heap.splice(0, this.lastIndex);
    // rebalance
    this.siftDown();
  }

  // add item to heap
  insert(value: number) {
    // add to the end of the array and rebalance
    this.heap.push(value);
    this.siftUp();
  }
}
