import { useState, useEffect, useContext } from 'react';
import { getPhotos } from '../services/services';
import { useHistory } from 'react-router-dom';
import * as ROUTE from '../constants/route';
import UserContext from '../context/user';
export default function usePost(user, updated) {
  const { updateUser } = useContext(UserContext);

  const [photos, setPhotos] = useState(null);
  const history = useHistory();
  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user actually follow people
      if (user?.followings?.length > 0) {
        try {
          const followedUserPhotos = await getPhotos(
            user.username,
            user.followings
          );

          // re-arrange array to be newest photos first by dateCreated
          if (followedUserPhotos?.length > 0) {
            followedUserPhotos.sort(
              (a, b) => b.createAt.toString() - a.createAt.toString()
            );
          }
          setPhotos(followedUserPhotos);
        } catch (err) {
          if (err.response?.status === 401) {
            console.log('Unauthorized');
            localStorage.removeItem('loggedInUser');
            updateUser(null);
            history.push('/login');
          }

          console.log(err);
        }
      } else {
        setPhotos([]);
      }
    }

    getTimelinePhotos();
  }, [user, updateUser, updated]);
  return { photos };
}
