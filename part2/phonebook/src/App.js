import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonInput from './components/PersonInput';
import Persons from './components/Persons';
import PersonService from './services/Person';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [showAll, setShowAll] = useState(true);

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
        ? PersonService.update(
            changedObject,
            changedObject.id
          ).then((updatedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== changedObject.id ? person : updatedPerson
              )
            )
          )
        : alert('keeping it')
      : PersonService.create(personObject).then((returnedNote) => {
          setPersons(persons.concat(returnedNote));
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

  const whatToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLocaleLowerCase().includes(newFilter)
      );

  return (
    <div>
      <h2>Phonebook</h2>
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
