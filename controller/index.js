const { v4: uuidv4 } = require('uuid');
// const cookieConfig = {
//   maxAge: 1000 * 60 * 60 * 24,
//   httpOnly: true,
//   signed: true,
//   path: '/',
// };

exports.renderIndex = (req, res, next) => {
  const uuid = uuidv4();
  res.cookie('clientId', uuid);
  res.render('index', { title: 'LOL 전적 검색' });
};
