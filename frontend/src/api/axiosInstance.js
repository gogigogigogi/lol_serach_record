import axios from 'axios';

// axios 공통 인스턴스 생성
const searchInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 5000,
  withCredentials: true,
});

// 요청을 보내기전 실행
searchInstance.interceptors.request.use(
  (config) => {
    console.log('인터셉터', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답을 받기전 실행
searchInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { searchInstance };
