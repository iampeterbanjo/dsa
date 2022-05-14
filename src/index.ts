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
}
