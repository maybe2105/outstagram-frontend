import React from 'react';
import {
  PostCommentSection,
  PostComment,
  CommentName,
  Comment,
} from './styles/post';
const CommentComponent = ({ username, comment }) => {
  return (
    <PostComment>
      <CommentName>{username}</CommentName>
      <Comment>{comment}</Comment>
    </PostComment>
  );
};

export default CommentComponent;
