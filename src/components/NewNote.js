import React from 'react';
import '../App.sass';

const Note = ({
  handleSubmit,
  inputChange,
  input,
  setImportance,
  important
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={inputChange} value={input} />
      <button
        type='button'
        onClick={setImportance}
        className={`button ${important ? 'important' : ''}`}
      >
        !
      </button>
      <button type='submit'>Add Note</button>
    </form>
  );
};

export default Note;
