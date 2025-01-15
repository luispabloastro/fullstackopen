import { useState } from 'react'
import { Names } from '../components/Name'


const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')


    const addName = (event) => {
      event.preventDefault()
      console.log('button clicked', event.target)
      
    const NameExist = persons.some((person)=>person.name===newName)

    if (NameExist) {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      return
    }

    const ObjetcName = {
      name: newName,
      number: newNumber,
      id: persons.length +1
    }

    setPersons(persons.concat(ObjetcName))
    setNewName("")
    setNewNumber('')
  }

  
    const handleNameChange = (event) => {    
	  console.log(event.target.value)  // Muestra el valor actual del input
	  setNewName(event.target.value)  // Actualiza el estado con el nuevo valor
  }

    const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
    }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <form onSubmit={addName}>
          <div>
            name: <input 
              onChange={handleNameChange}
              value={newName} />
          </div>
          <div>
          number: <input
          onChange={handleNumberChange}
          value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
       </div>
        </form>
      </div>
      
	    <div>
      <form >
        
	    </form>
      </div>
      
     
	    <h2>Numbers</h2>
	     <ul>
	        {persons.map(persons => 
	          <Names key={persons.id} persons={persons} />
	        )}
		   </ul>
    </div>
  )
}

export default App