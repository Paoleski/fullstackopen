import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonInput from './components/PersonInput';
import Persons from './components/Persons';
import PersonService from './services/Person';
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    PersonService.getAll().then((people) => {
      setPersons(people);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date(),
    };

    const nameExists = persons.find((person) => person.name === newName);
    const changedObject = { ...nameExists, number: newNumber };
    nameExists
      ? window.confirm('Name already exists, do you want to update the number?')
      // update HTTP function
        ? PersonService.update(
            changedObject,
            changedObject.id
          ).then((updatedPerson) =>
              setPersons(persons.map((person) => person.id !== changedObject.id ? person : updatedPerson)),
              handleMessage({text:`${personObject.name} was updated`, type:'success'})
            ).catch(error => {
              handleMessage({text:`${personObject.name} was already deleted from the server`, type:'fail'})
            })
        : alert('keeping it')
        // create HTTP function
      : PersonService.create(personObject).then((returnedNote) => {
          setPersons(persons.concat(returnedNote));
          handleMessage({text:`${personObject.name} was added`, type: 'success'})
        });

    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFiltering = (event) => {
    setShowAll(false);
    setNewFilter(event.target.value.toLocaleLowerCase());
  };

  const removePerson = (id) => {
    if (window.confirm(`do you really want to delete?`)) {
      PersonService.remove(id).then((response) => {
        onPersonDeleted(id);
      });
    }
  };

  const onPersonDeleted = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
  };

  const handleMessage = (message) => {
    console.log(message);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    },3000)
  }

  const whatToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLocaleLowerCase().includes(newFilter)
      );

  return (
    <div className='container'>
      <h2>Phonebook</h2>
      <Notification message={message}></Notification>
      <Filter filteredText={newFilter} handleFilter={handleFiltering}></Filter>
      <h2>Add a new</h2>
      <PersonInput
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      ></PersonInput>
      <h2>Numbers</h2>
      <Persons whatToShow={whatToShow} removePerson={removePerson}></Persons>
    </div>
  );
};

export default App;
