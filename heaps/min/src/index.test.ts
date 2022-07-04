import assert from 'assert';
import { MinHeap } from './index';

const expectArrayContaining = (array: any[], correct: any[]) => {
  try {
    for (let i = 0; i < correct.length; i++) {
      const result = array[i + 1];
      const expected = correct[i];
      assert(result === expected, `received ${result} but expected ${expected} at ${i}`);
    }
  } catch (error) {
    console.error(error);
    console.log(array);
  }
}

/**
 * Given an array of random integers
 * Then build a min heap
 */
const testBuiltHeapIsCorrect = (array: number[], correct: number[]) => {
  const { heap } = new MinHeap(array);

  expectArrayContaining(heap, correct);
}


testBuiltHeapIsCorrect([1,2,3], [1,2,3]);
testBuiltHeapIsCorrect([1, 2, 0], [0, 2, 1]);
testBuiltHeapIsCorrect([7, 8, 0, 2, 6, 8, 24], [0, 2, 7, 8, 6, 8, 24]);

/**
 * Given an array of random integers
 * And a correctly built heap
 * When the root node is deleted
 * Then the resulting heap is correct
 */
const testDeleteRootIsCorrect = (array: number[], correct: number[]) => {
  const minHeap = new MinHeap(array);

  minHeap.remove();

  expectArrayContaining(minHeap.heap, correct);
}

testDeleteRootIsCorrect([7, 8, 0, 2, 6, 8, 24], [2, 6, 7, 8, 24, 8])

