import axios from 'axios';
const API = axios.create({ baseURL: 'http://192.168.30.194:3000/' });
export const login = async (email, password) =>
  await API.post('/account/signin', { email, password });
export const getAuthUser = async (authToken) => {
  await API.post('/account/auth', { authToken });
};
export const logOut = async () => {
  await API.get('/account/signout');
};
export const signUp = async (user) => {
  const result = API.post('/account/signup',{user});
  return result;
}
// prettier-ignore
export const getPosts = async (token, followings) => {
  const result = await API.get(
    '/posts',
    { headers: { 'authorization': 'Bearer '.concat(token) ,
       'followings':followings} }
  );
  return result;
};
export const getUserByUserId = async (userId) => {
  const url = '/' + userId;
  const result = await API.get(url);
  return result;
};
// prettier-ignore
export const PostReact = async (postId, token) => {
  console.log('Bearer '.concat(token));
  const result = await API.put('/p/' + postId + '/react', {},
  { headers: { 'authorization': 'Bearer '.concat(token)} });
  return result;
};

export const SuggestProfile = async (followings,token) =>{
  const result = await API.get(
    '/suggest',
    { headers: { 'authorization': 'Bearer '.concat(token) ,
       'followings':followings} }
  );
  return result;
}