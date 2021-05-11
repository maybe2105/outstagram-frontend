import styled from 'styled-components/macro';
export const SidebarContainer = styled.div`
  display: flex;
  position: fixed;
  width: 287px;
  height: 100vh;
  top: 88px;
  left: 815px;
  flex-direction: column;
`;
export const SidebarUser = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
export const SidebarAvatar = styled.div`
  float: left;
  height: 100%;
  width: auto;
`;
export const SidebarName = styled.div`
  display: flex;
  flex-direction: column;
  justifycontent: center;
  margin: auto 6px;
  flex: 1 1 auto;
`;
export const SidebarUserName = styled.p`
  color: rgba(var(--i1d, 38, 38, 38), 1);
  font-weight: 600;
  text-overflow: ellipsis;
  margin: 0;
`;
export const SidebarUserFullname = styled.p`
  font-size: 14px;
  line-height: 18px;
  margintop: 8px;
  font-weight: 400;
  color: rgba(var(--f52, 142, 142, 142), 1);
  margin: 0;
`;
