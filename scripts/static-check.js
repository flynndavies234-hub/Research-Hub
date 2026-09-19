const fs=require('fs');
function fail(msg){console.error('STATIC CHECK FAILED: '+msg);process.exit(1)}
const html=fs.readFileSync('index.html','utf8');
const renderer=fs.readFileSync('renderer.js','utf8');
const main=fs.readFileSync('main.js','utf8');
const preload=fs.readFileSync('preload.js','utf8');
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));

try{new Function(renderer)}catch(e){fail('renderer syntax: '+e.message)}
if(!html.includes('src="src/data/schema.js"'))fail('index.html does not load shared data schema');
if(!html.includes('src="src/data/missions.js"'))fail('index.html does not load Mission data module');
if(!html.includes('src="src/data/inbox.js"'))fail('index.html does not load Inbox data module');
if(!html.includes('src="src/data/calendar.js"'))fail('index.html does not load Calendar data module');
if(!html.includes('src="src/data/templates.js"'))fail('index.html does not load Templates data module');
if(!html.includes('src="src/data/context.js"'))fail('index.html does not load Assistant context module');
if(!html.includes('src="src/data/search.js"'))fail('index.html does not load Universal Search module');
if(!html.includes('src="src/data/projects.js"'))fail('index.html does not load Projects data module');
if(!html.includes('src="renderer.js"'))fail('index.html does not load renderer.js');
if(!html.includes('href="styles.css"'))fail('index.html does not load styles.css');

const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const idSet=new Set(ids);
const duplicates=[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))];
if(duplicates.length)fail('duplicate IDs: '+duplicates.join(', '));

const dynamicIds=new Set(['removeSchoolFile']);
const qRefs=[...renderer.matchAll(/\bq\('([^']+)'\)/g)].map(m=>m[1]);
const missing=[...new Set(qRefs.filter(id=>!idSet.has(id)&&!dynamicIds.has(id)))];
if(missing.length)fail('q() references missing IDs: '+missing.join(', '));

const requiredHtml=[
  "const KEY='aiResearchDesktopV21'",
  'Research Lab',
  'Portfolio Intelligence',
  'School Lab',
  'Teach Me This',
  'Practice 2.0',
  'Mistake Book',
  'practiceWeakAreas',
  'schoolStats',
  'Universal Search',
  'openGlobalResult',
  'Your personal research workspace',
  'focusModeBtn',
  'Keyboard shortcuts',
  'V3 Assistant',
  'assistantMessages',
  'Starter Templates',
  'dFavorites',
  'dToday',
  'Calendar & Reminders',
  'Activity & Recovery',
  'undoDelete',
  'Command Palette',
  'Universal Inbox',
  'commandInput',
  'convertInbox',
  'Missions',
  'missionList',
  'addMissionTask',
  'missionProgress',
  'AI Workspace',
  'Projects',
  'projectDeadline',
  'addProjectTask',
  'toggleProjectTask',
  'Notes & Knowledge',
  'Travel',
  'Goals',
  'Tech Lab',
  'lockScreen',
  'profileStateText'
];
for(const x of requiredHtml)if(!(html.includes(x)||renderer.includes(x)))fail('missing renderer feature: '+x);

const requiredMain=["'research-agent'","'compare-assets'","'portfolio-insight'","'school-ask'","'workspace-ask'","'assistant-chat'","'profile-state'","'profile-configure'","'profile-unlock'","'profile-lock'","'profile-disable'","'show-notification'","web_search_call.action.sources","safeStorage.encryptString","./src/security/profile","createPinRecord","verifyPin"];
for(const s of requiredMain)if(!main.includes(s))fail('missing main-process wiring: '+s);

const requiredPreload=['researchAgent','compareAssets','portfolioInsight','schoolAsk','workspaceAsk','assistantChat','notify','profileState','profileConfigure','profileUnlock','profileLock','profileDisable'];
for(const s of requiredPreload)if(!preload.includes(s))fail('missing preload API: '+s);

if(pkg.version!=='3.0.0')fail('package version is '+pkg.version+' instead of 3.0.0');
if(pkg.build?.publish?.[0]?.repo!=='Research-Hub')fail('updater repo is not Research-Hub');
for(const file of ['renderer.js','styles.css','src/**/*.js'])if(!pkg.build?.files?.includes(file))fail('packaged file missing: '+file);
const schema=fs.readFileSync('src/data/schema.js','utf8');
const missions=fs.readFileSync('src/data/missions.js','utf8');
const inbox=fs.readFileSync('src/data/inbox.js','utf8');
const calendar=fs.readFileSync('src/data/calendar.js','utf8');
const templates=fs.readFileSync('src/data/templates.js','utf8');
const context=fs.readFileSync('src/data/context.js','utf8');
const search=fs.readFileSync('src/data/search.js','utf8');
const projects=fs.readFileSync('src/data/projects.js','utf8');
for(const x of ['inbox','reminders','activity','assistantMessages','missions','workspaceReports','projects','notes','trips','goals','techBuilds'])if(!schema.includes(x))fail('shared data schema missing: '+x);
for(const x of ['missionProgress','linkedCounts','missionIsComplete'])if(!missions.includes(x))fail('Mission data module missing: '+x);
if(!inbox.includes('createFromInbox'))fail('Inbox data module missing conversion logic');
for(const x of ['collectEvents','partitionEvents','dueReminders'])if(!calendar.includes(x))fail('Calendar data module missing: '+x);
for(const x of ['templates','instantiateTemplate'])if(!templates.includes(x))fail('Templates module missing: '+x);
for(const x of ['buildContext','serializeContext'])if(!context.includes(x))fail('Assistant context module missing: '+x);
if(!search.includes('searchAll'))fail('Universal Search module missing searchAll');
for(const x of ['projectProgress','projectComplete','nextTask'])if(!projects.includes(x))fail('Projects module missing: '+x);
for(const x of ['projectMission','noteMission','tripMission','goalMission','techMission'])if(!html.includes('id="'+x+'"'))fail('mission link selector missing: '+x);

console.log('Static integration audit passed:',{
  ids:ids.length,
  qRefs:qRefs.length,
  version:pkg.version,
  updaterRepo:pkg.build.publish[0].repo
});
