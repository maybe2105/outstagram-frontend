import styled from 'styled-components/macro';
export const DashboardContainer = styled.div`
  max-width: 935px;
  width: 100%;
  padding-top: 84px;
  margin: auto;
  display: grid;
  top: 54px;
  grid-template-columns: 70% 30%;
`;
export const DashboardNav = styled.div`
  height: 54px;
  display: flex;
  justifycontent: center;
  alignitems: center;
  background: #fff;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid #efefef;
  z-index: 999;
`;
export const DashboardLogo = styled.div`
  margin: auto;
  text-align: center;
  display: block;
  alignitems: center;
  height: 29px;
  width: 33%;
`;
export const DashboardNavItem = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  align-items: center;
`;
