import React, { useState, useEffect, useContext } from 'react';
import {
  PostContainer,
  PostUser,
  PostUserName,
  PostBody,
  PostCommentSection,
  PostTimeSection,
  PostTime,
  PostImage,
  LikeCount,
  UserComment,
  UserInput,
  Emoji,
  UserForm,
  Comment,
  CaptionSection,
  PostLike,
  CommentName,
  UserButton,
  PostReact,
} from './styles/post';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import { formatDistance } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import CommentComponent from '../components/comment';
import * as api from '../api/index';
import { useHistory } from 'react-router-dom';
import LoggedInUserContext from '../context/logged-in-user';
import UserContext from '../context/user';
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  commentAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  reactBtn: {
    margin: 0,
    padding: 0,
  },
}));
const Post = ({ content, onClickPost }) => {
  const history = useHistory();
  const [post, setPost] = useState(content);
  const [comment, setComment] = useState('');
  const classes = useStyles();
  const { currentUser } = useContext(UserContext);
  const loggedContext = useContext(LoggedInUserContext);
  const timeCreated = formatDistance(new Date(), new Date(content.createAt));
  const token = localStorage.getItem('token');
  const [postComments, setPostComments] = useState([]);
  const [postUsername, setPostUsername] = useState(content.username);
  useEffect(() => {
    setPostComments(content?.comments);
  }, [content]);

  const handlePostComment = async (event) => {
    event.preventDefault();
    const res = await api.postComment(post._id, comment, token);
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
  const handleReact = async () => {
    const res = await api.PostReact(post._id, token);
    console.log('handleReact', res);
    setPost({ ...res.data.post, userLikedPhoto: !post.userLikedPhoto });
    console.log('captions', post.username);
    loggedContext.handleUpdate();
  };
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    const getAvatar = async (userid) => {
      try {
        const result = await api.getUserAvatar(userid);
        result.avatar === ''
          ? setAvatar(process.env.PUBLIC_URL + 'no-img.jpg')
          : setAvatar(result.avatar);
        setPostUsername(result.data.username);
      } catch (err) {}
    };
    getAvatar(content.userId);
  }, [content]);
  return (
    <PostContainer>
      <PostUser>
        <IconButton onClick={() => history.push(`/${content.username}`)}>
          <Avatar alt='avatar' className={classes.small} src={avatar} />
        </IconButton>
        <PostUserName>{content.username}</PostUserName>
      </PostUser>
      <PostBody>
        <PostImage
          onClick={() => onClickPost(content)}
          src={post.photoSrcs[0]}
          atl={post.username}
        />
        <PostReact>
          <IconButton
            color='inherit'
            className={classes.reactBtn}
            onClick={handleReact}
          >
            {post.userLikedPhoto ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <ChatBubbleOutlineOutlinedIcon />
        </PostReact>
        <PostLike>
          <LikeCount>
            {post.reacts.length} {post.reacts.length > 1 ? 'likes' : 'like'}
          </LikeCount>
        </PostLike>
        <CaptionSection>
          <CommentName>{postUsername}</CommentName>
          <Comment>{post.captions}</Comment>
        </CaptionSection>
        <PostCommentSection>
          {postComments.map((item, index) => {
            return (
              <CommentComponent
                key={index}
                username={item.username}
                comment={item.comment}
              />
            );
          })}
        </PostCommentSection>
        <PostTimeSection>
          <PostTime>{timeCreated}</PostTime>
        </PostTimeSection>
      </PostBody>
      <UserComment>
        <Emoji>
          <SentimentSatisfiedOutlinedIcon />
        </Emoji>
        <UserForm>
          <UserInput
            type='text'
            value={comment}
            onChange={(event) => handleComment(event)}
          />
          <UserButton onClick={(event) => handlePostComment(event)}>
            Comment
          </UserButton>
        </UserForm>
      </UserComment>
    </PostContainer>
  );
};

export default Post;
