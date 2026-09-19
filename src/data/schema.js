(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.AIData=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function defaultFxRates(){return {EUR:{rate:1,updated:Date.now()}}}

  function normalizeData(x={}){
    x=x&&typeof x==='object'?x:{};
    return {
      workspaceReports:Array.isArray(x.workspaceReports)?x.workspaceReports:[],
      inbox:Array.isArray(x.inbox)?x.inbox:[],
      reminders:Array.isArray(x.reminders)?x.reminders:[],
      activity:Array.isArray(x.activity)?x.activity:[],
      missions:Array.isArray(x.missions)?x.missions:[],
      projects:Array.isArray(x.projects)?x.projects:[],
      notes:Array.isArray(x.notes)?x.notes:[],
      trips:Array.isArray(x.trips)?x.trips:[],
      goals:Array.isArray(x.goals)?x.goals:[],
      techBuilds:Array.isArray(x.techBuilds)?x.techBuilds:[],
      holdings:Array.isArray(x.holdings)?x.holdings:[],
      watch:Array.isArray(x.watch)?x.watch:[],
      research:Array.isArray(x.research)?x.research:[],
      allocations:Array.isArray(x.allocations)?x.allocations:[],
      school:Array.isArray(x.school)?x.school:[],
      mistakes:Array.isArray(x.mistakes)?x.mistakes:[],
      schoolStats:x.schoolStats&&typeof x.schoolStats==='object'&&!Array.isArray(x.schoolStats)?x.schoolStats:{},
      schoolSubject:String(x.schoolSubject||'Maths'),
      pins:Array.isArray(x.pins)?x.pins:[],
      budget:Number.isFinite(+x.budget)?+x.budget:300,
      income:Number.isFinite(+x.income)?+x.income:0,
      budgetHistory:Array.isArray(x.budgetHistory)?x.budgetHistory:[],
      apiUsage:x.apiUsage&&typeof x.apiUsage==='object'&&!Array.isArray(x.apiUsage)?x.apiUsage:{},
      marketUsage:x.marketUsage&&typeof x.marketUsage==='object'&&!Array.isArray(x.marketUsage)?x.marketUsage:{},
      transactions:Array.isArray(x.transactions)?x.transactions:[],
      fxRates:x.fxRates&&typeof x.fxRates==='object'&&!Array.isArray(x.fxRates)?x.fxRates:defaultFxRates(),
      marketRefreshMode:String(x.marketRefreshMode||'auto')
    };
  }

  function ensureDataShape(x={}){
    const source=x&&typeof x==='object'?x:{};
    return Object.assign({},source,normalizeData(source));
  }

  return {normalizeData,ensureDataShape};
});
