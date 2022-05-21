import test from "ava";
import { BinarySearchTree as BST } from "./index";

test("new BST is initialised correctly", (t) => {
  const value = 10;
  const bst = new BST(value);

  t.is(bst.value, value);
  t.is(bst.left, null);
  t.is(bst.right, null);
});

test("insert value(s)", (t) => {
  const value = 10;
  const bst = new BST(value);

  bst.insert(5); // left
  bst.insert(15); // right
  bst.insert(5); // left.right
  bst.insert(2); // left.left
  bst.insert(1); // left.left.left
  bst.insert(22); // right.right
  bst.insert(14); // right.left
  bst.insert(13); // right.left.left

  // check values
  t.is(bst.left?.value, 5);
  t.is(bst.right?.value, 15);
  t.is(bst.left?.left?.value, 2);
  t.is(bst.left?.right?.value, 5);
  t.is(bst.left?.left?.left?.value, 1);
  t.is(bst.right?.right?.value, 22);
  t.is(bst.right?.left?.value, 14);
  t.is(bst.right?.left?.left?.value, 13);

  // check side
  t.is(bst.left?.position, "left");
  t.is(bst.right?.position, "right");
  t.is(bst.left?.left?.position, "left");
  t.is(bst.left?.right?.position, "right");
  t.is(bst.left?.left?.left?.position, "left");
  t.is(bst.right?.right?.position, "right");
  t.is(bst.right?.left?.position, "left");
  t.is(bst.right?.left?.left?.position, "left");

  // check parents
  t.is(bst.parent, bst);
  t.is(bst.left?.parent?.value, 10);
  t.is(bst.right?.parent?.value, 10);
  t.is(bst.left?.left?.parent?.value, 5);
  t.is(bst.left?.right?.parent?.value, 5);
  t.is(bst.left?.left?.left?.parent?.value, 2);
  t.is(bst.right?.right?.parent?.value, 15);
  t.is(bst.right?.left?.parent?.value, 15);
  t.is(bst.right?.left?.left?.parent?.value, 14);
});

test("contains a value", (t) => {
  const value = 10;
  const bst = new BST(value);

  bst.insert(5); // left
  bst.insert(15); // right
  bst.insert(5); // left.right

  t.true(bst.contains(5));
  t.true(bst.contains(15));
  t.false(bst.contains(200));

  bst.insert(2); // left.left
  bst.insert(1); // left.left.left
  bst.insert(22); // right.right
  bst.insert(14); // right.left
  bst.insert(13); // right.left.left

  t.true(bst.contains(2));
  t.true(bst.contains(13));
  t.false(bst.contains(33));
});

test("remove missing node", (t) => {
  const value = 10;
  const bst = new BST(value);
  bst.insert(5); // left
  bst.insert(2); // left.left
  bst.insert(15); // right

  bst.remove(25);

  t.is(bst.left?.value, 5);
  t.is(bst.left?.left?.value, 2);
  t.is(bst.right?.value, 15);
});

test("remove node with no child", (t) => {
  const value = 10;
  const bst = new BST(value);
  bst.insert(5); // left

  bst.remove(5);

  t.is(bst.left, null);
});

test("remove root with left child", (t) => {
  const value = 10;
  const bst = new BST(value);
  bst.insert(5); // left

  bst.remove(10);

  t.is(bst.value, 5);
  t.is(bst.left, null);
});

test("remove root with right child", (t) => {
  const value = 10;
  const bst = new BST(value);
  bst.insert(15); // right

  bst.remove(10);

  t.is(bst.value, 15);
  t.is(bst.right, null);
});

test("remove node with both left and right children and parent", (t) => {
  const value = 10;
  const bst = new BST(value);
  bst.insert(5); // left
  bst.insert(2); // left.left
  bst.insert(6); // left.right

  bst.remove(5);

  t.is(bst.left?.value, 6);
  t.is(bst.left?.left?.value, 2);
  t.is(bst.left?.right, null);
});

test("remove node with subtree", (t) => {
  const value = 10;
  const bst = new BST(value);

  bst.insert(5); // left
  bst.insert(15); // right
  bst.insert(5); // left.right
  bst.insert(2); // left.left
  bst.insert(1); // left.left.left
  bst.insert(22); // right.right
  bst.insert(14); // right.left
  bst.insert(13); // right.left.left

  bst.remove(5);

  t.is(bst.left?.value, 5); // right.smallest
  t.is(bst.right?.value, 15);
  t.is(bst.left?.left?.value, 2);
  t.is(bst.left?.left?.left?.value, 1);
  t.is(bst.left?.right, null);
  t.is(bst.right?.value, 15);
  t.is(bst.right?.left?.value, 14);
  t.is(bst.right?.right?.value, 22);
});

test("remove node with one-sided subtree (right)", (t) => {
  const bst = new BST(1);
  // insert 19 sequential nodes
  for (let index = 2; index <= 20; index++) {
    bst.insert(index);
    t.true(bst.contains(index), `${index} should be in the tree`);
  }

  bst.remove(2);

  t.true(bst.contains(1));
  t.false(bst.contains(2));

  for (let index = 3; index <= 20; index++) {
    t.true(bst.contains(index), `${index} should be in the tree`);
  }
});

test("getSmallest returns correct value when left child exists", (t) => {
  const value = 10;
  const bst = new BST(value);

  bst.insert(5); // left
  bst.insert(15); // right
  bst.insert(5); // left.right
  bst.insert(2); // left.left
  bst.insert(1); // left.left.left
  bst.insert(22); // right.right
  bst.insert(14); // right.left
  bst.insert(13); // right.left.left

  const node = bst.getSmallest();
  t.is(node?.value, 1);
  t.is(node?.parent?.value, 2);
});

test("getSmallest returns correct value when this.right.left child is null", (t) => {
  const value = 10;
  const bst = new BST(value);

  bst.insert(5); // left
  bst.insert(15); // right
  bst.insert(5); // left.right
  bst.insert(2); // left.left
  bst.insert(1); // left.left.left
  bst.insert(22); // right.right
  bst.insert(14); // right.left
  bst.insert(13); // right.left.left

  const node = bst.getSmallest();
  t.is(node?.value, 1);
  t.is(node?.parent?.value, 2);
});

test("getSuccessor returns null if no left or right child", (t) => {
  const value = 10;
  const bst = new BST(value);

  const successor = bst.getSuccessor();

  t.is(successor, null);
});

test("getSuccessor returns left if no right child", (t) => {
  const value = 10;
  const bst = new BST(value);
  bst.insert(5); // left

  const successor = bst.getSuccessor();

  t.is(successor?.value, 5);
});

test("getSuccessor returns right if right has no children", (t) => {
  const value = 10;
  const bst = new BST(value);
  bst.insert(5); // left
  bst.insert(11); // right

  const successor = bst.getSuccessor();

  t.is(successor?.value, 11);
});

test("getSuccessor returns smallest if right has children", (t) => {
  const value = 4;
  const bst = new BST(value);
  bst.insert(3); // left
  bst.insert(6); // right
  bst.insert(5); // right.left
  bst.insert(15); // right.right

  const successor = bst.getSuccessor();

  t.is(successor?.value, 5);
});

test("replace node with left and right children with leaf", (t) => {
  const bst = new BST(4);
  bst.insert(3); // left
  bst.insert(6); // right
  bst.insert(5); // left.right
  bst.insert(7); // right.right

  const node = bst.find(6);
  const leaf = bst.find(7);
  const result = node?.replace(leaf as BST);

  t.is(result?.value, 7);
  t.is(result?.left?.value, 5);
  t.is(result?.right, null);
});

test("replace node with left and right children with child (bypass node)", (t) => {
  const bst = new BST(4);
  bst.insert(3); // left
  bst.insert(6); // right
  bst.insert(7); // right.right
  bst.insert(8); // right.right.right

  const node = bst.find(6);
  const other = bst.find(7);
  const result = node?.replace(other as BST);

  t.is(result?.value, 7);
  t.is(result?.right?.value, 8);
  t.is(bst.find(6), null);
});

test("replace root node with left and right children with child", (t) => {
  const bst = new BST(4);
  bst.insert(3); // left
  bst.insert(6); // right
  bst.insert(7); // right.right
  bst.insert(8); // right.right.right

  const node = bst.find(4);
  const other = bst.find(7);
  const result = node?.replace(other as BST);

  t.is(result?.value, 7);
  t.is(result?.right?.value, 6);
  t.is(result?.left?.value, 3);
  t.is(result?.right?.right?.value, 8);
  t.is(bst.find(4), null);
});
