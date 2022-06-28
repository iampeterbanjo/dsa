/**
 * A Trie is a data structure used to make efficient string
 * algorithms. Each node represents a character, and the
 * subtree contains words prefixed with a parent's character
 */
 class Trie {
    value: string;
    wordCount: number;
    children: Map<string, Trie>;
  
    // create a new node with value of string
    // keep track of words in subtree
    constructor(value: string) {
      this.value = value;
      this.wordCount = 0;
      this.children = new Map();
    }
  
    // insert new node into Trie
    insert(word: string, index = 0): Trie { // donut, 0
      if (index >= word.length) return this;
  
      // increment word count
      this.wordCount++;
  
      const value = word.charAt(index);
      // save only unique characters
      if (this.children.has(value)) {
        this.children.get(value)!.insert(word, index + 1);
        return this;
      }
      // else create a new node
      this.children.set(value, new Trie(value));
      this.children.get(value)!.insert(word, index + 1);
      return this;
    }
  
    // trie: [donuts, double], prefix: do -> 2, don -> 1
    // return how many possible words, given a prefix
    findCount(prefix: string, index = 0): number {
      if (index >= prefix.length) {
        return this.wordCount;
      }
  
      const value = prefix.charAt(index);
      if (this.children.has(value)) {
        return this.children.get(value)!.findCount(prefix, index + 1);
      }
  
      // we didn't find word subtree
      return 0;
    }
  }
  
  const root = new Trie('$');
  
  root.insert('double').insert('donut').insert('chair');
  
  console.log(root.findCount('c'));