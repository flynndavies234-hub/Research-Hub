(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.AIInbox=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function baseText(item={}){
    return String(item.text||item.details||'').trim();
  }
  function createFromInbox(item={},target='Note',now=new Date().toISOString()){
    const text=baseText(item),details=String(item.details||'').trim();
    if(!text) throw new Error('Inbox item has no content.');
    switch(target){
      case 'Mission':
        return {collection:'missions',value:{id:'m'+Date.now().toString(36),name:text.slice(0,100),outcome:details||'Created from Inbox',category:'Personal',target:'',status:'Idea',progress:0,tasks:[],date:now,updated:now}};
      case 'Project':
        return {collection:'projects',value:{name:text.slice(0,100),missionId:'',category:'Personal',status:'Idea',progress:0,notes:details||'Created from Inbox',date:now}};
      case 'Goal':
        return {collection:'goals',value:{name:text.slice(0,100),missionId:'',target:'',progress:0,notes:details||'Created from Inbox',date:now}};
      case 'Trip':
        return {collection:'trips',value:{destination:text.slice(0,100),missionId:'',start:'',end:'',budget:0,notes:details||'Created from Inbox',date:now}};
      case 'Tech':
        return {collection:'techBuilds',value:{name:text.slice(0,100),missionId:'',type:'Other',budget:0,notes:details||'Created from Inbox',date:now}};
      case 'Workspace':
        return {collection:null,value:{topic:text,goal:details||'Research and help me understand or act on this inbox item.'}};
      case 'Note':
      default:
        return {collection:'notes',value:{title:text.slice(0,70),missionId:'',tags:['inbox'],body:[text,details].filter(Boolean).join('\n\n'),pinned:false,date:now}};
    }
  }
  return {createFromInbox};
});
