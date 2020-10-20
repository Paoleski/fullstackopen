import React from 'react';

const Persons = ({ whatToShow }) => {
  if (whatToShow.length === 0) {
    return (<div></div>)
  }
  
  return (
    <div>
      {whatToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons
