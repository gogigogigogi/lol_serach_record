import { searchInstance } from './axiosInstance';

const getCookie = () => {
  return searchInstance.get('/cookie/set');
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
