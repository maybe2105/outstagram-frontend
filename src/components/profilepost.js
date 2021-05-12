import React from 'react';
import {
  Post,
  PostImg,
  ProfilePostContainer,
  PostInfo,
  PostInfoItem,
  PostInfoItemText,
} from './styles/ProfilePost';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import { createStyles, makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      marginRight: theme.spacing(2),
    },
    normal: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      color: '#fff',
    },
  })
);
const ProfilePost = ({ posts }) => {
  const classes = useStyles();
  return (
    <ProfilePostContainer>
      <Post>
        <PostImg
          src='https://miodatos.com/wp-content/uploads/2016/10/top-secret-file.jpg'
          alt='img'
        />
        <PostInfo>
          <PostInfoItem>
            <FavoriteIcon className={classes.normal} />
            <PostInfoItemText>1234</PostInfoItemText>
          </PostInfoItem>
          <PostInfoItem>
            <ModeCommentIcon className={classes.normal} />
            <PostInfoItemText>4321</PostInfoItemText>
          </PostInfoItem>
        </PostInfo>
      </Post>
      <Post>
        <PostImg
          src='https://miodatos.com/wp-content/uploads/2016/10/top-secret-file.jpg'
          alt='img'
        />
        <PostInfo>
          <PostInfoItem>
            <FavoriteIcon className={classes.normal} />
            <PostInfoItemText>1234</PostInfoItemText>
          </PostInfoItem>
          <PostInfoItem>
            <ModeCommentIcon className={classes.normal} />
            <PostInfoItemText>4321</PostInfoItemText>
          </PostInfoItem>
        </PostInfo>
      </Post>
      <Post>
        <PostImg
          src='https://miodatos.com/wp-content/uploads/2016/10/top-secret-file.jpg'
          alt='img'
        />
        <PostInfo>
          <PostInfoItem>
            <FavoriteIcon className={classes.normal} />
            <PostInfoItemText>1234</PostInfoItemText>
          </PostInfoItem>
          <PostInfoItem>
            <ModeCommentIcon className={classes.normal} />
            <PostInfoItemText>4321</PostInfoItemText>
          </PostInfoItem>
        </PostInfo>
      </Post>
      <Post>
        <PostImg
          src='https://miodatos.com/wp-content/uploads/2016/10/top-secret-file.jpg'
          alt='img'
        />
        <PostInfo>
          <PostInfoItem>
            <FavoriteIcon className={classes.normal} />
            <PostInfoItemText>1234</PostInfoItemText>
          </PostInfoItem>
          <PostInfoItem>
            <ModeCommentIcon className={classes.normal} />
            <PostInfoItemText>4321</PostInfoItemText>
          </PostInfoItem>
        </PostInfo>
      </Post>
      <Post>
        <PostImg
          src='https://miodatos.com/wp-content/uploads/2016/10/top-secret-file.jpg'
          alt='img'
        />
        <PostInfo>
          <PostInfoItem>
            <FavoriteIcon className={classes.normal} />
            <PostInfoItemText>1234</PostInfoItemText>
          </PostInfoItem>
          <PostInfoItem>
            <ModeCommentIcon className={classes.normal} />
            <PostInfoItemText>4321</PostInfoItemText>
          </PostInfoItem>
        </PostInfo>
      </Post>
      <Post>
        <PostImg
          src='https://miodatos.com/wp-content/uploads/2016/10/top-secret-file.jpg'
          alt='img'
        />
        <PostInfo>
          <PostInfoItem>
            <FavoriteIcon className={classes.normal} />
            <PostInfoItemText>1234</PostInfoItemText>
          </PostInfoItem>
          <PostInfoItem>
            <ModeCommentIcon className={classes.normal} />
            <PostInfoItemText>4321</PostInfoItemText>
          </PostInfoItem>
        </PostInfo>
      </Post>
      <Post>
        <PostImg
          src='https://miodatos.com/wp-content/uploads/2016/10/top-secret-file.jpg'
          alt='img'
        />
        <PostInfo>
          <PostInfoItem>
            <FavoriteIcon className={classes.normal} />
            <PostInfoItemText>1234</PostInfoItemText>
          </PostInfoItem>
          <PostInfoItem>
            <ModeCommentIcon className={classes.normal} />
            <PostInfoItemText>4321</PostInfoItemText>
          </PostInfoItem>
        </PostInfo>
      </Post>
    </ProfilePostContainer>
  );
};

export default ProfilePost;
