import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'

const persons = [{id:1,name: 'Arto Hellas ',number: "1234567"}]


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App persons={persons} />
    </React.StrictMode>
)