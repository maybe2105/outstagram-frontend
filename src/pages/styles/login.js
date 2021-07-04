import styled from 'styled-components/macro';

import { Link } from 'react-router-dom';
export const LoginStyle = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-top: 3rem;
  font-size: 14px;
`;
export const LoginStyleFeature = styled.div`
  white-space: nowrap;
`;
export const LoginStyleImg = styled.img`
  width: 454px;
  height: 618px;
`;
export const LoginStyleProfile = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const LoginStyleLoginSection = styled.div`
  max-width: 350px;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin: 0 0 10px;
  padding: 10px 0;
  flex-grow: 1;
`;
export const LoginStyleLogo = styled.img`
  margin: 22px auto 5px;
  src: url(../logo_large.png) no-repeat center center fixed;
  background-position: -98px 0;
  height: 51px;
  width: 177px;
  overflow: hidden;
`;
export const LoginStyleForm = styled.form`
  margin: 0 0;
  position: relative;
  font-size: 14px;
  width: 100%;
  text-overflow: ellipsis;
`;
export const LoginStyleSubmitDiv = styled.div`
  margin: 8px 40px;
  align-items: center;
`;
export const LoginStyleSubmit = styled.button`
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  text-align: center;
  padding: 0.5rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid transparent;
  background-color: #3897f0;
  color: #fff;
  margin-top: 0.5rem;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  &.disabled {
    color: #b2dffc;
  }
`;
export const LoginStyleOtherAuth = styled.a`
  margin: 0.5rem;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  color: #385185;
  font-weight: 600;
  background: transparent;
`;
export const LoginStyleSignupSection = styled.div`
  max-width: 350px;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  background-color: #ffff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin: 0 0 10px;
  padding: 10px 0;
`;
export const LoginStyleSignUp = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  color: #379bf6;
`;
export const LoginStyleInput = styled.input`
  padding: 9px 0px 7px 9px;
  font-size: 12px;
  width: 16rem;
  height: 1.2rem;
  outline: none;

  background: #fafafa;
  border-radius: 3px;
  border: 1px solid #efefef;
  ::placeholder {
    visibility: hidden;
  }
  &:not(::placeholder) {
    padding-top: 14px;
    padding-bottom: 2px;
  }
`;
export const LoginStyleField = styled.div`
  margin: 10px auto;
  position: relative;
  font-size: 14px;
  width: 100%;
  text-overflow: ellipsis;
`;
export const LoginStyleLabel = styled.label`
  position: absolute;
  pointer-events: none;
  left: 10px;
  padding-bottom: 15px;
  transform: translateY(10px);
  line-height: 6px;
  transition: all ease-out 0.1s;
  font-size: 14px;
  color: #999;
  padding-top: 6px;
`;

export const LoginSeparator = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: space-between;
  color: #999;
  margin-top: 4px;
`;
export const LoginLine = styled.div`
  height: 1px;
  width: 40%;
  background-color: #dbdbdb;
`;
export const LoginWithOther = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const LoginStyleForgotPass = styled.a`
  font-size: 11px;
  color: #003569;
  cursor: pointer;
`;
export const LoginStyleWrapField = styled.div`
  margin: 8px 40px;
`;
export const LoginStyleText = styled.p`
  fontsize: 14px;
  line-height: 1rem;
  margin-right: 2px;
`;
