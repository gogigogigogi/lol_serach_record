const { v4: uuidv4 } = require('uuid');
// const cookieConfig = {
//   maxAge: 1000 * 60 * 60 * 24,
//   httpOnly: true,
//   signed: true,
//   path: '/',
// };

exports.setCookie = (req, res, next) => {
  const uuid = uuidv4();
  console.log('ddd');
  res.cookie('clientId', uuid);
  res.end();
};
