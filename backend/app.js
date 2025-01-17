const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const { parseCookies } = require('./util/common');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const ws = require('ws');
const app = express();
const server = http.createServer(app);
const lolRouter = require('./routes/lol');
const cookieRouter = require('./routes/cookie');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// cors 설정
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'withCredentials');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use('/cookie', cookieRouter);
app.use('/search', lolRouter);

const wss = new ws.Server({ server });
const clients = new Map();
// const items = require('./util/items.json');
// console.log('아이템 갯수는', Object.keys(items.data).length);

// 웹소켓 연결
wss.on('connection', (ws, req) => {
  // 쿠키 객체로 파싱
  const cookieObj = parseCookies(req.headers.cookie);
  console.log('쿠키는', cookieObj);
  // 쿠키가 없으면 연결 종료
  if (!cookieObj.clientId) {
    ws.close();
    return;
  }

  // 각 클라이언트 ws객체를 map에 저장 관리
  clients.set(cookieObj.clientId, ws);

  // ws객체에 닉네임 값 할당
  ws.nickname = cookieObj.clientId.slice(0, 7);

  // ip로 각 클라이언트 구분
  // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  // console.log('클라이언트 ip는 ', req.socket.remoteAddress);

  // 각 클라이언트 연결을 저장
  console.log('연결된 클라이언트 갯수는 ', clients.size);

  // 각 클라이언트와 웹소켓 연결이 될 때
  ws.send(
    JSON.stringify({
      data: '채팅방이 열렸습니다.',
      author: { sender: 'admin' },
    })
  );

  // 각 클라이언트에서 메세지가 올 때
  ws.on('message', (msg) => {
    const parsedMsg = JSON.parse(msg.toString());
    console.log(`각 클라이언트로 부터 받은 메세지는 : `, parsedMsg);
    clients.forEach((client) => {
      const sender = client.nickname === ws.nickname ? 'own' : 'other';
      client.send(
        JSON.stringify({
          ...parsedMsg,
          author: { nickname: parsedMsg.author.nickname, sender: sender },
        })
      );
    });
  });

  // 각 클라이언트의 연결이 끊어질 때
  ws.on('close', (code, reason) => {
    console.log('종료 상태코드: ', code);
    console.log('종료 이유: ', reason);
    clients.delete(cookieObj.clientId);
    console.log('연결된 클라이언트 갯수는 ', Object.keys(clients));
  });

  ws.on('error', (error) => {
    console.log('웹소켓 에러', error);
  });
});

app.use((req, res, next) => {
  next(createError(404, '찾을 수 없는 페이지입니다.'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

module.exports = { server, app };
