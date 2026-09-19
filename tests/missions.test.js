const test=require('node:test');
const assert=require('node:assert/strict');
const {missionProgress,linkedCounts,missionIsComplete}=require('../src/data/missions');

test('mission progress follows task completion when tasks exist',()=>{
  const m={progress:5,tasks:[{done:true},{done:false},{done:true},{done:false}]};
  assert.equal(missionProgress(m),50);
});

test('mission progress falls back to manual progress with no tasks',()=>{
  assert.equal(missionProgress({progress:72,tasks:[]}),72);
  assert.equal(missionProgress({progress:140}),100);
  assert.equal(missionProgress({progress:-10}),0);
});

test('linkedCounts counts only items belonging to the mission',()=>{
  const data={
    projects:[{missionId:'m1'},{missionId:'m2'}],
    notes:[{missionId:'m1'},{missionId:'m1'}],
    trips:[{missionId:'m1'}],
    goals:[],
    techBuilds:[{missionId:'m2'}]
  };
  assert.deepEqual(linkedCounts('m1',data),{projects:1,notes:2,trips:1,goals:0,tech:0});
});

test('mission complete requires at least one task and all tasks done',()=>{
  assert.equal(missionIsComplete({tasks:[]}),false);
  assert.equal(missionIsComplete({tasks:[{done:true},{done:true}]}),true);
  assert.equal(missionIsComplete({tasks:[{done:true},{done:false}]}),false);
});
