const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const { parseCookies } = require('./util/common');
const express = require('express');
const http = require('http');
const ws = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

// const clients = {};
const clients = new Map();

wss.on('connection', (ws, req) => {
  console.log('websocket connected');

  // 쿠키 객체로 파싱
  const cookieObj = parseCookies(req.headers.cookie);

  // 쿠키가 없으면 연결 종료
  if (!Object.keys(cookieObj).length) {
    ws.close();
    return;
  }

  // 각 클라이언트 ws객체를 객체에 저장 관리
  // clients[cookieObj.clientId] = ws;
  clients.set(cookieObj.clientId, ws);
  console.log('clients는', clients);

  // ip로 각 클라이언트 구분
  // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  // console.log('클라이언트 ip는 ', req.socket.remoteAddress);

  // 각 클라이언트 연결을 저장
  console.log('연결된 클라이언트 갯수는 ', clients.size);

  // 각 클라이언트와 웹소켓 연결이 될 때
  ws.send('hello, websocket connected!');

  // 각 클라이언트에서 메세지가 올 때
  ws.on('message', (msg) => {
    console.log(`각 클라이언트로 부터 받은 메세지는 : ${msg}`);
    clients.forEach((client) => {
      client.send(`${msg}`);
    });
  });

  // 각 클라이언트의 연결이 끊어질 때
  ws.on('close', (code, reason) => {
    console.log('종료 상태코드: ', code);
    console.log('종료 이유: ', reason);
    // delete clients[cookieObj.clientId];
    clients.delete(cookieObj.clientId);
    console.log('연결된 클라이언트 갯수는 ', Object.keys(clients));
  });
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const lolRouter = require('./routes/lol');

dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', lolRouter);

app.use((req, res, next) => {
  next(createError(404, '찾을 수 없는 페이지입니다.'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = { server, app };
