export class BinarySearchTree {
  left: BinarySearchTree | null;
  right: BinarySearchTree | null;
  parent: BinarySearchTree;
  position: "left" | "right";
  value: number;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    // is root else re-assigned during insertion
    this.parent = this;
    // not ideal, but needs to be an index value
    this.position = "left";
  }

  private getSide(value: number) {
    return this.value > value ? "left" : "right";
  }

  private find(value: number): BinarySearchTree | null {
    if (this.value === value) {
      return this;
    }

    const side = this.value > value ? "left" : "right";
    if (this[side] === null) {
      return null;
    }
    // object is possibly null. how??!!
    // @ts-ignore
    return this[side].find(value);
  }

  // search subtree for smallest value
  getSmallest(): BinarySearchTree {
    if (this.left === null) {
      return this;
    }
    return this.left.getSmallest();
  }

  insert(value: number): BinarySearchTree {
    const side = this.getSide(value);

    if (this[side] === null) {
      const node = new BinarySearchTree(value);
      node.parent = this;
      node.position = side;
      this[side] = node;

      return this;
    }
    // @ts-ignore
    return this[side].insert(value);
  }

  contains(value: number): boolean {
    const node = this.find(value);
    if (node !== null) {
      return true;
    }
    return false;
  }

  remove(value: number): null {
    const node = this.find(value);
    if (node === null) {
      return null;
    }

    // there are both left and right children
    if (node.left !== null && node.right !== null) {
      // we need to find the smallest value
      // on the right subtree
      // and replace it with the current node
      const replacement = node.right.getSmallest();
      node.value = replacement.value;
      replacement.parent[replacement.position] = null;

      return null;
    }

    // no children
    if (node.left === null && node.right === null) {
      node.parent[node.position] = null;
      return null;
    }

    // only one chiled
    const child = node.left || node.right;
    if (child !== null) {
      node.value = child.value;
      node[child.position] = null;
    }

    return null;
  }
}
