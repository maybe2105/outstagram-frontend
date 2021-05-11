import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import {
  SuggestedAvatar,
  SuggestedProfile,
  SuggestedUserName,
  SuggestedFollowButton,
  Suggestedforyou,
  SuggestWrap,
} from './styles/suggestion';
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollower,
} from '../services/firebase';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
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
  userId,
  loggedInUserDocId,
}) => {
  const classes = useStyles();
  const [followed, setFollowed] = useState(false);
  async function handleFollowUser() {
    setFollowed(true);
    console.log(loggedInUserDocId);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollower(profileDocId, userId, false);
    // ^ dùng để update danh sách theo dõi của người dùng đang đăng nhập hiện tại
    // v dùng để update danh sách theo dõi của đối tượng mà người dùng hiện tại đang tương tác VD: +1 follower hay -1 fx    ollower
  }
  return !followed ? (
    <SuggestedProfile>
      <SuggestedAvatar>
        <Avatar
          className={classes.small}
          alt={username}
          src={`/images/avatars/${username}.jpg`}
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
