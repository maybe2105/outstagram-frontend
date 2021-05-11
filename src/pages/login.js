import { TextField } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as api from '../api/index';
import {
  LoginStyle,
  LoginStyleFeature,
  LoginStyleImg,
  LoginStyleProfile,
  LoginStyleLoginSection,
  LoginStyleForgotPass,
  LoginStyleSubmit,
  LoginStyleLogo,
  LoginStyleOtherAuth,
  LoginStyleSignUp,
  LoginWithOther,
  LoginStyleSignupSection,
  LoginStyleSubmitDiv,
  LoginStyleWrapField,
  LoginStyleForm,
  LoginSeparator,
  LoginLine,
  LoginStyleText,
  LoginStyleField,
} from './styles/login';
import UserContext from '../context/user';
const Login = () => {
  const history = useHistory();
  const contextuser = useContext(UserContext);
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [err, setErr] = useState('');
  const isInvalid = false;
  useEffect(() => {
    document.title = 'Login Instagram';
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(userEmail, userPassword);
    if (!checkValid(isInvalid)) {
      try {
        const { data } = await api.login(userEmail, userPassword);
        console.log(data);
        contextuser.setUser(data.user);
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        history.push('/');
      } catch (err) {
        setEmail('');
        setPassword('');
        console.log(err);
        setErr(err.message);
      }
    } else {
      setErr('Email or password must not be Empty');
    }
  };
  const checkValid = (isInvalid) => {
    return userEmail === '' || userPassword === '' ? true : false;
  };
  return (
    <LoginStyle>
      <LoginStyleFeature>
        <LoginStyleImg
          src={process.env.PUBLIC_URL + './images/iphone-with-profile.jpg'}
        />
      </LoginStyleFeature>
      <LoginStyleProfile>
        <LoginStyleLoginSection>
          <LoginStyleLogo src={process.env.PUBLIC_URL + './images/logo.png'} />
          <LoginStyleForm>
            {err && (
              <LoginStyleWrapField>
                <p style={{ color: 'red', fontWeight: '600' }}>{err}</p>
              </LoginStyleWrapField>
            )}
            <LoginStyleWrapField>
              <LoginStyleField>
                {/* <LoginStyleInput
                  id='username'
                  type='name'
                  placeholder='Phone number, username, or email'
                ></LoginStyleInput>
                <LoginStyleLabel>
                  Phone number, username, or email
                </LoginStyleLabel> */}
                <TextField
                  label='Phone number,usename, or email'
                  fullWidth
                  name='email'
                  color='primary'
                  size='small'
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </LoginStyleField>
            </LoginStyleWrapField>
            <LoginStyleWrapField>
              <LoginStyleField>
                {/* <LoginStyleInput
                  id='password'
                  type='password'
                  placeholder='password'
                ></LoginStyleInput>
                <LoginStyleLabel>Password</LoginStyleLabel> */}
                <TextField
                  label='Password'
                  fullWidth
                  type='password'
                  name='password'
                  size='small'
                  label-color='#fff'
                  margin='none'
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (!checkValid(isInvalid)) {
                      setErr('');
                    }
                  }}
                ></TextField>
              </LoginStyleField>
            </LoginStyleWrapField>
            <LoginStyleSubmitDiv>
              <Link to='/'>
                <LoginStyleSubmit
                  type='submit'
                  onClick={(event) => handleLogin(event)}
                >
                  Đăng Nhập
                </LoginStyleSubmit>
              </Link>
            </LoginStyleSubmitDiv>
            <LoginStyleWrapField>
              <LoginSeparator>
                <LoginLine />
                <p style={{ padding: '0px 18px' }}>OR</p>
                <LoginLine />
              </LoginSeparator>
            </LoginStyleWrapField>
            <LoginWithOther>
              <LoginStyleOtherAuth>Đăng nhập bằng Facebook</LoginStyleOtherAuth>
              <LoginStyleForgotPass>Quên mật khẩu?</LoginStyleForgotPass>
            </LoginWithOther>
          </LoginStyleForm>
        </LoginStyleLoginSection>
        <LoginStyleSignupSection>
          <LoginStyleText>Bạn không có tài khoản?</LoginStyleText>
          <LoginStyleSignUp to='/signup'>Đăng ký</LoginStyleSignUp>
        </LoginStyleSignupSection>
      </LoginStyleProfile>
    </LoginStyle>
  );
};

export default Login;
