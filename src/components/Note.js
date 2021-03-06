import React from 'react';

const App = ({ id, content, important, putImportant, deleteNote }) => {
  return (
    <li onClick={() => putImportant(id)} className=''>
      {id}: {content} {important ? '(!)' : ''}
      <button onClick={() => deleteNote(id)}>X</button>
    </li>
  );
};

export default App;
