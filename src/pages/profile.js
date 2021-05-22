import React, { useContext, useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import {
  ProfileBody,
  ProfileContainer,
  ProfileNameContainer,
  ProfileAvatar,
  ProfileInfo,
  ListInfo,
  Info,
  ProfileName,
  FullNameContainer,
  Fullname,
  ProfileNav,
  ProfileNavContainer,
  ProfileNavItem,
  ProfileContent,
} from '../components/styles/profile';
import * as api from '../api/index';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import UserContext from '../context/user';
import ProfilePost from '../components/profilepost';
import { useParams } from 'react-router-dom';
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      marginRight: theme.spacing(2),
    },
    avatar: { width: theme.spacing(18.75), height: theme.spacing(18.75) },
  })
);
const Profile = ({ currentName }) => {
  const { id } = useParams();
  const classes = useStyles();
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const getUserPosts = async (id) => {
      try {
        const result = await api.getUserPosts(id);
        console.log('user posts', result);
        return result;
      } catch (err) {
        console.log(err);
      }
    };
    const getUser = async (id) => {
      try {
        const result = await api.getUserByUserId(id.toString());
        setUser(result.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    id == currentUser.user.username ? setUser(currentUser.user) : getUser(id);
    setPosts(getUserPosts(user?._id));
  }, [id]);
  return user ? (
    <ProfileContainer>
      <ProfileBody>
        <ProfileAvatar>
          <Avatar src={user.avatar} className={classes.avatar} />
        </ProfileAvatar>
        <ProfileInfo>
          <ProfileNameContainer>
            <ProfileName>{user.username}</ProfileName>
          </ProfileNameContainer>
          <ListInfo>
            <Info>{user.postIds?.length} bài viết</Info>
            <Info>{user.followers?.length} người theo dõi</Info>
            <Info>Đang theo dõi {user.followings?.length} người dùng</Info>
          </ListInfo>
          <FullNameContainer>
            <Fullname>{user.fullName}</Fullname>
          </FullNameContainer>
        </ProfileInfo>
      </ProfileBody>
      <ProfileContent>
        <ProfileNavContainer>
          <ProfileNav>
            <ProfileNavItem to={`/${user.username}`}>Bài viết</ProfileNavItem>
            <ProfileNavItem to={`/${user.username}/reels`}>
              Reels
            </ProfileNavItem>
            <ProfileNavItem to={`/${user.username}/tagged`}>
              Được gắn thẻ
            </ProfileNavItem>
          </ProfileNav>
        </ProfileNavContainer>
        <Route exact path='/:id'>
          <ProfilePost />
        </Route>
        <Route exact path='/:id/reels'>
          <div>render reels</div>
        </Route>
        <Route exact path='/:id/tagged'>
          <div>render tagged</div>
        </Route>
      </ProfileContent>
    </ProfileContainer>
  ) : null;
};

export default Profile;
