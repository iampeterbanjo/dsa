
export class MinHeap {
  heap: number[];

  // create a min heap
  constructor(array: number[]) {
    this.buildHeap(array);
  }

  // get parent
  parentIndex(index: number) { // 3
    return Math.floor(index / 2); // 1
  }

  // get the left child
  leftChildIndex(index: number) {
    return 2 * index;
  }

  // get right child
  rightChildIndex(index: number) {
    return (2 * index) + 1;
  }

  // given an array of random integers
  // create a min heap
  buildHeap(array: number[]) {
    // skip 0th position to simplify calculations
    this.heap = [-Infinity];

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


  siftDown() {
    // Write your code here.
  }

  // assuming we're sifting-up the last inserted item
  // we know it shoud be in the bottom, left position
  siftUp() {
    // [-, 1, 2, 0, ...]
    // [0, 1, 2, 3]
    let index = this.heap.length - 1; // 3

    // heap[3] < heap[1] : 0 < 1: true
    while (this.heap[index] < this.heap[this.parentIndex(index)]) {
      this.swap(index, this.parentIndex(index)); // heap, 3, 1
      index = this.parentIndex(index); // 1
    }
  }

  peek() {
    // Write your code here.
    return -1;
  }

  remove() {
    // Write your code here.
    return -1;
  }

  insert(value: number) {
    // Write your code here.
  }
}
