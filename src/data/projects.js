(function(root,factory){
 const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AIProjects=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 function projectProgress(p={}){
   const tasks=Array.isArray(p.tasks)?p.tasks:[];
   if(!tasks.length)return Math.max(0,Math.min(100,Number(p.progress)||0));
   return Math.round(tasks.filter(x=>x&&x.done).length/tasks.length*100);
 }
 function projectComplete(p={}){
   const tasks=Array.isArray(p.tasks)?p.tasks:[];
   return tasks.length>0&&tasks.every(x=>x&&x.done);
 }
 function nextTask(p={}){
   const task=(Array.isArray(p.tasks)?p.tasks:[]).find(x=>x&&!x.done);
   return task?String(task.text||''):'';
 }
 return {projectProgress,projectComplete,nextTask};
});
