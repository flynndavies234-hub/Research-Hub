const test=require('node:test');
const assert=require('node:assert/strict');
const {createFromInbox}=require('../src/data/inbox');

const item={text:'Build a NAS',details:'Need around 8 TB usable storage'};
const now='2026-09-19T20:00:00.000Z';

test('Inbox converts to a note',()=>{
  const x=createFromInbox(item,'Note',now);
  assert.equal(x.collection,'notes');
  assert.equal(x.value.title,'Build a NAS');
  assert.match(x.value.body,/8 TB/);
});

test('Inbox converts to connected data shapes',()=>{
  const expected={Mission:'missions',Project:'projects',Goal:'goals',Trip:'trips',Tech:'techBuilds'};
  for(const [target,collection] of Object.entries(expected)){
    const x=createFromInbox(item,target,now);
    assert.equal(x.collection,collection);
    assert.equal(x.value.date,now);
  }
});

test('Inbox Workspace conversion returns research seed without a collection',()=>{
  const x=createFromInbox(item,'Workspace',now);
  assert.equal(x.collection,null);
  assert.equal(x.value.topic,'Build a NAS');
  assert.match(x.value.goal,/8 TB/);
});

test('Inbox rejects empty items',()=>{
  assert.throws(()=>createFromInbox({},'Note',now),/no content/i);
});
