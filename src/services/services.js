import * as api from '../api/index';
export async function getPhotos(currentUsername, followings) {
  // [5,4,2] => following
  const token = localStorage.getItem('token');
  let result = [];
  try {
    result = await api.getPosts(token, followings);
  } catch (e) {
    console.log('jwt expired');
  }

  const photosWithUserDetails = await Promise.all(
    result?.data.map(async (post) => {
      let userLikedPhoto = false;
      if (post.reacts.includes(currentUsername)) {
        userLikedPhoto = true;
      }
      const { data } = await api.getUserByUserId(post.userId);
      const { username } = data;
      return { username, ...post, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}
