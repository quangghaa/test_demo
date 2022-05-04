import { adminClient, client } from './request';

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

// Without token (jwt)

const getListNoJwt = (contentType, params) => {
  return client.get(contentType, {
    params,
  });
};

const getOneNoJwt = (contentType, id) => {
  return client.get(contentType + '/' + id);
};

const getTotalNoJwt = (contentType) => {
  return client.get(contentType);
}

const createOneNoJwt = (contentType, payload) => {
  return client.post(contentType, payload);
};

const updateOneNoJwt = (contentType, id, payload) => {
  return client.put(contentType + '/' + id, payload);
};

const deleteOneNoJwt = (contentType, id) => {
  return client.delete(contentType + '/' + id);
};


export {
  getList, getOne, createOne, updateOne, deleteOne, getTotal,
  getListNoJwt, getOneNoJwt, createOneNoJwt, updateOneNoJwt, deleteOneNoJwt, getTotalNoJwt,
};
