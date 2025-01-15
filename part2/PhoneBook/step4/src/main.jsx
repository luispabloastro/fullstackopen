import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'

const persons = [{id:1,name: 'Arto Hellas ',number: "1234567"},{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }]


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App persons={persons} />
    </React.StrictMode>
)