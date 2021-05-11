import * as api from '../api/index';
import axios from 'axios';
export async function getPhotos(currentUsername, followings) {
  // [5,4,2] => following
  const token = localStorage.getItem('token');

  const result = await api.getPosts(token, followings);

  const photosWithUserDetails = await Promise.all(
    result.data.map(async (post) => {
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
