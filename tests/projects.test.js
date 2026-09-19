const test=require('node:test');
const assert=require('node:assert/strict');
const {projectProgress,projectComplete,nextTask}=require('../src/data/projects');

test('project task completion controls progress when tasks exist',()=>{
 const p={progress:5,tasks:[{text:'a',done:true},{text:'b',done:false},{text:'c',done:true}]};
 assert.equal(projectProgress(p),67);
 assert.equal(nextTask(p),'b');
 assert.equal(projectComplete(p),false);
});

test('project manual progress is used without tasks',()=>{
 assert.equal(projectProgress({progress:44}),44);
 assert.equal(nextTask({}), '');
});

test('completed task list completes project',()=>{
 assert.equal(projectComplete({tasks:[{done:true},{done:true}]}),true);
 assert.equal(projectProgress({tasks:[{done:true},{done:true}]}),100);
});
