import React from 'react';
import Note from '../components/Note';

const MapNotes = ({ notes, showImportantOnly, putImportant, deleteNote }) => {
  const notesToMap = showImportantOnly
    ? notes.filter(note => note.important)
    : notes;

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
    </div>
  );
};

export default MapNotes;
