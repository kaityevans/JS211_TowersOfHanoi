'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// let startStack = stacks.a
// let endStack = stacks.b

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}
printStacks()
// console.log(printStacks())
// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
// Move piece to stacks a b or c
  // remove a piece from a stack
  console.log(stacks.a, stacks.b)
  let removedPiece = stacks[startStack].pop() 
  // place on a new stack
  stacks[endStack].push(removedPiece)
  // Attach removedPiece to new stack
  console.log("end of movePiece", startStack, endStack)
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  let firstArray = stacks[startStack]
  let indexOfLastItem = firstArray.length - 1
  let secondArray = stacks[endStack]
  let indexOfLastItem2 = secondArray.length - 1
  if(stacks[startStack].length == 0) {
    console.log("Cannot play from an empty stack")
    return false
  }
  if (secondArray[indexOfLastItem2] == undefined || firstArray[indexOfLastItem] < secondArray[indexOfLastItem2]) {
    return true
  }
  else {
    console.log("not a legal move")
    return false
  }
// Create function that allows piece 2 to be allowed onto pieces 3 or 4 but not 1
// Create function that allows piece 3 to be allowed onto piece 4 but not 1 or 2
// Create function that does not allow piece 4 to be placed onto any other piece
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = (startStack, endStack) => {
  // Your code here
  if(stacks.b.length == 4 || stacks.c.length == 4) {
    console.log("You Win!")
    return true
  }
  else {
    console.log("Keep Trying!")
    return false
  }
// Function should check and validate that all four pieces have moved to a new column and that they are in the order 4, 3, 2, 1

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // console.log("IN Towers of Hanoi", startStack, endStack)
  // Your code here
  isLegal(startStack, endStack)
  console.log(startStack, endStack)
  movePiece(startStack, endStack)
  checkForWin(startStack, endStack)
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
