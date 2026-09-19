const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('fs');
const {normalizeData}=require('../src/data/schema');

test('V3 workspace data survives JSON backup round trip',()=>{
 const data={
  workspaceReports:[{topic:'robotics',report:'x'}],
  inbox:[{id:'i1',text:'idea'}],
  reminders:[{id:'r1',title:'test',date:'2026-10-01'}],
  activity:[{action:'Created',label:'x'}],
  assistantMessages:[{role:'assistant',text:'hello'}],
  missions:[{id:'m1',name:'Mission',tasks:[{text:'task',done:false}]}],
  projects:[{name:'Project',missionId:'m1',deadline:'2026-10-02',tasks:[{text:'task',done:true}]}],
  notes:[{title:'Note',body:'body',tags:['a'],pinned:true}],
  trips:[{destination:'Japan',packing:[{text:'passport',done:true}],itinerary:[{date:'2026-10-03',text:'Tokyo'}]}],
  goals:[{name:'Goal',progress:33}],
  techBuilds:[{name:'PC',budget:1000,parts:[{name:'GPU',qty:1,unitPrice:500}]}],
  holdings:[{ticker:'NVDA',shares:1,avg:100}],
  watch:[{ticker:'ASML'}],
  research:[{name:'Research'}],
  allocations:[{name:'Monthly',amount:300}],
  school:[{subject:'Maths'}],
  mistakes:[{subject:'Maths'}],
  schoolStats:{Maths:{attempts:1,correct:1}},
  schoolSubject:'Maths',
  pins:[],budget:300,income:2100,budgetHistory:[],apiUsage:{},marketUsage:{},transactions:[],fxRates:{EUR:{rate:1,updated:1}},marketRefreshMode:'auto'
 };
 const file=JSON.stringify(data);
 const restored=normalizeData(JSON.parse(file));
 for(const key of ['workspaceReports','inbox','reminders','activity','assistantMessages','missions','projects','notes','trips','goals','techBuilds','holdings','watch','research','school'])assert.deepEqual(restored[key],data[key]);
 assert.equal(restored.income,2100);
});

test('backup normalization never imports API keys or profile PIN settings',()=>{
 const restored=normalizeData({openaiKey:'secret',marketDataKey:'secret2',profilePinHash:'hash',profilePinSalt:'salt'});
 assert.equal('openaiKey' in restored,false);
 assert.equal('marketDataKey' in restored,false);
 assert.equal('profilePinHash' in restored,false);
 assert.equal('profilePinSalt' in restored,false);
});


test('backup UI preserves current data before import/reset and uses version-neutral filename',()=>{
  const renderer=fs.readFileSync('renderer.js','utf8');
  assert.match(renderer,/AI-Research-V3-backup-'\+localDateKey\(\)/);
  assert.match(renderer,/Import this backup\? Your current workspace will be preserved/);
  assert.match(renderer,/Reset all workspace data\? A recovery snapshot/);
});
