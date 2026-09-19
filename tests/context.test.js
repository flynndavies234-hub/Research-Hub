const test=require('node:test');
const assert=require('node:assert/strict');
const {buildContext,serializeContext}=require('../src/data/context');

test('context includes selected mission tasks but stays compact',()=>{
 const data={missions:[{name:'Japan',outcome:'Plan trip',status:'Active',tasks:[{text:'Book flight',done:false}]}],notes:[{title:'Secret note',body:'LONG PRIVATE BODY'}]};
 const ctx=buildContext(data,'missions',0);
 assert.equal(ctx.selectedMission.name,'Japan');
 assert.equal(ctx.selectedMission.tasks[0].text,'Book flight');
 assert.equal(JSON.stringify(ctx).includes('LONG PRIVATE BODY'),false);
});

test('notes context includes metadata but not note bodies',()=>{
 const ctx=buildContext({notes:[{title:'PC ideas',tags:['tech'],body:'full note contents'}]},'notes');
 assert.deepEqual(ctx.notes[0].tags,['tech']);
 assert.equal(JSON.stringify(ctx).includes('full note contents'),false);
});

test('portfolio context is limited and descriptive',()=>{
 const holdings=Array.from({length:20},(_,i)=>({ticker:'T'+i,shares:i+1,avg:10,current:11}));
 const ctx=buildContext({holdings},'portfolio');
 assert.equal(ctx.portfolio.length,12);
 assert.equal(ctx.portfolio[0].ticker,'T0');
});

test('serialized context is capped',()=>{
 const data={missions:Array.from({length:100},(_,i)=>({name:'x'.repeat(500)+i,tasks:[]}))};
 assert.ok(serializeContext(data,'missions',-1).length<=12000);
});
