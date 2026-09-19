const test=require('node:test');
const assert=require('node:assert/strict');
const {validatePin,createPinRecord,verifyPin}=require('../src/security/profile');

test('PIN validation accepts only 4 to 12 digits',()=>{
  assert.equal(validatePin('1234'),true);
  assert.equal(validatePin('123456789012'),true);
  assert.equal(validatePin('123'),false);
  assert.equal(validatePin('1234567890123'),false);
  assert.equal(validatePin('12a4'),false);
});

test('created PIN record verifies correct PIN and rejects wrong PIN',()=>{
  const record=createPinRecord('4826');
  assert.ok(record.salt);
  assert.ok(record.hash);
  assert.equal(verifyPin('4826',record.salt,record.hash),true);
  assert.equal(verifyPin('4827',record.salt,record.hash),false);
});

test('same PIN gets unique salts and hashes',()=>{
  const a=createPinRecord('4826');
  const b=createPinRecord('4826');
  assert.notEqual(a.salt,b.salt);
  assert.notEqual(a.hash,b.hash);
});
