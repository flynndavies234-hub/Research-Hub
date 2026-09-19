const fs=require('fs');
function fail(msg){console.error('STATIC CHECK FAILED: '+msg);process.exit(1)}
const html=fs.readFileSync('index.html','utf8');
const main=fs.readFileSync('main.js','utf8');
const preload=fs.readFileSync('preload.js','utf8');
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));

const match=html.match(/<script>([\s\S]*?)<\/script>/);
if(!match)fail('renderer script not found');
try{new Function(match[1])}catch(e){fail('renderer syntax: '+e.message)}

const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const idSet=new Set(ids);
const duplicates=[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))];
if(duplicates.length)fail('duplicate IDs: '+duplicates.join(', '));

const dynamicIds=new Set(['removeSchoolFile']);
const qRefs=[...html.matchAll(/\bq\('([^']+)'\)/g)].map(m=>m[1]);
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
  'AI Workspace',
  'Projects',
  'Notes & Knowledge',
  'Travel',
  'Goals',
  'Tech Lab',
  'lockScreen',
  'profileStateText'
];
for(const s of requiredHtml)if(!html.includes(s))fail('missing renderer feature: '+s);

const requiredMain=["'research-agent'","'compare-assets'","'portfolio-insight'","'school-ask'","'workspace-ask'","'profile-state'","'profile-configure'","'profile-unlock'","'profile-lock'","'profile-disable'","web_search_call.action.sources","safeStorage.encryptString","crypto.scryptSync"];
for(const s of requiredMain)if(!main.includes(s))fail('missing main-process wiring: '+s);

const requiredPreload=['researchAgent','compareAssets','portfolioInsight','schoolAsk','workspaceAsk','profileState','profileConfigure','profileUnlock','profileLock','profileDisable'];
for(const s of requiredPreload)if(!preload.includes(s))fail('missing preload API: '+s);

if(pkg.version!=='3.0.0')fail('package version is '+pkg.version+' instead of 3.0.0');
if(pkg.build?.publish?.[0]?.repo!=='Research-Hub')fail('updater repo is not Research-Hub');

console.log('Static integration audit passed:',{
  ids:ids.length,
  qRefs:qRefs.length,
  version:pkg.version,
  updaterRepo:pkg.build.publish[0].repo
});
