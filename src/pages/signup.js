import { TextField } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  LoginStyle,
  LoginStyleProfile,
  LoginStyleLoginSection,
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
import * as api from '../api/index';
import UserContext from '../context/user';
const SignUp = () => {
  const history = useHistory();
  const usercontext = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setfullName] = useState('');
  const [username, setName] = useState('');
  const [err, setErr] = useState('');
  const isInvalid = email === '' || password === '' || username || fullName;
  useEffect(() => {
    document.title = 'Login Instagram';
  }, []);
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeFullName = (e) => {
    setfullName(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSignup = async (event) => {
    event.preventDefault();
    const user = { email, fullName, username, password };

    try {
      console.log(user);
      const result = await api.signUp(user);
      console.log(result);
      usercontext.updateUser(result.data.user);
      console.log(user);
      localStorage.setItem('loggedInUser', JSON.stringify(result.data.user));
      localStorage.setItem('token', result.data.token);
      history.push('/');
      console.log(user);
    } catch (error) {
      setEmail('');
      setPassword('');
      setfullName('');
      setName('');
      setErr(JSON.stringify(err));
    }
  };
  return (
    <LoginStyle>
      <LoginStyleProfile>
        <LoginStyleLoginSection>
          <LoginStyleLogo src={process.env.PUBLIC_URL + './images/logo.png'} />
          <LoginStyleWrapField>
            <div
              style={{
                fontWeight: '600',
                fontSize: '17px',
                color: '#8e8e8e',
                row: '2',
                textAlign: 'center',
                display: 'flex',
                height: 'auto',
              }}
            >
              Đăng ký để xem ảnh và video từ bạn bè
            </div>
          </LoginStyleWrapField>
          <LoginStyleForm>
            {err && (
              <LoginStyleWrapField>
                <p
                  style={{
                    color: 'red',
                    fontWeight: '600',
                  }}
                >
                  {err}
                </p>
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
                  fontSize='small'
                  size='small'
                  color='primary'
                  onChange={(event) => handleChangeEmail(event)}
                />
              </LoginStyleField>
            </LoginStyleWrapField>
            <LoginStyleWrapField>
              <LoginStyleField>
                <TextField
                  label='Full Name'
                  fullWidth
                  size='small'
                  type='text'
                  name='fullName'
                  label-color='#fff'
                  margin='none'
                  onChange={(event) => handleChangeFullName(event)}
                ></TextField>
              </LoginStyleField>
            </LoginStyleWrapField>

            <LoginStyleWrapField>
              <LoginStyleField>
                <TextField
                  label='Name'
                  fullWidth
                  size='small'
                  type='text'
                  name='name'
                  label-color='#fff'
                  margin='none'
                  onChange={(event) => handleChangeName(event)}
                ></TextField>
              </LoginStyleField>
            </LoginStyleWrapField>
            <LoginStyleWrapField>
              <LoginStyleField>
                <TextField
                  label='Password'
                  fullWidth
                  type='password'
                  size='small'
                  name='password'
                  label-color='#fff'
                  margin='none'
                  onChange={(event) => handleChangePassword(event)}
                ></TextField>
              </LoginStyleField>
            </LoginStyleWrapField>
            <LoginStyleSubmitDiv>
              <Link to='/'>
                <LoginStyleSubmit
                  type='submit'
                  onClick={(event) => handleSignup(event)}
                >
                  Đăng Ký
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
            </LoginWithOther>
          </LoginStyleForm>
        </LoginStyleLoginSection>
        <LoginStyleSignupSection>
          <LoginStyleText>Bạn đã có tài khoản?</LoginStyleText>
          <LoginStyleSignUp to='/login'>Đăng nhập</LoginStyleSignUp>
        </LoginStyleSignupSection>
      </LoginStyleProfile>
    </LoginStyle>
  );
};

export default SignUp;
