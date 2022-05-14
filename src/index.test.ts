import test from "ava";
import { BinarySearchTree as BST } from "./index";

test("new BST is initialised correctly", (t) => {
  const value = 10;
  const bst = new BST(value);

  t.is(bst.value, value);
  t.is(bst.left, null);
  t.is(bst.right, null);
});

test("insert a value is correct", (t) => {
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

  // check parents
  t.is(bst.parent, null);
  t.is(bst.left?.parent?.value, 10);
  t.is(bst.right?.parent?.value, 10);
  t.is(bst.left?.left?.parent?.value, 5);
  t.is(bst.left?.right?.parent?.value, 5);
  t.is(bst.left?.left?.left?.parent?.value, 2);
  t.is(bst.right?.right?.parent?.value, 15);
  t.is(bst.right?.left?.parent?.value, 15);
  t.is(bst.right?.left?.left?.parent?.value, 14);
});

test("contains a value is correct", (t) => {
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

test.skip("remove a value is correct", (t) => {
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

  t.is(bst.left?.value, 2);
  t.is(bst.left?.left?.value, 1);
  t.is(bst.left?.right, null);
  t.is(bst.right?.value, 15);
  t.is(bst.right?.left?.value, 14);
  t.is(bst.right?.right?.value, 22);
});

test("getBottomLeft returns correct value", (t) => {
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

  const node = bst.getBottomLeft();
  t.is(node?.value, 1);
  t.is(node?.parent?.value, 2);
});
