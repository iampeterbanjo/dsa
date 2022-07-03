import assert from 'assert';
import { MinHeap } from './index';
/**
 * Given an array of random integers
 * Then build a min heap
 */
const checkBuiltHeapIsCorrect = (array: number[], correct: number[]) => {
  const { heap } = new MinHeap(array);

  try {
    for (let i = 0; i < correct.length; i++) {
      const result = heap[i + 1];
      const expected = correct[i];
      assert(result === expected, `received ${result} but expected ${expected} at ${i}`);
    }
  } catch (error) {
    console.error(error);
    console.log(heap);
  }
}


checkBuiltHeapIsCorrect([1,2,3], [1,2,3]);
checkBuiltHeapIsCorrect([1, 2, 0], [0, 2, 1]);
checkBuiltHeapIsCorrect([7, 8, 0, 2, 6, 8, 24], [0, 2, 7, 8, 6, 8, 24]);

