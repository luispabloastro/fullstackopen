import { useEffect, useState } from 'react'
import { Names } from '../components/Names'
// import axios from 'axios' 
import name from './service/name'

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

const Persons = ({filteredPerson,deleteName}) => {
  return(
    <div>
      <ul>
            {filteredPerson.map(persons => 
              <Names key={persons.id} persons={persons} deleteName={deleteName}/>
            )}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson]=useState('')
  const [filteredPerson, setFilteredPerson]=useState([])


// mejor solucion que quita el error de Uncaught (in promise) ERROR

const hook = () => {
  const fetchData = async () => {
    try {
      await name.getAll()
      .then(initialPerson => {
        console.log('Promise completed')
        setPersons(initialPerson);
        setFilteredPerson(initialPerson);
      } )
      
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

    const addName = (event) => {
      event.preventDefault()
      console.log('button clicked', event.target)      
    const NameExist = persons.some((person)=>person.name.toLowerCase()===newName.toLowerCase())

    const ObjetcName = {
      name: newName,
      number: newNumber,
      // id: persons.length +1
    }

    if (NameExist) {
      const confirmed = window.confirm(`${newName} is already added to phonebook`)
      if(!confirmed){
        return
      }

      //update logic 
      name.update(NameExist,id,ObjetcName).then(updatePerson => {
        setPersons(prevPerson => {
          prevPerson.id === NameExist.id ? updatePerson: persons 
        })
        setFilteredPerson(prevfilteredPerson => {
          prevfilteredPerson.id === NameExist.id ? updatePerson: persons 
        })
      }).catch(error=> {
        console.error("Error updating the number", error.message)
        alert("Error updating the number")
      })

    } else {
        try{
          name.create(ObjetcName).then(returnedPerson=> {
           console.log(returnedPerson)
           setPersons(persons.concat(returnedPerson))
           setFilteredPerson(filteredPerson.concat(returnedPerson)) 
         })
       }catch (error) {
         console.error('Error detallado:', {
           message: error.message,
           code: error.code,
           config: error.config.url
         });
       }
      }  
    setNewName("")
    setNewNumber('')  
  }

  const deleteName = (id,personsName) => {
    const confirmDelete = window.confirm(`delete ${personsName}?`)
    if (!confirmDelete){
      return
    }
    name
      .remove(id)
      .then(()=> {
      setPersons(persons.filter((person) => person.id !== id))
      setFilteredPerson(filteredPerson.filter((person) => person.id !== id))
    })
    .catch((error)=>{
      console.log('Error deleting person: ', error.message)
      alert('Error deleting person')
    })
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
      filteredPerson={filteredPerson} deleteName={deleteName}/> 
    </div>
  )
}

export default App