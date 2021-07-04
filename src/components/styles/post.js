import styled from 'styled-components/macro';
export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const PostContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #efefef;
  width: 614px;
  background: #fff;
  @media (min-width: 640px) {
    margin-bottom: 60px;
  }
`;
export const PostUser = styled.div`
  padding: 16px;
  display: flex;
  height: 27px;
  align-items: center;
`;
export const PostUserName = styled.p`
  margin: 0 10px;
  color: rgba(var(--f75, 38, 38, 38), 1);
  font-weight: 600;
  font-size: 14px;
`;
export const PostBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const PostImage = styled.img`
  width: 100%;
  heigth: 614px;
`;
export const PostCommentSection = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  witdth: 100%;
`;
export const Comment = styled.p`
  font-size: 14px;
  padding-left: 5px;
  overflow-wrap: break-word;
  line-height: 18px;
  color: #262626;
`;
export const PostComment = styled.div`
  display: flex;
  padding-left: 15px;
  margin-bottom: 4px;
  width: 100%;
  align-items: center;
`;
export const CommentName = styled.p`
  font-weight: 600;
  color: rgba(var(--i1d, 38, 38, 38), 1);\
  font-size: 14px;
  overflow-wrap: break-word;\
  line-height:18px;
  align-items: center;
`;
export const PostLike = styled.div`
  padding-left: 15px;
  padding-top: 12px;
  width: auto;
`;
export const LikeCount = styled.p`
  font-weight: 600;
  line-height: 18px;
  font-size: 14px;
`;
export const CaptionSection = styled.div`
  display: flex;
  padding: 12px 15px;
  width: 100%;
  align-items: center;
`;
export const PostTimeSection = styled.div`
  align-items: center;
  padding-left: 15px;
`;
export const PostTime = styled.p`
  font-size: 12px;
  margin-bottom: 4px;
  color: #8e8e8e;
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SkeletonMargin = styled.div`
  margin-bottom: 20px;
`;
export const Emoji = styled.div`
  text-align: center;
  height: auto;
  align-items: center;
  display: flex;
`;
export const UserComment = styled.div`
  border-top: 1px solid #efefef;
  display: grid;
  place-item: center;
  height: 55px;
  padding: 0px 15px;
  grid-template-columns: 6% 94%;
`;
export const UserInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: 0;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;
export const UserForm = styled.form`
  width: auto;
  display: flex;
  margin: auto 0;
`;
export const UserButton = styled.button`
  width: auto;
  font-weight: 700;
  color: #0095f6;
  float: right;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;
export const PostReact = styled.div`
  padding-left: 15px;
  padding-top: 12px;
  display: flex;

  width: auto;
  & > * {
    padding-right: 5px;
  }
`;
