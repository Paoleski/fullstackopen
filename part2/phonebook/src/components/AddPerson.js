import React from 'react';

const AddPerson = ({
  handlePerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <div>
      <form onSubmit={handlePerson}>
        <div>
          {' '}
          name: <input value={newName} onChange={handleNameChange} />{' '}
        </div>
        <div>
          {' '}
          number: <input value={newNumber} onChange={handleNumberChange} />{' '}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddPerson