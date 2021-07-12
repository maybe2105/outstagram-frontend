import { IconButton, Link } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {
  SidebarContainer,
  SidebarAvatar,
  SidebarUser,
  SidebarUserName,
  SidebarUserFullname,
  SidebarName,
} from './styles/sidebar';
import * as api from '../api/index';
import Suggestion from './suggestion';
import LoggedInUserContext from '../context/logged-in-user';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user';
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const Sidebar = ({ username }) => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const history = useHistory();
  useEffect(() => {
    const getUser = async (username) => {
      try {
        const result = await api.getUserByUserId(username);
        console.log('navbar result', result);
        setUser(result.data);
      } catch (err) {
        setUser(null);
      }
    };
    getUser(username);
  }, []);
  console.log(user);
  return user ? (
    <SidebarContainer>
      <SidebarUser>
        <SidebarAvatar>
          <IconButton onClick={() => history.push(`/${user.username}`)}>
            <Avatar
              alt={user.displayName}
              className={classes.large}
              src={user.avatar}
            />
          </IconButton>
        </SidebarAvatar>
        <SidebarName>
          <SidebarUserName>{user.username}</SidebarUserName>
          <SidebarUserFullname>{user.fullName}</SidebarUserFullname>
        </SidebarName>
      </SidebarUser>
      <Suggestion
        userId={user._id}
        following={user.followings}
        loggedInUserDocId={user.docId}
      />
    </SidebarContainer>
  ) : null;
};

export default Sidebar;
