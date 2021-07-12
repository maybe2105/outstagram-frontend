import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import {
  TimelineContainer,
  SkeletonContainer,
  SkeletonMargin,
} from './styles/post';
import Post from './post';
import DetailedPost from './detailedPost';
import { Slide } from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Timeline = React.memo(({ posts, handleUpdate }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [openPost, setOpenPost] = useState(false);
  const onClickPost = (post) => {
    console.log('post Id', post._id);
    setSelectedPost(post._id);
    setOpenPost(true);
  };
  const handleClosePost = () => {
    setSelectedPost(null);
    setOpenPost(false);
  };

  return !posts ? (
    <SkeletonContainer>
      <SkeletonMargin>
        <Skeleton count={1} width={614} height={400} />
      </SkeletonMargin>
      <SkeletonMargin>
        <Skeleton count={1} width={614} height={400} />
      </SkeletonMargin>
    </SkeletonContainer>
  ) : posts.length === 0 ? (
    <p style={{ width: 614 }}>Hãy theo dõi người khác để bắt đầu xem ảnh</p>
  ) : (
    <>
      <TimelineContainer>
        {posts.map((content) => (
          <Post key={content._id} content={content} onClickPost={onClickPost} />
        ))}
      </TimelineContainer>
      {openPost && (
        <DetailedPost
          open={openPost}
          handleClose={handleClosePost}
          selectedPostId={selectedPost}
          transition={Transition}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
});

export default Timeline;
