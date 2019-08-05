const notes = {
  data: [
    {
      id: '5a451df7571c224a31b5c8ce',
      content: 'HTML is easy',
      date: '2019-06-11T16:38:15.541Z',
      important: false,
      user: {
        id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    },
    {
      id: '5a451e21e0b8b04a45638211',
      content: 'Browser can execute only javascript',
      date: '2019-06-11T16:38:57.694Z',
      important: true,
      user: {
        id: '5a437a9e514ab7f168ddf138',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
      }
    }
  ]
};

const getNotes = () => {
  return Promise.resolve(notes);
};

export default { getNotes };
