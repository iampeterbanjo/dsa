type Side = "left" | "right";
export class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // get which side is the value exists on BST
  getSide(value: number): Side {
    return value < this.value ? "left" : "right";
  }

  // insert value into BST
  insert(value: number): BST {
    const side = this.getSide(value);
    if (this[side] === null) {
      this[side] = new BST(value);
    } else {
      this[side]!.insert(value);
    }

    return this;
  }

  // search BST for value
  contains(value: number): boolean {
    const { node } = this.find(value);

    return node !== null;
  }

  // handle delete root as special case
  deleteRoot() {
    if (this.left) {
      this.value = this.left.value;
      this.right = this.left.right;
      this.left = this.left.left;
      return this;
    }

    if (this.right) {
      this.value = this.right.value;
      this.left = this.right.left;
      this.right = this.right.right;
      return this;
    }

    // single-node so do nothing
    return this;
  }

  // null or minimum value in right subtree
  replaceWithSuccessor() {
    const { node: successor, parent } = this.right!.getBottomLeft();
    this.value = successor.value;

    // no left subtree
    if (!parent) {
      this.right = null;
      return this;
    }

    parent.left = null;
    return this;
  }

  // delete a node
  remove(value: number): BST {
    const { node: remove, parent } = this.find(value);

    if (!remove) {
      console.error("Node not found: ", value);
      return this;
    }

    // has both children
    if (remove.right && remove.left) {
      remove.replaceWithSuccessor();
      return this;
    }

    // no parent means we are removing the root node
    if (!parent) {
      remove.deleteRoot();
      return this;
    }

    // skip removed node on the same side as parent
    // if removed node's left or right child is null, that's ok
    const side = parent.getSide(remove.value);
    parent[side] = remove.left ? remove.left : remove.right;

    return this;
  }

  // given a value, find a node, including its parent
  find(
    value: number,
    parent: BST | null = null
  ): { node: BST | null; parent: BST | null } {
    if (this.value === value) {
      return { node: this, parent };
    }

    const next = this.getSide(value);
    // it should be here but we cant find it
    if (this[next] === null) {
      return { node: null, parent: null };
    }

    return this[next]!.find(value, this);
  }

  // find node successor
  getBottomLeft(parent: BST | null = null): { node: BST; parent: BST | null } {
    // note: parent is null when there is no left subtree
    if (this.left === null) {
      return { node: this, parent };
    }
    return this.left.getBottomLeft(this);
  }
}
