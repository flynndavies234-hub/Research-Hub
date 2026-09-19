const test=require('node:test');
const assert=require('node:assert/strict');
const {normalizeData,ensureDataShape}=require('../src/data/schema');

test('V2.6-style data is preserved while V3 collections are added',()=>{
  const old={
    holdings:[{ticker:'NVDA',shares:2,avg:100}],
    watch:[{ticker:'ASML'}],
    research:[{name:'Old report'}],
    school:[{subject:'Maths'}],
    mistakes:[{subject:'Maths'}],
    schoolStats:{Maths:{attempts:3,correct:2}},
    schoolSubject:'Physics',
    allocations:[{name:'Investing',amount:300}],
    budget:300,
    income:2100,
    transactions:[{type:'buy',ticker:'NVDA'}],
    fxRates:{EUR:{rate:1,updated:123}},
    marketRefreshMode:'5'
  };
  const v3=ensureDataShape(old);
  assert.deepEqual(v3.holdings,old.holdings);
  assert.deepEqual(v3.watch,old.watch);
  assert.deepEqual(v3.research,old.research);
  assert.deepEqual(v3.school,old.school);
  assert.deepEqual(v3.mistakes,old.mistakes);
  assert.deepEqual(v3.schoolStats,old.schoolStats);
  assert.equal(v3.schoolSubject,'Physics');
  assert.equal(v3.budget,300);
  assert.equal(v3.income,2100);
  for(const key of ['workspaceReports','inbox','reminders','activity','assistantMessages','missions','projects','notes','trips','goals','techBuilds']) assert.deepEqual(v3[key],[]);
});

test('V3 collections survive normalization',()=>{
  const source={
    inbox:[{id:'i1',text:'Idea'}],
    reminders:[{id:'r1',title:'Reminder'}],
    activity:[{action:'Created'}],
    assistantMessages:[{role:'user',text:'hello'}],
    missions:[{id:'m1',name:'Build PC'}],
    projects:[{name:'Build'}],
    notes:[{title:'Idea'}],
    trips:[{destination:'Japan'}],
    goals:[{name:'Learn guitar'}],
    techBuilds:[{name:'PC'}],
    workspaceReports:[{topic:'Research'}]
  };
  const data=normalizeData(source);
  for(const key of Object.keys(source)) assert.deepEqual(data[key],source[key]);
});

test('invalid scalar values fall back safely',()=>{
  const data=normalizeData({budget:'nope',income:null,schoolStats:[],apiUsage:[],marketUsage:[]});
  assert.equal(data.budget,300);
  assert.equal(data.income,0);
  assert.deepEqual(data.schoolStats,{});
  assert.deepEqual(data.apiUsage,{});
  assert.deepEqual(data.marketUsage,{});
});

test('ensureDataShape keeps unknown future fields',()=>{
  const data=ensureDataShape({futureFeature:{enabled:true}});
  assert.deepEqual(data.futureFeature,{enabled:true});
});
