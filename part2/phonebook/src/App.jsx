import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleAddPerson = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      const confirmEdit = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );
      if (confirmEdit) {
        const personToUpdate = persons.find(
          (person) => person.name === newName,
        );
        const updatedPerson = { ...personToUpdate, number: newNumber };

        personsService
          .update(personToUpdate.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === personToUpdate.id ? returnedPerson : person,
              ),
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personsService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (personToDelete) {
      const confirmDelete = window.confirm(`Delete ${personToDelete.name} ?`);
      if (confirmDelete) {
        personsService.remove(id).then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        });
      }
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue?.toLowerCase() || ""),
  );

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filterValue={filterValue} onFilterChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onAddPerson={handleAddPerson}
      />

      <h2>Numbers</h2>

      <Persons
        filteredPersons={filteredPersons}
        onDeletePerson={handleDeletePerson}
      />
    </div>
  );
}

export default App;
