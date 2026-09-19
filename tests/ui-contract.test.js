const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('fs');

const html=fs.readFileSync('index.html','utf8');
const renderer=fs.readFileSync('renderer.js','utf8');

test('all HTML ids are unique',()=>{
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  const dup=[...new Set(ids.filter((x,i)=>ids.indexOf(x)!==i))];
  assert.deepEqual(dup,[]);
});

test('every sidebar destination has a matching view section',()=>{
  const views=[...html.matchAll(/data-view="([^"]+)"/g)].map(m=>m[1]);
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  for(const view of views)assert.ok(ids.has(view),'missing section #'+view);
});

test('every renderer q() reference resolves to an HTML element',()=>{
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  const refs=[...renderer.matchAll(/\bq\('([^']+)'\)/g)].map(m=>m[1]);
  const allowed=new Set(['removeSchoolFile']);
  const missing=[...new Set(refs.filter(x=>!ids.has(x)&&!allowed.has(x)))];
  assert.deepEqual(missing,[]);
});

test('shared modules load before renderer',()=>{
  const modules=['src/data/schema.js','src/data/missions.js','src/data/inbox.js','src/data/calendar.js','src/data/templates.js','src/data/context.js','src/data/search.js','src/data/projects.js','src/data/tech.js','src/data/travel.js'];
  const rendererPos=html.indexOf('src="renderer.js"');
  assert.ok(rendererPos>0);
  for(const module of modules){
    const pos=html.indexOf('src="'+module+'"');
    assert.ok(pos>0,'missing '+module);
    assert.ok(pos<rendererPos,module+' must load before renderer.js');
  }
});

test('core V3 views remain present',()=>{
  for(const id of ['dashboard','inbox','templates','missions','workspace','projects','notes','travel','goals','calendar','activity','tech','portfolio','watchlist','research','school','planner','backup','usage','settings']){
    assert.match(html,new RegExp('id="'+id+'"[^>]*class="view'));
  }
});

test('renderer keeps legacy V2 storage key',()=>{
  assert.match(renderer,/const KEY='aiResearchDesktopV21'/);
});


test('Assistant drawer is not implemented as the navigation aside',()=>{
  assert.doesNotMatch(html,/<aside[^>]+id="assistantDrawer"/);
  assert.match(html,/<div[^>]+id="assistantDrawer"/);
});

test('sidebar CSS is scoped to #sidebar instead of every aside element',()=>{
  const css=fs.readFileSync('styles.css','utf8');
  assert.match(css,/#sidebar\{/);
  assert.doesNotMatch(css,/(^|})aside\{/);
  assert.match(css,/\.assistantDrawer\{[^}]*left:auto/);
});


test('sidebar navigation scrolls independently from fixed brand header',()=>{
  const css=fs.readFileSync('styles.css','utf8');
  assert.match(css,/#sidebar\{[^}]*display:flex[^}]*flex-direction:column/);
  assert.match(css,/\.brand\{[^}]*flex:0 0 72px/);
  assert.match(css,/\.nav\{[^}]*overflow-y:auto/);
  assert.match(css,/\.nav\{[^}]*min-height:0/);
});
