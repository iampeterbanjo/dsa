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
    if (this.value === value) {
      return true;
    }
    const side = this.getSide(value);
    if (this[side] === null) {
      return false;
    }
    return this[side]!.contains(value);
  }

  // update Node value
  setValue(value: number) {
    this.value = value;
    return this;
  }

  // set child node to null
  nullify(child: BST) {
    const side = this.getSide(child.value);
    this[side] = null;

    return this;
  }

  // delete a node
  remove(value: number): BST {
    const { node: remove, parent } = this.find(value);

    // must be root
    if (!parent) {
      throw "Cannot remove root";
    }

    // if removed node's right subtree is empty
    // replace with left subtree
    if (remove.right === null && remove.left) {
      remove.right = remove.left;
      return this;
    }

    // no children
    if (remove.right === null && remove.left === null) {
      parent.nullify(remove);
      return this;
    }

    // else replace with leftmost node in right subtree
    const { node: min, parent: minParent } = remove.right!.getBottomLeft();
    remove.setValue(min.value);

    minParent?.nullify(min);

    return this;
  }

  // given a value, find a node, including its parent
  find(
    value: number,
    parent: BST | null = null
  ): { node: BST; parent: BST | null } {
    if (this.value === value) {
      return { node: this, parent };
    }

    const next = this.getSide(value);
    if (this[next] === null) {
      throw new Error(`Missing node with value: ${value}`);
    }

    if (this[next]?.value === value) {
      return { node: this, parent };
    }
    return this.find(value, this);
  }

  // find node successor
  getBottomLeft(parent: BST | null = null): { node: BST; parent: BST | null } {
    if (this.left === null) {
      return { node: this, parent };
    }
    return this.left.getBottomLeft(this);
  }
}
