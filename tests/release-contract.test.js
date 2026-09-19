const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('fs');

const yml=fs.readFileSync('.github/workflows/release.yml','utf8');

test('release workflow validates external V3 renderer',()=>{
 assert.match(yml,/node --check renderer\.js/);
 assert.doesNotMatch(yml,/renderer-check\.js/);
 assert.doesNotMatch(yml,/Renderer script not found/);
});

test('release workflow runs static audit and unit tests before build',()=>{
 const audit=yml.indexOf('node scripts/static-check.js');
 const tests=yml.indexOf('npm test');
 const build=yml.indexOf('npm run dist:win');
 assert.ok(audit>0&&tests>audit&&build>tests);
});

test('release workflow guards release ref against package version',()=>{
 assert.match(yml,/Verify release ref matches package version/);
 assert.match(yml,/release\/v\$v/);
});

test('release only publishes expected updater artifacts',()=>{
 assert.match(yml,/dist\/latest\.yml/);
 assert.match(yml,/dist\/\*\.exe/);
 assert.match(yml,/dist\/\*\.blockmap/);
});
