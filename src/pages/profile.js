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
import Slide from '@material-ui/core/Slide';
import * as api from '../api/index';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import UserContext from '../context/user';
import ProfilePost from '../components/profilepost';
import { useParams } from 'react-router-dom';
import DetailedPost from '../components/detailedPost';
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      marginRight: theme.spacing(2),
    },
    avatar: { width: theme.spacing(18.75), height: theme.spacing(18.75) },
  })
);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AddPostDialog = ({
  open,
  Transition,
  handleClose,
  handleCaption,
  handleSelectfile,
  handleSubmit,
  transition,
  message,
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={transition}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>
        Pick your image and write caption
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <input type='file' onChange={handleSelectfile} />
          <TextField
            style={{ marginTop: 16 }}
            onChange={handleCaption}
            autoFocus
            margin='dense'
            id='caption'
            label='Caption'
            type='text'
            fullWidth
          />

          <Button
            variant='outlined'
            color='primary'
            style={{
              padding: 4,
              marginTop: 16,
              marginBottom: 8,
            }}
            type='submit'
          >
            Post
          </Button>
        </form>
        {loading ? (
          <Typography>Posting...</Typography>
        ) : (
          <Typography>{message}</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};
const ChangeAvatarDialog = ({
  open,
  Transition,
  handleClose,
  handleCaption,
  handleSelectfile,
  handleSubmit,
  transition,
  message,
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={transition}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Pick your image</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <input type='file' onChange={handleSelectfile} />
          <br />
          <Button
            variant='outlined'
            color='primary'
            style={{
              padding: 4,
              marginTop: 16,
              marginBottom: 8,
            }}
            type='submit'
          >
            Change Avatar
          </Button>
        </form>
        {loading ? (
          <Typography>Posting...</Typography>
        ) : (
          <Typography>{message}</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};
const Profile = ({ currentName, handleUpdate }) => {
  const { id } = useParams();
  const classes = useStyles();
  const {
    currentUser,
    updateUser,
    user: contextuser,
    setUser: SetContextUser,
  } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [err, setErr] = useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [openPost, setOpenPost] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState('');
  const [followings, setFollowings] = useState(currentUser.user.followings);

  const handleCloseAvatar = () => {
    setOpenAvatar(false);
    setMessage('');
  };
  const handleOpenAvatar = () => {
    setOpenAvatar(true);
  };

  const token = localStorage.getItem('token');
  const handleFollow = async (targetId) => {
    try {
      const result = await api.FollowUser(targetId, token);
      console.log(result);
      setFollowings(result.data.followings);
      console.log(result.data.followings.includes(user._id));
      updateUser({ ...currentUser.user, followings: result.data.followings });
      console.log(currentUser.user);
    } catch (err) {}
  };
  const onClickPost = (post) => {
    setSelectedPost(post._id);
    setOpenPost(true);
  };
  const handleSelectedAvatar = (event) => {
    setSelectedAvatar(event.target.files[0]);
  };
  const handleSubmitAvatar = async (event) => {
    event.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append('photo', selectedAvatar);
    try {
      if (selectedAvatar != null) {
        const result = await api.changeAvatar(formData, token);
        setMessage(result.data.message);
        setLoading(false);
        console.log('result', URL.createObjectURL(selectedAvatar));
        setAvatarSrc(URL.createObjectURL(selectedAvatar));
        setUser(result.data?.user);
        setSelectedAvatar(null);
        handleUpdate();
        setMessage('');
      } else {
        setMessage('please choose avatar');
      }
    } catch (error) {
      setMessage(error?.response?.data);
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append('captions', caption);
    formData.append('photos', selectedFile);
    try {
      const { data } = await api.postPhoto(formData, token);
      setMessage('Thành công!');
      setPosts([...posts, data]);
      setLoading(false);
      setSelectedFile(null);
      setCaption('');
    } catch (error) {
      console.log(error.response);
      setMessage(error.response.data);
      setLoading(false);
    }
  };
  const handleCaption = (event) => {
    setCaption(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
    setMessage('');
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSelectfile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    setOpenPost(false);
  };

  useEffect(() => {
    const getUser = async (id) => {
      try {
        const result = await api.getUserByUserId(id.toString());
        setUser(result.data);
        setPosts(result.data.postList);
        setAvatarSrc(result.data.avatar);
      } catch (err) {
        setUser(null);
        setErr('Người dùng không tồn tại');
      }
    };
    getUser(id);
  }, [id, avatarSrc, followings]);
  return user ? (
    <ProfileContainer>
      <ProfileBody>
        <ProfileAvatar>
          <IconButton onClick={handleOpenAvatar}>
            <Avatar src={avatarSrc} className={classes.avatar} />
          </IconButton>
        </ProfileAvatar>
        <ProfileInfo>
          <ProfileNameContainer>
            <ProfileName>{user.username}</ProfileName>
            {user.username != currentUser.user.username && (
              <Button
                onClick={() => handleFollow(user._id)}
                style={{
                  fontSize: 14,
                  color: '#0095f6',
                  alignItems: 'end',
                  marginTop: 6,
                  marginLeft: 16,
                  textTransform: 'none',
                }}
              >
                {followings.includes(user._id) ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </ProfileNameContainer>
          <ListInfo>
            <Info>{user.postIds?.length} posts</Info>
            <Info>{user.followers?.length} followers</Info>
            <Info>Following {user.followings?.length} users</Info>
          </ListInfo>
          <FullNameContainer>
            <Fullname>{user.fullName}</Fullname>
          </FullNameContainer>
        </ProfileInfo>
      </ProfileBody>
      <ProfileContent>
        <ProfileNavContainer>
          <ProfileNav>
            {id == currentUser.user.username ? (
              <ProfileNavItem onClick={handleClickOpen}>
                Add Post
              </ProfileNavItem>
            ) : (
              <ProfileNavItem>Posts</ProfileNavItem>
            )}

            <AddPostDialog
              transition={Transition}
              open={open}
              handleClose={handleClose}
              handleCaption={handleCaption}
              handleSelectfile={handleSelectfile}
              handleSubmit={handleSubmit}
              loading={loading}
              message={message}
            />
          </ProfileNav>
          {openPost && (
            <DetailedPost
              open={openPost}
              handleClose={handleClosePost}
              selectedPostId={selectedPost}
              transition={Transition}
            />
          )}
          {openAvatar && currentUser.user.username == user.username && (
            <ChangeAvatarDialog
              open={openAvatar}
              handleClose={handleCloseAvatar}
              transition={Transition}
              loading={loading}
              message={message}
              handleSelectfile={handleSelectedAvatar}
              handleSubmit={handleSubmitAvatar}
            />
          )}
        </ProfileNavContainer>
        <Route exact path='/:id'>
          <ProfilePost posts={posts} onClickPost={onClickPost} />
        </Route>
      </ProfileContent>
    </ProfileContainer>
  ) : (
    <p>{err}</p>
  );
};

export default Profile;
