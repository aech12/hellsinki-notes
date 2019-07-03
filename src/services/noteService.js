import axios from 'axios';
const url = 'http://localhost:3001';

const getNotes = () => axios.get(`${url}/api/notes`);

const postNote = newnote => axios.post(`${url}/api/notes`, newnote);
const putNote = id => axios.put(`${url}/notes/${id}`);
const delNote = id => axios.delete(`${url}/notes/${id}`);

export default {
  getNotes,
  postNote,
  putNote,
  delNote
};
