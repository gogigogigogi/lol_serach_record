import { searchInstance } from './axiosInstance';

const getPuuid = (params) => {
  return searchInstance.get('/search', {
    params: params,
  });
};

const getRotationChamp = () => {
  return searchInstance.get('/search/rotation');
};

export { getPuuid, getRotationChamp };
