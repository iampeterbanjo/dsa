export class BinarySearchTree {
  left: BinarySearchTree | null;
  right: BinarySearchTree | null;
  parent: BinarySearchTree | null;
  value: number;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  insert(value: number): BinarySearchTree {
    const side = this.value > value ? "left" : "right";

    if (this[side] === null) {
      const node = new BinarySearchTree(value);
      node.parent = this;
      this[side] = node;
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

  remove(value: number): BinarySearchTree {
    return new BinarySearchTree(value);
  }

  getBottomLeft(): BinarySearchTree | null {
    if (this.left === null) {
      return this;
    }
    return this.left.getBottomLeft();
  }
}
