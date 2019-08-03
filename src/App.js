import React, { useState, useEffect } from 'react';
import './App.sass';
import noteService from './services/noteService';
import MapNotes from './containers/MapNotes';
import ShowErrorMessage from './components/ShowError';
import LoginWrapper from './components/LoginWrapper';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);
  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem('loginInfo'));
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  const getNotes = async () => {
    const initialNotes = await noteService.getNotes();
    setNotes(initialNotes.data);
  };
  const putImportant = async id => {
    try {
      const changedNote = await noteService.putNote(id);
      const newNotes = notes.map(note =>
        changedNote.data.id !== note.id ? note : changedNote.data
      );
      setNotes(newNotes);
    } catch (e) {
      throwErrorMessage(e);
    }
  };
  const deleteNote = async id => {
    await noteService.delNote(id);
    const notesWithoutDeletedNote = notes.filter(note => note.id !== id);
    setNotes(notesWithoutDeletedNote);
  };

  const throwErrorMessage = e => {
    setErrorMessage(e);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  return (
    <div className='App'>
      <ShowErrorMessage message={errorMessage} />
      <h1>Notes</h1>
      <LoginWrapper
        notes={notes}
        setNotes={setNotes}
        user={user}
        setUser={setUser}
        throwErrorMessage={throwErrorMessage}
      />
      <div>
        <ul>
          <MapNotes
            notes={notes}
            user={user}
            putImportant={putImportant}
            deleteNote={deleteNote}
          />
        </ul>
      </div>
    </div>
  );
};

export default App;
