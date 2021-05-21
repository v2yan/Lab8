// sum.test.js

import { sum } from '../scripts/sum.js';

// test w/o function 

test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
});


// test sum function

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
});
