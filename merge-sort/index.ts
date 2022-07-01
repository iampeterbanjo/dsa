/**
 * Given an array of random integers
 * Use merge sort to return an array of sorted integers
 */
const mergeSort = (array: number[]): number[] => {
  // create auxilliary array to hold unsorted items
  const aux = array.slice();

  // split array into smaller halves
  // until only one integer remains...
  const sorter = (low: number, high: number) => {
    if (high <= low) {
      return;
    }

    const mid = Math.floor((low + high) / 2);

    sorter(low, mid);
    sorter(mid + 1, high);
    merge(low, mid, high);
  };

  // writes copy array values into target array
  const copyInto = (
    target: number[],
    copy: number[],
    start: number,
    end: number
  ) => {
    for (let i = start; i <= end; i++) {
      target[i] = copy[i];
    }
  };

  // compare two array of integers
  // and merge in sorted order
  const merge = (low: number, mid: number, high: number) => {
    // copy sorted arrays into auxillary
    copyInto(aux, array, low, high);

    let left = low;
    let right = mid + 1;

    // given two subarrays (left, right) of array
    /**
     * [[0,     1,     2,]    [3,      4,      5   ]] // indices
     *   ^             ^       ^               ^
     *  left/low       mid     right           high
     */
    // compare their top items
    for (let i = low; i <= high; i++) {
      if (left > mid) {
        // left subarray is empty so use all right value
        array[i] = aux[right];
        right++;
        continue;
      }

      if (right > high) {
        // right subarray is empty so use all left values
        array[i] = aux[left];
        left++;
        continue;
      }

      // take right-side
      if (aux[right] < aux[left]) {
        array[i] = aux[right];
        right++;
        continue;
      }

      // take left-side
      array[i] = aux[left];
      left++;
    }
  };

  sorter(0, array.length - 1);

  return array;
};

console.log(mergeSort([4, 200, 3, 7, 199, 18]));
