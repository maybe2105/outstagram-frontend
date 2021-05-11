import axios from 'axios';
import { firebase, FieldValue } from '../context/firebase';
export const doesEmailExist = async (email) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('emailAddress', '==', email)
    .get();
  return result.docs.map((user) => user.data().length > 0).length;
};

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  const user = result.docs.map((item) => ({ ...item.data(), docId: item.id }));
  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}
export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // current user document id
  profileId, // profile that user hit the follow button
  isFollowingProfile // current user is following this profile?
) {
  console.log(loggedInUserDocId);
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}
export async function updateFollowedUserFollower(
  currentProfileDocId,
  loggedInUserDocId, // current user
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(currentProfileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

  