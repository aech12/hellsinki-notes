import React, { useState } from 'react';
import '../App.sass';
import noteService from '../services/noteService';

const Login = ({ throwErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      const stuff = await noteService.login(loginCredentials);
      setUsername('');
      setPassword('');
      console.log(stuff);
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
      <input onChange={usernameChange} value={username} name='username' />
      <input
        onChange={passChange}
        type='password'
        value={password}
        name='password'
      />
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
