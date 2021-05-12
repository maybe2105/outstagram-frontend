import React, { useState, useEffect } from 'react';
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
import noImg from './styles/no-img.jpg';
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
const Post = ({ content }) => {
  const [post, setPost] = useState(content);
  const classes = useStyles();
  const timeCreated = formatDistance(new Date(), new Date(content.createAt));
  const token = localStorage.getItem('token');
  const handlePostComment = () => {};
  const handleReact = async () => {
    const res = await api.PostReact(post._id, token);
    setPost({ ...res.data.post, userLikedPhoto: !post.userLikedPhoto });
  };
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    const getAvatar = async (userid) => {
      try {
        const result = await api.getUserAvatar(userid);
        result.avatar === '' ? setAvatar(noImg) : setAvatar(result.avatar);
      } catch (err) {}
    };
    getAvatar(content.userId);
  }, [content]);
  return (
    <PostContainer>
      <PostUser>
        <Avatar alt='avatar' className={classes.small} src={avatar} />
        <PostUserName>{content.username}</PostUserName>
      </PostUser>
      <PostBody>
        <PostImage src={post.photoSrcs[0]} atl={post.username} />
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
          <CommentName>{post.username}</CommentName>
          <Comment>{post.captions}</Comment>
        </CaptionSection>
        <PostCommentSection>
          {post.comments.map((item, index) => {
            return (
              <CommentComponent
                key={index}
                username={item.displayName}
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
          <UserInput type='text' />
          <UserButton onClick={() => handlePostComment()}>Đăng</UserButton>
        </UserForm>
      </UserComment>
    </PostContainer>
  );
};

export default Post;
