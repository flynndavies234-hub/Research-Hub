const crypto=require('crypto');

const PIN_PATTERN=/^\d{4,12}$/;

function normalizePin(pin){
  return String(pin??'').trim();
}

function validatePin(pin){
  return PIN_PATTERN.test(normalizePin(pin));
}

function hashPin(pin,saltBase64){
  const value=normalizePin(pin);
  if(!validatePin(value)) throw new Error('PIN must contain 4 to 12 digits.');
  if(!saltBase64) throw new Error('PIN salt is required.');
  return crypto.scryptSync(value,Buffer.from(saltBase64,'base64'),32);
}

function createPinRecord(pin){
  const value=normalizePin(pin);
  if(!validatePin(value)) throw new Error('PIN must contain 4 to 12 digits.');
  const salt=crypto.randomBytes(16).toString('base64');
  return {salt,hash:hashPin(value,salt).toString('base64')};
}

function verifyPin(pin,saltBase64,hashBase64){
  try{
    if(!saltBase64||!hashBase64||!validatePin(pin)) return false;
    const actual=hashPin(pin,saltBase64);
    const expected=Buffer.from(hashBase64,'base64');
    return actual.length===expected.length&&crypto.timingSafeEqual(actual,expected);
  }catch{
    return false;
  }
}

module.exports={PIN_PATTERN,normalizePin,validatePin,hashPin,createPinRecord,verifyPin};
