import { searchInstance } from './axiosInstance';

const getCookie = () => {
  return searchInstance.get('/set-cookie');
};

const getUserRecord = (params) => {
  return searchInstance.get('/search/record', {
    params: params,
  });
};

const getRotationChamp = () => {
  return searchInstance.get('/search/rotation');
};

export { getCookie, getUserRecord, getRotationChamp };
