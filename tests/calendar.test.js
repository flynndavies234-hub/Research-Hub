const test=require('node:test');
const assert=require('node:assert/strict');
const {collectEvents,partitionEvents,dueReminders}=require('../src/data/calendar');

test('calendar collects dated items across modules',()=>{
  const data={
    reminders:[{id:'r1',title:'Call',date:'2026-09-20',time:'09:00'}],
    missions:[{name:'Build PC',target:'2026-09-22',status:'Active'}],
    goals:[{name:'Learn guitar',target:'2026-09-25',progress:20}],
    trips:[{destination:'Berlin',start:'2026-09-27',end:'2026-09-30'}]
  };
  const ev=collectEvents(data,new Date('2026-09-19T12:00:00').getTime());
  assert.equal(ev.length,5);
  assert.deepEqual(ev.map(x=>x.type),['Reminder','Mission','Goal','Trip','Trip']);
});

test('completed missions goals and reminders do not appear',()=>{
  const data={reminders:[{title:'x',date:'2026-09-20',done:true}],missions:[{name:'m',target:'2026-09-20',status:'Done'}],goals:[{name:'g',target:'2026-09-20',progress:100}]};
  assert.equal(collectEvents(data).length,0);
});

test('partition splits 30 day window',()=>{
  const events=collectEvents({reminders:[
    {title:'near',date:'2026-09-25'},
    {title:'later',date:'2026-11-01'}
  ]});
  const p=partitionEvents(events,new Date('2026-09-19T12:00:00').getTime(),30);
  assert.equal(p.upcoming.length,1);
  assert.equal(p.later.length,1);
});

test('due reminders only returns fresh unnotified due items',()=>{
  const now=new Date('2026-09-19T20:00:00').getTime();
  const reminders=[
    {title:'due',date:'2026-09-19',time:'19:59'},
    {title:'old',date:'2026-09-19',time:'19:00'},
    {title:'done',date:'2026-09-19',time:'19:59',done:true},
    {title:'sent',date:'2026-09-19',time:'19:59',notifiedAt:'x'}
  ];
  assert.deepEqual(dueReminders(reminders,now).map(x=>x.title),['due']);
});
