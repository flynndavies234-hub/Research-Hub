const test=require('node:test');
const assert=require('node:assert/strict');
const {searchAll}=require('../src/data/search');

test('search finds results across different modules',()=>{
 const data={missions:[{id:'m1',name:'Japan trip',outcome:'Visit Tokyo'}],notes:[{title:'PC parts',body:'RTX graphics card'}],goals:[{name:'Learn guitar'}],watch:[{ticker:'NVDA',name:'NVIDIA'}]};
 assert.equal(searchAll(data,'Japan')[0].type,'Mission');
 assert.equal(searchAll(data,'RTX')[0].type,'Note');
 assert.equal(searchAll(data,'guitar')[0].type,'Goal');
 assert.equal(searchAll(data,'NVIDIA')[0].view,'watchlist');
});

test('title prefix ranks above body-only match',()=>{
 const data={notes:[{title:'Other',body:'Japan notes'},{title:'Japan packing',body:''}]};
 const r=searchAll(data,'japan');
 assert.equal(r[0].title,'Japan packing');
});

test('search result count is limited',()=>{
 const data={notes:Array.from({length:50},(_,i)=>({title:'test '+i,body:'test'}))};
 assert.equal(searchAll(data,'test',10).length,10);
});

test('blank search returns no results',()=>assert.deepEqual(searchAll({notes:[{title:'x'}]},'   '),[]));
