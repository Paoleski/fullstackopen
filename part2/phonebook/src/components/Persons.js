import React from 'react';

const Persons = ({ whatToShow, removePerson }) => {
  if (whatToShow.length === 0) {
    return (<p>loading list</p>)
  }
  
  return (
    <div>
      {whatToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons
