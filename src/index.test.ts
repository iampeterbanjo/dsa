import test from 'ava';
import { BinarySearchTree as BST } from './index';

test('fn() returns foo', t => {
  const bst = new BST();

	t.is(bst.left, null);
	t.is(bst.right, null);
});
