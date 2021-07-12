import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4000/' });
export const login = async (email, password) =>
  await API.post('/account/signin', { email, password });
export const getAuthUser = async (authToken) => {
  await API.post('/account/auth', { authToken });
};
export const logOut = async () => {
  await API.get('/account/signout');
};
export const signUp = async (user) => {
  const result = API.post('/account/signup', { user });
  return result;
};
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
export const getUserAvatar = async (userId) => {
  const url = '/' + userId;
  const result = await API.get(url);
  return result.data;
};
// prettier-ignore
export const PostReact = async (postId, token) => {
  const result = await API.put('/p/' + postId + '/react', {},
  { headers: { 'authorization': 'Bearer '.concat(token)} });
  return result;
};

export const SuggestProfile = async (followings, token) => {
  const result = await API.get('/suggest', {
    headers: { authorization: 'Bearer '.concat(token), followings: followings },
  });
  return result;
};
//prettier-ingore
export const FollowUser = async (targetId, token) => {
  return await API.put(
    '/account/follow',
    { targetId: targetId },
    {
      headers: { authorization: 'Bearer '.concat(token) },
    }
  );
};
export const getUserPosts = async (userId) => {
  const url = '/p/' + userId;
  const result = await API.get(url);
  console.log(result);
};
// prettier-ignore
export const postComment = async (postId, comment, token) => {
  const url = '/p/' + postId + '/comment';

  const result = await API.put(
    url,
    { comment },
    { headers: { authorization: 'Bearer '.concat(token) } }
  );
  return result;
};

export const postPhoto = async (formData, token) => {
  const url = '/p/create';
  const result = await API.post(url, formData, {
    headers: { authorization: 'Bearer '.concat(token) },
  });
  console.log(result);
  return result;
};
export const getPost = async (id) => {
  const url = '/p/' + id;
  const result = await API.get(url, { id: id });
  return result;
};
export const changeAvatar = async (formData, token) => {
  const url = '/account/change-avatar';
  const result = await API.put(url, formData, {
    headers: { authorization: 'Bearer '.concat(token) },
  });
  console.log(result);
  return result;
};

export const searchChange = async (param) => {
  const result = await API.get('/account/search', {
    params: {
      keyword: param,
    },
  });
  return result;
};
