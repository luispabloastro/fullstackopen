import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = async () => {
  const request = axios.get(url)
    return await request.then(response=>response.data)
}

const create = async (newObject) => {
  const request = axios.post(url, newObject)
    return await request.then((response) => response.data)
}

export default {getAll,create,}


