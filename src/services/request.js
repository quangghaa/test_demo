import axios from 'axios';


const adminClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

const getAuthorization = () => {
  return localStorage.getItem('jwt')
    ? `Bearer ${localStorage.getItem('jwt')}`
    : '';
};

const requestInterceptor = (request) => {
  request.headers.Authorization = getAuthorization();
  return request;
};

const responseSuccessInterceptor = (response) => {
  return response;
};


const clients = [adminClient];
const normalClients = [client];

clients.forEach(client => {
  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(
    responseSuccessInterceptor
  );
});

normalClients.forEach(client => {
  client.interceptors.response.use(
    responseSuccessInterceptor
  );
})



export { adminClient, client };
