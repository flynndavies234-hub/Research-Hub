const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('fs');
const path=require('path');

const html=fs.readFileSync('index.html','utf8');
const renderer=fs.readFileSync('renderer.js','utf8');
const preload=fs.readFileSync('preload.js','utf8');
const main=fs.readFileSync('main.js','utf8');
const schema=fs.readFileSync('src/data/schema.js','utf8');
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));

test('renderer API usage is exposed by preload',()=>{
  const used=[...new Set([...renderer.matchAll(/\bapi\.([A-Za-z_$][\w$]*)/g)].map(m=>m[1]))];
  const exposed=[...new Set([
    ...[...preload.matchAll(/\b([A-Za-z_$][\w$]*):[^,\n]*ipcRenderer\.invoke/g)].map(m=>m[1]),
    ...[...preload.matchAll(/\b([A-Za-z_$][\w$]*):[^,\n]*ipcRenderer\.on/g)].map(m=>m[1])
  ])];
  assert.deepEqual(used.filter(x=>!exposed.includes(x)),[]);
});

test('every preload invoke has a main-process handler',()=>{
  const invokes=[...new Set([...preload.matchAll(/ipcRenderer\.invoke\('([^']+)'/g)].map(m=>m[1]))];
  const handlers=[...new Set([...main.matchAll(/ipcMain\.handle\('([^']+)'/g)].map(m=>m[1]))];
  assert.deepEqual(invokes.filter(x=>!handlers.includes(x)),[]);
});

test('renderer top-level data usage exists in shared schema',()=>{
  const used=[...new Set([...renderer.matchAll(/\bD\.([A-Za-z_$][\w$]*)/g)].map(m=>m[1]))];
  const fields=[...new Set([...schema.matchAll(/^\s+([A-Za-z_$][\w$]*):/gm)].map(m=>m[1]))];
  assert.deepEqual(used.filter(x=>!fields.includes(x)),[]);
});

test('generated inline handlers resolve to renderer functions',()=>{
  const calls=[...renderer.matchAll(/(?:onclick|onchange)=["']([^"'=<>]+?)\(/g)]
    .map(m=>m[1].replace(/\\'/g,"'").match(/([A-Za-z_$][\w$]*)\s*$/)?.[1])
    .filter(Boolean);
  const defs=new Set([
    ...[...renderer.matchAll(/window\.([A-Za-z_$][\w$]*)\s*=/g)].map(m=>m[1]),
    ...[...renderer.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1])
  ]);
  assert.deepEqual([...new Set(calls.filter(x=>!defs.has(x)))],[]);
});

test('direct DOM event properties are not assigned twice',()=>{
  const bindings=[...renderer.matchAll(/q\('([^']+)'\)\.(onclick|oninput|onchange|onkeydown)\s*=/g)].map(m=>m[1]+'.'+m[2]);
  const duplicates=[...new Set(bindings.filter((x,i)=>bindings.indexOf(x)!==i))];
  assert.deepEqual(duplicates,[]);
});

test('all test files are included in npm test',()=>{
  const files=fs.readdirSync('tests').filter(x=>x.endsWith('.test.js')).sort();
  const command=String(pkg.scripts?.test||'');
  const missing=files.filter(file=>!command.includes('tests/'+file));
  assert.deepEqual(missing,[]);
});

test('V3 package includes all runtime asset groups',()=>{
  for(const file of ['index.html','main.js','preload.js','package.json','renderer.js','styles.css','src/**/*.js']){
    assert.ok(pkg.build?.files?.includes(file),'missing build asset '+file);
  }
});
