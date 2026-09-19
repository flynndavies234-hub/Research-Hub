(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.AISearch=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const text=v=>String(v??'');
  function searchAll(data={},query='',limit=30){
    const q=text(query).trim().toLowerCase();if(!q)return[];
    const results=[];
    const add=(type,view,title,subtitle,index,haystack,extra={})=>{if(text(haystack).toLowerCase().includes(q))results.push({type,view,title:text(title)||type,subtitle:text(subtitle),index,...extra})};
    (data.missions||[]).forEach((x,i)=>add('Mission','missions',x.name,x.status||'',i,JSON.stringify([x.name,x.outcome,x.category,x.status,(x.tasks||[]).map(t=>t.text)]),{missionId:x.id}));
    (data.inbox||[]).forEach((x,i)=>add('Inbox','inbox',x.text,x.type||'',i,JSON.stringify(x)));
    (data.projects||[]).forEach((x,i)=>add('Project','projects',x.name,[x.category,x.status].filter(Boolean).join(' • '),i,JSON.stringify(x)));
    (data.notes||[]).forEach((x,i)=>add('Note','notes',x.title,(x.tags||[]).join(', '),i,JSON.stringify(x)));
    (data.trips||[]).forEach((x,i)=>add('Trip','travel',x.destination,[x.start,x.end].filter(Boolean).join(' → '),i,JSON.stringify(x)));
    (data.goals||[]).forEach((x,i)=>add('Goal','goals',x.name,x.target||'',i,JSON.stringify(x)));
    (data.techBuilds||[]).forEach((x,i)=>add('Tech','tech',x.name,x.type||'',i,JSON.stringify(x)));
    (data.workspaceReports||[]).forEach((x,i)=>add('Workspace','workspace',x.topic||x.category,x.category||'',i,JSON.stringify([x.topic,x.goal,x.report])));
    (data.research||[]).forEach((x,i)=>add('Research','research',x.name,x.type||x.kind||'',i,JSON.stringify([x.name,x.report,x.notes,x.type,x.kind])));
    (data.watch||[]).forEach((x,i)=>add('Watchlist','watchlist',x.name||x.ticker,x.ticker||'',i,JSON.stringify(x)));
    (data.school||[]).forEach((x,i)=>add('School','school',x.question||x.subject||'School session',x.subject||'',i,JSON.stringify(x)));
    (data.mistakes||[]).forEach((x,i)=>add('Mistake','school',x.topic||x.question||'Mistake',x.subject||'',i,JSON.stringify(x),{mistake:true}));
    const starts=(r)=>r.title.toLowerCase().startsWith(q)?0:r.title.toLowerCase().includes(q)?1:2;
    return results.sort((a,b)=>starts(a)-starts(b)||a.title.localeCompare(b.title)).slice(0,limit);
  }
  return {searchAll};
});
