export class BinarySearchTree {
  left: BinarySearchTree | null;
  right: BinarySearchTree | null;
  value: number;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value: number): BinarySearchTree {
    const side = this.value > value ? "left" : "right";

    if (this[side] === null) {
      this[side] = new BinarySearchTree(value);
    } else {
      // @ts-ignore
      this[side].insert(value);
    }
    return this;
  }

  contains(value: number): boolean {
    if (this.value === value) {
      return true;
    }

    const side = this.value > value ? "left" : "right";
    if (this[side] === null) {
      return false;
    }
    // @ts-ignore
    return this[side].contains(value);
  }
}
