const test=require('node:test');
const assert=require('node:assert/strict');
const {packingProgress,sortedItinerary,packingRemaining}=require('../src/data/travel');

test('packing progress is based on completed items',()=>{
 const trip={packing:[{done:true},{done:false},{done:true},{done:false}]};
 assert.equal(packingProgress(trip),50);
 assert.equal(packingRemaining(trip),2);
});

test('empty packing list starts at zero',()=>assert.equal(packingProgress({}),0));

test('itinerary is sorted by date',()=>{
 const trip={itinerary:[{text:'Museum',date:'2026-10-03'},{text:'Flight',date:'2026-10-01'},{text:'Walk',date:'2026-10-02'}]};
 assert.deepEqual(sortedItinerary(trip).map(x=>x.text),['Flight','Walk','Museum']);
});
