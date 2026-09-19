(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.AICalendar=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function isoDate(v){return /^\d{4}-\d{2}-\d{2}$/.test(String(v||''))?String(v):''}
  function eventTime(date,time=''){
    const d=isoDate(date); if(!d)return Number.NaN;
    const t=/^\d{2}:\d{2}$/.test(String(time||''))?String(time):'12:00';
    return new Date(d+'T'+t+':00').getTime();
  }
  function collectEvents(data={},now=Date.now()){
    const out=[];
    const add=(date,title,type,extra={})=>{const d=isoDate(date);if(!d)return;out.push({date:d,title:String(title||type),type,...extra,timeMs:eventTime(d,extra.time||'')})};
    (data.reminders||[]).forEach((x,i)=>{if(!x.done)add(x.date,x.title||'Reminder','Reminder',{id:x.id,index:i,time:x.time||'',kind:x.kind||'General',notes:x.notes||'',source:'reminders'})});
    (data.missions||[]).forEach((x,i)=>{if(x.target&&x.status!=='Done')add(x.target,x.name,'Mission',{index:i,source:'missions'})});
    (data.goals||[]).forEach((x,i)=>{if(x.target&&(+x.progress||0)<100)add(x.target,x.name,'Goal',{index:i,source:'goals'})});
    (data.trips||[]).forEach((x,i)=>{if(x.start)add(x.start,'Trip starts: '+x.destination,'Trip',{index:i,source:'trips'});if(x.end)add(x.end,'Trip ends: '+x.destination,'Trip',{index:i,source:'trips'})});
    return out.sort((a,b)=>a.timeMs-b.timeMs||a.title.localeCompare(b.title));
  }
  function partitionEvents(events,now=Date.now(),windowDays=30){
    const start=new Date(now);start.setHours(0,0,0,0);
    const cutoff=start.getTime()+windowDays*86400000;
    return {
      upcoming:events.filter(x=>x.timeMs>=start.getTime()&&x.timeMs<cutoff),
      later:events.filter(x=>x.timeMs>=cutoff)
    };
  }
  function dueReminders(reminders=[],now=Date.now(),lookbackMs=120000){
    return reminders.filter(x=>!x.done&&!x.notifiedAt&&Number.isFinite(eventTime(x.date,x.time))&&eventTime(x.date,x.time)<=now&&eventTime(x.date,x.time)>=now-lookbackMs);
  }
  return {isoDate,eventTime,collectEvents,partitionEvents,dueReminders};
});
