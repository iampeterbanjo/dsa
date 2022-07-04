import assert from "assert";
import { MinHeap } from "./index";

const message = (received: string | number, expected: string | number) =>
  `received ${received} and expected ${expected}`;

const expectArrayContaining = (array: any[], correct: any[]) => {
  try {
    for (let i = 0; i < correct.length; i++) {
      const result = array[i];
      const expected = correct[i];
      assert(result === expected, `${message(result, expected)} at ${i}`);
    }
  } catch (error) {
    console.error(error);
    console.log(array);
  }
};

/**
 * Given a childIndex
 * Then the correct parent index is returned
 */
const testParentIndex = () => {
  const minHeap = new MinHeap([0, 1, 2, 3, 4, 5]);
  [
    { childIndex: 0, parentIndex: -1 },
    { childIndex: 1, parentIndex: 0 },
    { childIndex: 2, parentIndex: 0 },
    { childIndex: 3, parentIndex: 1 },
    { childIndex: 4, parentIndex: 1 },
    { childIndex: 5, parentIndex: 2 },
  ].forEach(({ childIndex, parentIndex }) => {
    const result = minHeap.parentIndex(childIndex);

    assert(result === parentIndex, message(result, parentIndex));
  });
};
testParentIndex();

/**
 * Given an array of random integers
 * Then build a min heap
 */
const testBuiltHeapIsCorrect = (array: number[], correct: number[]) => {
  const { heap } = new MinHeap(array);

  expectArrayContaining(heap, correct);
};

testBuiltHeapIsCorrect([1, 2, 3], [1, 2, 3]);
testBuiltHeapIsCorrect([1, 2, 0], [0, 2, 1]);
testBuiltHeapIsCorrect([7, 8, 0, 2, 6, 8, 24], [0, 2, 7, 8, 6, 8, 24]);

/**
 * Given an array of random integers
 * And a correctly built heap
 * Then peek returns the correct value
 */
const testPeekIsCorrect = (array: number[], correct: number) => {
  const minHeap = new MinHeap(array);

  const result = minHeap.peek();

  assert(result === correct, `received ${result} and expected ${correct}`);
};

testPeekIsCorrect([7, 8, 0, 2, 6, 8, 24], 0);

/**
 * Given an array of random integers
 * And a correctly built heap
 * When the root node is deleted
 * Then the resulting heap is correct
 */
const testRemoveIsCorrect = (
  array: number[],
  correct: number[],
  root: number
) => {
  const minHeap = new MinHeap(array);

  const result = minHeap.remove();

  assert(result === root, `received ${result} expected ${root}`);
  expectArrayContaining(minHeap.heap, correct);
};

testRemoveIsCorrect([7, 8, 0, 2, 6, 8, 24], [2, 6, 7, 8, 24, 8], 0);

/**
 * Given an array of random integers
 * And a correctly built heap
 * When an item is inserted
 * Then the resulting heap is correct
 */
const testInsertItemIsCorrect = (
  array: number[],
  value: number,
  correct: number[]
) => {
  const minHeap = new MinHeap(array);

  minHeap.insert(value);

  expectArrayContaining(minHeap.heap, correct);
};
testInsertItemIsCorrect([2, 6, 7, 8, 24, 8], 0, [0, 6, 2, 8, 24, 8, 7]);
