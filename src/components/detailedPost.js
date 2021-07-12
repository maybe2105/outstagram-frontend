import {
  AppBar,
  Avatar,
  Container,
  Dialog,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext, useEffect, useState } from 'react';
import * as api from '../api/index';
import {
  Emoji,
  LikeCount,
  PostLike,
  PostReact,
  UserButton,
  UserComment,
  UserForm,
  UserInput,
} from './styles/post';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import LoggedInUserContext from '../context/logged-in-user';
import UserContext from '../context/user';
import { set } from 'date-fns';
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    height: 40,
    display: 'flex',
    background: '#fafafa',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  toolbar: { minHeight: 40 },
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
  },
  imageContainer: {
    display: 'flex',
    background: 'black',
    width: '70%',
    placeContent: 'center center',
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height: 'auto',
  },
  contentContainer: {
    width: '30%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
    background: '#fafafa',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  reactBtn: {
    margin: 0,
    padding: 0,
  },
  commentContainer: {
    display: 'flex',
    marginLeft: 16,
    marginTop: 12,
    flexDirection: 'column',
  },
}));

const DetailedPost = ({ open, handleClose, transition, selectedPostId }) => {
  const classes = useStyles();
  const [user, setUser] = useState('');
  const [userLikedPhoto, setUserLikedPhoto] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [comment, setComment] = useState('');
  const [postComments, setPostComments] = useState([]);
  const token = localStorage.getItem('token');
  const loggedContext = useContext(LoggedInUserContext);
  const [selectedPost, setSelectedPost] = useState({});
  useEffect(() => {
    const getUser = async (userId) => {
      const { data } = await api.getUserByUserId(userId);

      setUser(data);
    };
    const getPost = async (id) => {
      console.log(id);
      const result = await api.getPost(id);
      setSelectedPost(result.data);
      getUser(result.data.userId);
      setPostComments(result.data.comments);

      if (result.data?.reacts?.includes(currentUser.user.username)) {
        setUserLikedPhoto(true);
      } else {
        setUserLikedPhoto(false);
      }
      if (selectedPost?.reacts?.includes(currentUser.user.username)) {
        setUserLikedPhoto(true);
      } else {
        setUserLikedPhoto(false);
      }
      //   setSelectedPost(data);
    };
    getPost(selectedPostId);
  }, [selectedPostId, userLikedPhoto]);
  const handleReact = async () => {
    const res = await api.PostReact(selectedPost._id, token);
    console.log(res);
    setUserLikedPhoto(!userLikedPhoto);
  };
  const handlePostComment = async (event) => {
    event.preventDefault();
    console.log('aaaaaaaaaaaa');
    const res = await api.postComment(selectedPost._id, comment, token);
    console.log(postComments);
    const newComment = {
      username: currentUser.user.username,
      comment: comment,
    };
    setPostComments([...postComments, newComment]);
    setComment('');
  };
  const handleComment = (event) => {
    setComment(event.target.value);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={transition}
    >
      <AppBar className={classes.appBar} color='primary'>
        <Toolbar className={classes.toolbar}>
          <IconButton color='black' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img
            className={classes.image}
            src={selectedPost?.photoSrcs ? selectedPost?.photoSrcs[0] : ''}
            alt='post img'
          />
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.userInfo}>
            <IconButton color='black' onClick={handleClose} aria-label='close'>
              <Avatar src={user?.avatar} />
            </IconButton>
            <Typography style={{ fontWeight: 600, marginLeft: 8 }}>
              {user?.username}
            </Typography>
          </div>
          <Typography style={{ marginLeft: 16 }}>
            {selectedPost?.captions}
          </Typography>
          <div>
            <PostReact style={{ alignItems: 'center' }}>
              <IconButton
                onClick={() => {
                  handleReact();
                  loggedContext.handleUpdate();
                }}
                color='inherit'
                className={classes.reactBtn}
              >
                {userLikedPhoto ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <PostLike style={{ marginLeft: 4, padding: 0, marginRight: 8 }}>
                <LikeCount>
                  {selectedPost?.reacts?.length}{' '}
                  {selectedPost?.reacts?.length > 1 ? 'likes' : 'like'}
                </LikeCount>
              </PostLike>
              <ChatBubbleOutlineOutlinedIcon />
              <PostLike style={{ marginLeft: 4, padding: 0, marginRight: 8 }}>
                <LikeCount>
                  {selectedPost?.comments?.length}{' '}
                  {selectedPost?.comments?.length > 1 ? 'comments' : 'comment'}
                </LikeCount>
              </PostLike>
            </PostReact>
          </div>
          <UserComment style={{ marginTop: 12 }}>
            <Emoji>
              <SentimentSatisfiedOutlinedIcon />
            </Emoji>
            <UserForm>
              <UserInput type='text' value={comment} onChange={handleComment} />
              <UserButton
                onClick={(event) => {
                  handlePostComment(event);
                  loggedContext.handleUpdate();
                }}
              >
                Comment
              </UserButton>
            </UserForm>
          </UserComment>
          <div className={classes.commentContainer}>
            {postComments?.map((comment) => {
              return (
                <div style={{ display: 'flex' }}>
                  <Typography
                    style={{
                      fontWeight: 600,
                      marginRight: 8,
                      fontSize: 14,
                      marginTop: 3,
                    }}
                  >
                    {comment.username}
                  </Typography>
                  <Typography style={{ fontSize: 14, marginTop: 3 }}>
                    {comment.comment}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DetailedPost;
