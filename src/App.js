import React, { useState, useEffect } from 'react';
import './App.sass';
import noteService from './services/noteService';
import AddNote from './containers/AddNote';
import MapNotes from './containers/MapNotes';
import ShowErrorMessage from './components/ShowError';
import Login from './containers/Login';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log(typeof notes);
    getNotes();
  }, [0]);

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

  const filterImportant = () => {
    setShowImportantOnly(!showImportantOnly);
  };
  const throwErrorMessage = e => {
    setErrorMessage(e);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  return (
    <div className='App'>
      {/* <p>{()}</p> */}
      <ShowErrorMessage message={errorMessage} />
      <h1>Notes</h1>
      <Login throwErrorMessage={throwErrorMessage} />
      <div>
        <ul>
          <MapNotes
            notes={notes}
            putImportant={putImportant}
            deleteNote={deleteNote}
            showImportantOnly={showImportantOnly}
          />
        </ul>
      </div>
      <AddNote
        notes={notes}
        setNotes={setNotes}
        throwErrorMessage={throwErrorMessage}
      />
      <button onClick={filterImportant}>Show Important</button>
    </div>
  );
};

export default App;
