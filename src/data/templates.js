(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.AITemplates=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const templates=[
    {id:'learn-skill',name:'Learn a skill',description:'Mission + learning project + milestone tasks'},
    {id:'plan-trip',name:'Plan a trip',description:'Mission + trip workspace + planning tasks'},
    {id:'build-project',name:'Build something',description:'Mission + project + practical build tasks'},
    {id:'exam-prep',name:'Exam preparation',description:'Mission + study project + revision tasks'},
    {id:'buy-compare',name:'Compare a purchase',description:'Mission + research project + decision tasks'},
    {id:'tech-build',name:'Tech build',description:'Mission + Tech Lab item + parts/research tasks'}
  ];
  function id(prefix,now){return prefix+String(now).replace(/\D/g,'').slice(-10)+Math.random().toString(36).slice(2,5)}
  function baseMission(name,outcome,category,tasks,now){
    return {id:id('m',now),name,outcome,category,target:'',status:'Active',progress:0,tasks:tasks.map((text,i)=>({id:'t'+i+String(now).slice(-5),text,done:false})),date:now,updated:now};
  }
  function instantiateTemplate(templateId,input={},now=new Date().toISOString()){
    const title=String(input.title||'').trim();
    let mission,created={missions:[],projects:[],trips:[],goals:[],techBuilds:[],notes:[]};
    switch(templateId){
      case 'learn-skill':{
        const subject=title||'Learn a new skill';
        mission=baseMission(subject,'Become confident enough to use this skill independently.','Learning',['Define what success looks like','Find the best learning resources','Create a practice routine','Complete first practice session','Review progress and adjust'],now);
        created.projects.push({name:subject+' learning plan',missionId:mission.id,category:'Personal',status:'Active',progress:0,notes:'Learning project created from template.',date:now});break;
      }
      case 'plan-trip':{
        const place=title||'Plan a trip';
        mission=baseMission(place,'Plan a realistic, enjoyable trip with transport, accommodation, budget and activities decided.','Travel',['Choose dates','Set trip budget','Research transport','Research accommodation','Build itinerary','Create packing checklist'],now);
        created.trips.push({destination:place.replace(/^Plan (a )?trip (to )?/i,''),missionId:mission.id,start:'',end:'',budget:0,packing:[],itinerary:[],notes:'Trip created from template.',date:now});break;
      }
      case 'build-project':{
        const name=title||'Build a project';
        mission=baseMission(name,'Finish a working version and document what was learned.','Personal',['Define requirements','Research options and materials','Create build plan','Build first version','Test and fix problems','Finish and document'],now);
        created.projects.push({name,missionId:mission.id,category:'Personal',status:'Active',progress:0,notes:'Build project created from template.',date:now});break;
      }
      case 'exam-prep':{
        const exam=title||'Prepare for an exam';
        mission=baseMission(exam,'Be prepared across the required topics and know the weak areas before the exam.','School',['List exam topics','Identify weak areas','Create revision schedule','Complete practice questions','Review mistakes','Do a timed practice test'],now);
        created.projects.push({name:exam+' revision',missionId:mission.id,category:'School',status:'Active',progress:0,notes:'Revision project created from template.',date:now});break;
      }
      case 'buy-compare':{
        const item=title||'Compare a purchase';
        mission=baseMission(item,'Make an informed decision using requirements, evidence, total cost and trade-offs.','Personal',['Define must-have requirements','Set budget','Research at least three options','Compare total cost and trade-offs','Check common problems/reviews','Record final decision'],now);
        created.projects.push({name:item+' comparison',missionId:mission.id,category:'Personal',status:'Active',progress:0,notes:'Buying comparison created from template.',date:now});break;
      }
      case 'tech-build':{
        const build=title||'New tech build';
        mission=baseMission(build,'Design, build and test a working technical setup within the chosen budget.','Tech',['Define requirements','Set budget','Research components','Check compatibility','Build or configure','Test and document'],now);
        created.techBuilds.push({name:build,missionId:mission.id,type:'Other',budget:0,notes:'Tech project created from template.',date:now});break;
      }
      default: throw new Error('Unknown template.');
    }
    created.missions.push(mission);
    return created;
  }
  return {templates,instantiateTemplate};
});
