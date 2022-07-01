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
  const copyInto = (target: number[], copy: number[]) => {
    copy.forEach((i) => {
      target[i] = copy[i];
    });
  };

  // compare two array of integers
  // and merge in sorted order
  const merge = (low: number, mid: number, high: number) => {
    // use auxilliary array as workspace
    copyInto(aux, array.slice(low, high + 1));

    let left = low;
    let right = mid + 1;

    // given two subarrays (left, right) of array
    /**
     * [[0,     1,     2,]    [3,      4,      5   ]] // indices
     *   ^             ^       ^               ^
     *  left/low       mid     right           high
     */
    // compare their top items
    for (let i = low; i < high; i++) {
      if (left > mid) {
        // left subarray is empty so use all right value
        array[i] = aux[right];
        right++;
      } else if (right > high) {
        // right subarray is empty so use all left values
        array[i] = aux[left];
        left++;
      } else if (aux[left] < aux[right]) {
        array[i] = aux[left];
        left++;
      } else {
        array[i] = aux[right];
        right++;
      }
    }
  };

  sorter(0, array.length - 1);

  return array;
};

console.log(mergeSort([4, 2]));
