import { useState, useEffect } from 'react';
import { getPhotos } from '../services/services';
export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);
  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user actually follow people
      if (user?.followings?.length > 0) {
        const followedUserPhotos = await getPhotos(
          user.username,
          user.followings
        );
        // re-arrange array to be newest photos first by dateCreated
        // followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }else{
        setPhotos([]);
      }
    }

    getTimelinePhotos();
  }, [user]);
  return { photos };
}
