import { useEffect, useState } from 'react'
import { Names } from '../components/Name'
import axios from 'axios' 


const PersonForm = ({addName,handleNameChange,handleNumberChange,newName,newNumber}) => {
  return(
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
  )
}

const Filter = ({searchPerson, handleSearchPerson}) => {
  return(
    <div>
          filter show with: <input value={searchPerson} onChange={handleSearchPerson}/> 
    </div>
  )
}


const Persons = ({filteredPerson}) => {
  return(
    <ul>
	        {filteredPerson.map(persons => 
	          <Names key={persons.id} persons={persons} />
	        )}
		</ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson]=useState('')
  const [filteredPerson, setFilteredPerson]=useState([])


// mejor solucion que quita el error de Uncaught (in promise) ERROR

const url = 'http://localhost:3001/persons'



const hook = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/persons');
      setPersons(response.data);
      setFilteredPerson(response.data);
    } catch (error) {
      console.error('Error detallado:', {
        message: error.message,
        code: error.code,
        config: error.config.url
      });
    }
  };
  
  fetchData();
}

useEffect(hook, []); 





    const addName = async (event) => {
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
    try{
      await axios.post(url, ObjetcName).then(response=> {
        console.log(response)
        setPersons(persons.concat(response.data))
        setFilteredPerson(filteredPerson.concat(response.data)) 
        setNewName("")
        setNewNumber('')
      })
    }catch (error) {
      console.error('Error detallado:', {
        message: error.message,
        code: error.code,
        config: error.config.url
      });
    }
    

    
  }
    
  
    const handleNameChange = (event) => {    
	  console.log(event.target.value)  // Muestra el valor actual del input
	  setNewName(event.target.value)  // Actualiza el estado con el nuevo valor
  }

    const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
    }
    
    const handleSearchPerson = (event) => {
      console.log(event.target.value)
      setSearchPerson(event.target.value)

      const FilterItem = persons.filter((person)=>person.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setFilteredPerson(FilterItem)
    }
    
      
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      searchPerson={searchPerson} 
      handleSearchPerson={handleSearchPerson}
      />
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />       	             
	    <h2>Numbers</h2>
	    <Persons 
      filteredPerson={filteredPerson}/> 
    </div>
  )
}

export default App