import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import {
  SuggestedAvatar,
  SuggestedProfile,
  SuggestedUserName,
  SuggestedFollowButton,
  Suggestedforyou,
  SuggestWrap,
} from './styles/suggestion';
import * as api from '../api/index';

import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../context/user';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const ProfileComponent = ({
  profileDocId,
  username,
  profileId,
  avatar,
  userId,
  loggedInUserDocId,
  trigger,
  setTrigger,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const { currentUser, updateUser } = useContext(UserContext);
  const token = localStorage.getItem('token');
  const [followed, setFollowed] = useState(false);
  const updateFollowing = (followings) => {
    updateUser({ ...currentUser.user, followings: followings });
  };
  async function handleFollowUser() {
    await api
      .FollowUser(profileDocId, token)
      .then((res) => {
        console.log('before follow', currentUser);
        updateFollowing(res.data.followings);
        console.log('after follow', currentUser);
      })
      .then(() => setFollowed(true));
  }
  return !followed ? (
    <SuggestedProfile>
      <SuggestedAvatar>
        <Avatar
          onClick={() => history.push(`/${username}`)}
          className={classes.small}
          alt={username}
          src={avatar}
        />
      </SuggestedAvatar>
      <SuggestWrap>
        <SuggestedUserName>{username}</SuggestedUserName>
        <Suggestedforyou>Suggested for you</Suggestedforyou>
      </SuggestWrap>
      <SuggestedFollowButton onClick={handleFollowUser}>
        Follow
      </SuggestedFollowButton>
    </SuggestedProfile>
  ) : null;
};

SuggestedProfile.propTypes = {};

export default ProfileComponent;
