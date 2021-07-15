const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hash(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (e) {
    return Promise.reject();
  }
}

async function validPassword(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return Promise.resolve(result);
}

module.exports = { hash, validPassword };
