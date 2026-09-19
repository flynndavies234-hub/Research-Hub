(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.AIContext=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const clip=(v,n=120)=>String(v??'').slice(0,n);
  const take=(arr,n=8)=>Array.isArray(arr)?arr.slice(0,n):[];
  function buildContext(data={},view='dashboard',activeMissionIndex=-1){
    const ctx={view,summary:{
      inbox:(data.inbox||[]).length,missions:(data.missions||[]).length,projects:(data.projects||[]).length,notes:(data.notes||[]).length,trips:(data.trips||[]).length,goals:(data.goals||[]).length,tech:(data.techBuilds||[]).length,savedResearch:(data.research||[]).length
    }};
    const mission=(data.missions||[])[activeMissionIndex];
    if(mission)ctx.selectedMission={name:clip(mission.name),outcome:clip(mission.outcome,500),status:mission.status||'Active',target:mission.target||'',tasks:take(mission.tasks,12).map(x=>({text:clip(x.text,180),done:!!x.done}))};
    if(view==='missions')ctx.missions=take(data.missions,8).map(x=>({name:clip(x.name),status:x.status,progress:x.progress,target:x.target||'',nextTask:clip((x.tasks||[]).find(t=>!t.done)?.text||'')}));
    if(view==='projects')ctx.projects=take(data.projects,10).map(x=>({name:clip(x.name),status:x.status,progress:x.progress,computedProgress:(x.tasks||[]).length?Math.round((x.tasks||[]).filter(t=>t.done).length/(x.tasks||[]).length*100):x.progress,category:x.category,deadline:x.deadline||'',missionId:x.missionId||'',nextTask:clip((x.tasks||[]).find(t=>!t.done)?.text||'',160)}));
    if(view==='notes')ctx.notes=take(data.notes,12).map(x=>({title:clip(x.title),tags:take(x.tags,8).map(t=>clip(t,40)),pinned:!!x.pinned}));
    if(view==='travel')ctx.trips=take(data.trips,10).map(x=>({destination:clip(x.destination),start:x.start||'',end:x.end||'',budget:Number(x.budget)||0,missionId:x.missionId||''}));
    if(view==='goals')ctx.goals=take(data.goals,10).map(x=>({name:clip(x.name),target:x.target||'',progress:Number(x.progress)||0,missionId:x.missionId||''}));
    if(view==='tech')ctx.tech=take(data.techBuilds,10).map(x=>({name:clip(x.name),type:x.type||'',budget:Number(x.budget)||0,missionId:x.missionId||'',parts:take(x.parts,12).map(p=>({name:clip(p.name),qty:Number(p.qty)||0,unitPrice:Number(p.unitPrice)||0})),partsCost:(x.parts||[]).reduce((s,p)=>s+(Math.max(0,Number(p.qty)||0)*Math.max(0,Number(p.unitPrice)||0)),0)}));
    if(view==='inbox')ctx.inbox=take(data.inbox,10).map(x=>({type:x.type||'',text:clip(x.text,180)}));
    if(view==='school')ctx.school={subject:data.schoolSubject||'Maths',stats:data.schoolStats||{},recentMistakes:take(data.mistakes,5).map(x=>({subject:x.subject,topic:clip(x.topic),question:clip(x.question,160),resolved:!!x.resolved}))};
    if(view==='portfolio')ctx.portfolio=take(data.holdings,12).map(x=>({ticker:x.ticker,shares:Number(x.shares)||0,avgEur:Number(x.avg)||0,current:Number(x.current)||null,currency:x.currentCurrency||'EUR'}));
    if(view==='watchlist')ctx.watchlist=take(data.watch,12).map(x=>({ticker:x.ticker,name:clip(x.name),reason:clip(x.reason,160)}));
    if(view==='research')ctx.savedResearch=take(data.research,8).map(x=>({name:clip(x.name),type:x.type||x.kind||'',date:x.date||''}));
    if(view==='calendar')ctx.upcomingReminders=take((data.reminders||[]).filter(x=>!x.done),10).map(x=>({title:clip(x.title),date:x.date,time:x.time||'',kind:x.kind||''}));
    return ctx;
  }
  function serializeContext(data,view,activeMissionIndex){
    return JSON.stringify(buildContext(data,view,activeMissionIndex),null,2).slice(0,12000);
  }
  return {buildContext,serializeContext};
});
