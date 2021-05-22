import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
export const ProfileContainer = styled.div`
  padding-top: 54px;
  display: flex;
  width: 935px;
  margin: auto;
  flex-direction: column;
`;
export const ProfileBody = styled.div`
  width: 100%;

  display: flex;
  margin-bottom: 44px;
  padding: 30px 20px 0;
`;
export const ProfileAvatar = styled.div`
  display: flex;
  width: 33%;
  justify-content: center;
  margin-right: 25px;
`;
export const ProfileInfo = styled.div`
  display: flex;
  width: 67%;
  overflow: hidden;
  flex-direction: column;
`;
export const ProfileNameContainer = styled.div`
  display: flex;
  height: 32px;
  flex-shrink: 1;
  align-items: center;
  vertical-align: text-bottom;
  margin-bottom: 20px;
`;

export const ProfileName = styled.h2`
  margin: -5px 0 -6px;
  line-height: 32px;
  font-weight: 300;

  font-size: 28px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const ListInfo = styled.ul`
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
`;
export const Info = styled.li`
  margin-right: 18px;
`;
export const FullNameContainer = styled.div`
  font-weight: 600;
`;
export const Fullname = styled.p`
  display: inline;
  font-size: 16px;
  line-height: 24px;
  font-family: 'Roboto', sans-serif !important;
  margin: 0;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
`;
export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ProfileNavContainer = styled.div`
  witdth: 100%;
  border-top: 1px solid rgba(var(--b38, 219, 219, 219), 1);
  letter-spacing: 1px;
`;
export const ProfileNav = styled.ul`
  list-style-type: none;
  display: flex;
  margin: auto;
  justify-content: center;
`;
export const ProfileNavItem = styled(Link)`
  margin-right: 60px;
  height: 52px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  display: flex;
  color: #8e8e8e;
  align-items: center;
  text-transform: uppercase;

  &:active {
    border-top: 1px solid #262626;
    margin-top: -1px;
    color: rgba(var(--i1d, 38, 38, 38), 1);
  }
  &:visited {
    border-top: 1px solid #262626;
    color: rgba(var(--i1d, 38, 38, 38), 1);
  }
  &:target {
    border-top: 1px solid #262626;
    margin-top: -1px;
    color: rgba(var(--i1d, 38, 38, 38), 1);
  }
`;
