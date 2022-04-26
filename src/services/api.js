import adminClient from './request';

const getList = (contentType, params) => {
  return adminClient.get(contentType, {
    params,
  });
};

const getOne = (contentType, id) => {
  return adminClient.get(contentType + '/' + id);
};

const getTotal = (contentType) => {
  return adminClient.get(contentType);
}

const createOne = (contentType, payload) => {
  return adminClient.post(contentType, payload);
};

const updateOne = (contentType, id, payload) => {
  return adminClient.put(contentType + '/' + id, payload);
};

const deleteOne = (contentType, id) => {
  return adminClient.delete(contentType + '/' + id);
};

// const doLoginStrapi = () => {
//   return adminClient.post('auth/local', {
//     "identifier": `${process.env.REACT_APP_STRAPI_IDENTIFY}`,
//     "password": `${process.env.REACT_APP_STRAPI_PASSWORD}`
//   });
// }

export {
  getList, getOne, createOne, updateOne, deleteOne, getTotal
};
