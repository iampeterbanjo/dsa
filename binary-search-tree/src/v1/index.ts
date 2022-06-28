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
    // default is root but its re-assigned during insertion
    this.parent = this;
    // not ideal, but needs to be an index value
    this.position = "left";
  }

  private getSide(value: number) {
    return this.value > value ? "left" : "right";
  }

  find(value: number): BinarySearchTree | null {
    if (this.value === value) {
      return this;
    }

    const side = this.getSide(value);
    if (this[side] === null) {
      return null;
    }
    // object is possibly null. how??!!
    // @ts-ignore
    return this[side].find(value);
  }

  // find replacement node
  // if no right or left return null
  // when no right child return this.left
  // else find smallest node in right subtree
  getSuccessor(): BinarySearchTree | null {
    if (this.right === null && this.left === null) {
      return null;
    }
    if (this.right === null) {
      return this.left;
    }
    return this.right.getSmallest();
  }

  // search subtree for smallest value
  getSmallest(): BinarySearchTree {
    if (this.left === null) {
      return this;
    }
    return this.left.getSmallest();
  }

  replace(node: BinarySearchTree): BinarySearchTree {
    this.value = node.value;
    node.parent[node.position] = node.getSuccessor();
    node.left = this.left;
    node.right = this.right;

    return this;
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
    if (node === null) {
      return false;
    }
    return true;
  }

  remove(value: number): BinarySearchTree {
    const node = this.find(value);
    if (node === null) {
      return this;
    }

    const successor = node.getSuccessor();
    node.parent[node.position] = successor;
    if (successor !== null) {
      node.replace(successor);
    }

    return this;
  }
}
