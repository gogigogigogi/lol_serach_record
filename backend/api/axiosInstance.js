const axios = require('axios');

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept-Language': 'ko,ko-KR;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
  'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
  Origin: process.env.BACKEND_URL,
  'X-Riot-Token': process.env.DEV_API_Key,
};

// axios 공통 인스턴스 생성
const lolBaseInstance = axios.create({
  headers: headers,
  timeout: 50000,
});

// 요청을 보내기전 실행
lolBaseInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답을 받기전 실행
lolBaseInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

exports.lolBaseInstance = lolBaseInstance;
