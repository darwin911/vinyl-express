const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "BeGoodSon";

const hash = async password => {
  return await bcrypt.hash(password, 10);
};

const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const encode = data => {
  return jwt.sign(data, SECRET);
};

const verify = token => {
  return jwt.verify(token, SECRET);
};

module.exports = {
  hash,
  compare,
  encode,
  verify
};
