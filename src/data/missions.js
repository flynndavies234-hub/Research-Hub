(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.AIMissions=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function missionProgress(m={}){
    const tasks=Array.isArray(m.tasks)?m.tasks:[];
    if(!tasks.length)return Math.max(0,Math.min(100,Number(m.progress)||0));
    return Math.round(tasks.filter(x=>x&&x.done).length/tasks.length*100);
  }

  function linkedCounts(id,data={}){
    const count=list=>(Array.isArray(list)?list:[]).filter(x=>x&&x.missionId===id).length;
    return {
      projects:count(data.projects),
      notes:count(data.notes),
      trips:count(data.trips),
      goals:count(data.goals),
      tech:count(data.techBuilds)
    };
  }

  function missionIsComplete(m={}){
    const tasks=Array.isArray(m.tasks)?m.tasks:[];
    return tasks.length>0&&tasks.every(x=>x&&x.done);
  }

  return {missionProgress,linkedCounts,missionIsComplete};
});
