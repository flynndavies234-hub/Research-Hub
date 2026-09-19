const test=require('node:test');
const assert=require('node:assert/strict');
const {partsCost,budgetRemaining,partCount}=require('../src/data/tech');

test('tech build totals parts with quantity',()=>{
 const build={budget:1500,parts:[{qty:1,unitPrice:600},{qty:2,unitPrice:80},{qty:1,unitPrice:120}]};
 assert.equal(partsCost(build),880);
 assert.equal(budgetRemaining(build),620);
 assert.equal(partCount(build),4);
});

test('over-budget build returns negative remaining amount',()=>{
 assert.equal(budgetRemaining({budget:100,parts:[{qty:1,unitPrice:140}]}),-40);
});

test('invalid negative part values cannot reduce cost',()=>{
 assert.equal(partsCost({parts:[{qty:-2,unitPrice:100},{qty:1,unitPrice:-5}]}),0);
});
