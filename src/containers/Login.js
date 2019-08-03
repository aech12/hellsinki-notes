import React, { useState } from 'react';
import '../App.sass';
import noteService from '../services/noteService';

const Login = ({ throwErrorMessage, setUser }) => {
  const [username, setUsername] = useState('passIsJSON');
  const [password, setPassword] = useState('JSON');

  const handleSubmit = async e => {
    e.preventDefault();
    // if (!username) {
    //   return;
    // }
    try {
      const loginCredentials = {
        username,
        password
      };
      const user = await noteService.login(loginCredentials);
      // console.log(user.data);
      setUsername('');
      setPassword('');
      setUser(user.data);
      window.localStorage.setItem('loginInfo', JSON.stringify(user.data));
    } catch (e) {
      console.log(e);
      // fix thing below, too many error messages wrong pass but right user
      // throwErrorMessage(e);
    }
  };
  const handleSubmitGuest = async e => {
    e.preventDefault();
    // if (!username) {
    //   return;
    // }
    try {
      const user = { userForToken: { username: 'Guest' } };
      setUsername('');
      setPassword('');
      setUser(user);
      window.localStorage.setItem('loginInfo', JSON.stringify(user));
    } catch (e) {
      console.log(e);
      // fix thing below, too many error messages wrong pass but right user
      // throwErrorMessage(e);
    }
  };

  const usernameChange = username => {
    setUsername(username.target.value);
  };
  const passChange = pass => {
    setPassword(pass.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={usernameChange}
        value={username}
        name='username'
        placeholder='username'
      />
      <input
        onChange={passChange}
        type='password'
        value={password}
        name='password'
        placeholder='password'
      />
      <button type='submit'>Login</button>
      <button onClick={handleSubmitGuest}>Login as Guest</button>
    </form>
  );
};

export default Login;
