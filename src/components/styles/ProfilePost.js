import styled from 'styled-components/macro';
export const ProfilePostContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 28px;
`;
export const PostInfo = styled.div`
  display: none;
  position: absolute;
  z-index: 999;
  margin: auto;
  gap: 30px;
`;
export const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  &:hover {
    -webkit-filter: brightness(65%);
    transition: all 0s ease;
  }
`;
export const Post = styled.div`
  aspect-ratio: 1;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  &:hover ${PostInfo} {
    display: flex;
  }
  &:hover ${PostImg} {
    -webkit-filter: brightness(65%);
    transition: all 0s ease;
  }
`;

export const PostInfoItem = styled.div`
  display: inline-flex;
`;
export const PostInfoItemText = styled.p`
  font-weight: bold;
  padding-left: 4px;
  color: #fff;
`;
