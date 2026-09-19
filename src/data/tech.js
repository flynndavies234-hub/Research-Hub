(function(root,factory){
 const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AITech=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 function partsCost(build={}){
   return (Array.isArray(build.parts)?build.parts:[]).reduce((sum,p)=>sum+(Math.max(0,Number(p.qty)||0)*Math.max(0,Number(p.unitPrice)||0)),0);
 }
 function budgetRemaining(build={}){
   const budget=Math.max(0,Number(build.budget)||0);return budget-partsCost(build);
 }
 function partCount(build={}){
   return (Array.isArray(build.parts)?build.parts:[]).reduce((sum,p)=>sum+Math.max(0,Number(p.qty)||0),0);
 }
 return {partsCost,budgetRemaining,partCount};
});
