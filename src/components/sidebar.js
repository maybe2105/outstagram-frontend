import { IconButton } from '@material-ui/core';
import React, { useContext } from 'react';
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
import Suggestion from './suggestion';
import LoggedInUserContext from '../context/logged-in-user';
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
const Sidebar = () => {
  const classes = useStyles();
  const { user } = useContext(LoggedInUserContext);
  return user ? (
    <SidebarContainer>
      <SidebarUser>
        <SidebarAvatar>
          <IconButton>
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
