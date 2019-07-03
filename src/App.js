import React, { useState, useEffect } from 'react';
import './App.sass';
import noteService from './services/noteService';
import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [important, setImportant] = useState(true);
  const [showImportant, setShowImportant] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log(typeof notes);
    getNotes();
  }, []);

  const getNotes = async () => {
    const res = await noteService.getNotes();
    setNotes(res.data);
  };
  const putImportant = async id => {
    setError('puterror');
    await noteService.putNote(id);
    getNotes();
  };
  const deleteNote = async id => {
    await noteService.delNote(id);
    getNotes();
  };

  const mapNotes = () =>
    notesToMap.map(({ id, content, important }) => (
      <Note
        id={id}
        key={id}
        content={content}
        important={important}
        putImportant={putImportant}
        deleteNote={deleteNote}
      />
    ));
  const notesToMap = showImportant
    ? notes
    : notes.filter(note => note.important);

  const handleSubmit = e => {
    e.preventDefault();
    // if (!input) {
    //   return;
    // }
    const newnote = {
      content: input,
      id: notes.length + 1,
      important
    };
    const postNote = async newnote => {
      await noteService.postNote(newnote);
      getNotes();
    };
    postNote(newnote);
    setInput('');
  };

  const inputChange = input => {
    setInput(input.target.value);
  };
  const setImportance = () => {
    setImportant(!important);
  };
  const filterImportant = () => {
    setShowImportant(!showImportant);
  };

  const showErrorMessage = () => {
    if (!error) {
      return null;
    } else if (error) {
      setTimeout(() => {
        setError(null);
      }, 2500);
      return error;
    }
  };

  const importantClass = important ? 'important' : '';
  return (
    <div className='App'>
      <p>{showErrorMessage()}</p>
      <h1>Notes</h1>
      <ul>{mapNotes()}</ul>
      <form onSubmit={handleSubmit}>
        <input onChange={inputChange} value={input} />
        <button onClick={setImportance} className={`button ${importantClass}`}>
          !
        </button>
        <button type='submit'>Add Note</button>
      </form>
      <button onClick={filterImportant}>Show Important</button>
    </div>
  );
};

export default App;
