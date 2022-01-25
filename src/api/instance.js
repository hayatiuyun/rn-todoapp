import axios from 'axios';
// const instance = axios.create({
//   baseURL: process.env.BASEURL_BACKEND,
// });

const API = axios.create({baseURL: 'https://pretty-deer-35.loca.lt/'});

API.interceptors.request.use(req => {
  console.log('req', req);
  return req;
});

export default API;
