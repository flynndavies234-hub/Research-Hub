const test=require('node:test');
const assert=require('node:assert/strict');
const {templates,instantiateTemplate}=require('../src/data/templates');
const now='2026-09-19T20:00:00.000Z';

test('template catalog contains core V3 starter templates',()=>{
  for(const id of ['learn-skill','plan-trip','build-project','exam-prep','buy-compare','tech-build'])assert.ok(templates.some(x=>x.id===id));
});

test('trip template creates a mission linked to a trip',()=>{
  const x=instantiateTemplate('plan-trip',{title:'Japan'},now);
  assert.equal(x.missions.length,1);
  assert.equal(x.trips.length,1);
  assert.equal(x.trips[0].missionId,x.missions[0].id);
  assert.ok(x.missions[0].tasks.length>=5);
});

test('tech template creates a linked Tech Lab item',()=>{
  const x=instantiateTemplate('tech-build',{title:'Home server'},now);
  assert.equal(x.techBuilds[0].missionId,x.missions[0].id);
});

test('all templates create actionable missions',()=>{
  for(const t of templates){
    const x=instantiateTemplate(t.id,{title:'Test'},now);
    assert.equal(x.missions.length,1);
    assert.equal(x.missions[0].status,'Active');
    assert.ok(x.missions[0].tasks.length>=5);
  }
});

test('unknown template is rejected',()=>{
  assert.throws(()=>instantiateTemplate('wat',{},now),/unknown template/i);
});
