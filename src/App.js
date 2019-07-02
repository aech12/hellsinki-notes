import React, { useState, useEffect } from 'react';
import './App.sass';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [important, setImportant] = useState(true);
  const [showImportant, setShowImportant] = useState(true);
  const url = 'http://localhost:3001';

  useEffect(() => {
    getNotes();
  }, [notes]);

  const getNotes = async () => {
    const res = await axios.get(`${url}/api/notes`);
    setNotes(res.data);
  };
  const mapNotes = () =>
    notes.map((note, i) => (
      <li key={note.id} onClick={() => putImportant(note.id)}>
        {note.id}: {note.content} {note.important ? '(!)' : ''}
      </li>
    ));

  const handleSubmit = e => {
    e.preventDefault();
    const newnote = {
      content: input,
      id: 4,
      important
    };
    const postNote = async () => {
      await axios.post(`${url}/api/notes`, newnote);
      getNotes();
    };
    postNote();
    setInput('');
  };
  const inputChange = input => {
    setInput(input.target.value);
  };
  const setImportance = () => {
    setImportant(!important);
  };
  const putImportant = async id => {
    await axios.put(`${url}/notes/${id}`);
    getNotes();
  };

  const ifImportant = important ? 'important' : '';
  return (
    <div className='App'>
      <h1>Notes</h1>
      <ul>{mapNotes()}</ul>
      <form onSubmit={handleSubmit}>
        <input onChange={inputChange} value={input} />
        <button onClick={setImportance} className={`button ${ifImportant}`}>
          !
        </button>
        <button type='submit'>Add Note</button>
      </form>
      <button>Show Important</button>
    </div>
  );
};

export default App;
