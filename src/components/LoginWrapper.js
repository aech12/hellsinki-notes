import React from 'react';
import AddNote from '../containers/AddNote';
import Login from '../containers/Login';
import Logout from './Logout';

const LoginWrapper = ({
  user,
  setUser,
  throwErrorMessage,
  setNotes,
  notes
}) => {
  return (
    <div>
      {user === null ? (
        <Login throwErrorMessage={throwErrorMessage} setUser={setUser} />
      ) : (
        <div>
          <div>
            <p>Hello {user.userForToken.username}!</p>
            <Logout setUser={setUser} />
          </div>
          <AddNote
            notes={notes}
            setNotes={setNotes}
            throwErrorMessage={throwErrorMessage}
            token={user.token}
          />
        </div>
      )}
    </div>
  );
};

export default LoginWrapper;
