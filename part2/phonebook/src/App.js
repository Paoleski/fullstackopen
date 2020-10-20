import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import AddPerson from './components/AddPerson';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/db')
      .then(response => {
        setPersons(response.data.persons)
      })
  }, [])

  
  console.log(persons);
  

  


  const handlePerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists === true) {
      return alert(`${newName} already exists`);
    }
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFiltering = (event) => {
    setShowAll(false);
    setNewFilter(event.target.value);
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
      <AddPerson
        handlePerson={handlePerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      ></AddPerson>
      <h2>Numbers</h2>
      <Persons whatToShow={whatToShow}></Persons>
    </div>
  );
};



export default App;
