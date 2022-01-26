import axios from 'axios';
// const instance = axios.create({
//   baseURL: process.env.BASEURL_BACKEND,
// });

const API = axios.create({
  baseURL: 'https://todoapp-reactnative.herokuapp.com',
});

API.interceptors.request.use(req => {
  //   console.log('req', req);
  return req;
});

export const getTodo = page => API.get('/ToDo/' + page);
export const editTodo = (id, data) => API.put('ToDo/' + id, data);
export const postTodo = data => API.post('ToDo', data);
export const deleteTodo = id => API.delete('ToDo/' + id);
