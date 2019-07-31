import React, { useState } from 'react';
import '../App.sass';
import noteService from '../services/noteService';
import NewNote from '../components/NewNote';

const AddNote = ({ notes, setNotes, throwErrorMessage }) => {
  const [input, setInput] = useState('');
  const [important, setImportant] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    // if (!input) {
    //   return;
    // }
    try {
      const postNote = async newNote => {
        const postedNote = await noteService.postNote(newNote);
        setNotes(notes.concat(postedNote.data));
        console.log(postedNote);
      };
      const newNote = {
        content: input,
        important
      };
      postNote(newNote);
      setInput('');
    } catch (e) {
      throwErrorMessage(e);
    }
  };

  const inputChange = input => {
    setInput(input.target.value);
  };
  const setImportance = () => {
    setImportant(!important);
  };

  return (
    <NewNote
      handleSubmit={handleSubmit}
      inputChange={inputChange}
      input={input}
      setImportance={setImportance}
      important={important}
    />
  );
};

export default AddNote;
