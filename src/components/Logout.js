import React from 'react';
import '../App.sass';

const Logout = ({ setUser }) => {
  const logOut = () => {
    window.localStorage.removeItem('loginInfo');
    setUser(null);
  };

  return <button onClick={logOut}>Log Out</button>;
};

export default Logout;
