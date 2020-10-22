import React from 'react';

addNote = event => {
  event.preventDefault();
}

function App() {
  axios
  .post('http://localhost:3001/notes')
  .then(response => {
    console.log(response);
  })
}

export default App;
