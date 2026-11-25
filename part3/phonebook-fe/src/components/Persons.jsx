const Persons = ({ filteredPersons, onDeletePerson }) => {
  return (
    <>
      {filteredPersons.map(({ id, name, number }) => (
        <p key={id}>
          {name} {number}
          <button onClick={() => onDeletePerson(id)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
