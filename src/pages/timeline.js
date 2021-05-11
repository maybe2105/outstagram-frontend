import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import LoggedInUserContext from '../context/logged-in-user';
import {
  TimelineContainer,
  SkeletonContainer,
  SkeletonMargin,
} from './styles/post';
import Post from './post';
const Timeline = React.memo(({ posts }) => {
  const { user } = useContext(LoggedInUserContext);
  
  return !posts? (
    <SkeletonContainer>
    <SkeletonMargin>
      <Skeleton count={1} width={614} height={400} />
    </SkeletonMargin>
    <SkeletonMargin>
      <Skeleton count={1} width={614} height={400} />
    </SkeletonMargin>
  </SkeletonContainer>
      ) : posts.length==0 ? <p>Nothing to show</p> : (
    <TimelineContainer>
    {posts.map((content) => (
      <Post key={content._id} content={content} />
    ))}
  </TimelineContainer>
  );
});

export default Timeline;
