import React, { useState, useEffect } from 'react';
import './App.sass';
import noteService from './services/noteService';
import AddNote from './containers/AddNote';
import MapNotes from './containers/MapNotes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(typeof notes);
    getNotes();
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
      // setError('puterror');
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
  // const importantClass = important ? 'important' : '';

  return (
    <div className='App'>
      {/* <p>{showErrorMessage()}</p> */}
      <div>
        <h1>Notes</h1>
        <ul>
          <MapNotes
            notes={notes}
            putImportant={putImportant}
            deleteNote={deleteNote}
            showImportantOnly={showImportantOnly}
          />
        </ul>
      </div>
      <AddNote notes={notes} setNotes={setNotes} />
      <button onClick={filterImportant}>Show Important</button>
    </div>
  );
};

export default App;
