import React from 'react';

const Note = ({
  handleSubmit,
  inputChange,
  input,
  setImportance,
  importantClass
}) => {
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
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={inputChange} value={input} />
      <button onClick={setImportance} className={`button ${importantClass}`}>
        !
      </button>
      <button type='submit'>Add Note</button>
    </form>
  );
};

export default Note;
