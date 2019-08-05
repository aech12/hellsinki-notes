import React, { useState } from 'react';
import Note from '../components/Note';

const MapNotes = ({ notes, putImportant, deleteNote, user }) => {
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [showUserNotesOnly, setShowUserNotesOnly] = useState(false);

  // notes.map(note => {
  //   if (note.user === user.userForToken.username) {
  //     return note.style = true
  //   }
  // })
  const notesFromUser = showUserNotesOnly
    ? notes.filter(note => note.user === user.userForToken.username)
    : notes;
  const filterUserNotes = () => {
    setShowUserNotesOnly(!showUserNotesOnly);
  };
  const notesToMap = showImportantOnly
    ? notesFromUser.filter(note => note.important)
    : notesFromUser;
  const filterImportant = () => {
    setShowImportantOnly(!showImportantOnly);
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

  return (
    <div>
      <ul>{mapNotes()}</ul>;
      <div>
        <button onClick={filterImportant}>Show Important</button>
        <button onClick={filterUserNotes}>Show my Notes</button>
      </div>
    </div>
  );
};

export default MapNotes;
