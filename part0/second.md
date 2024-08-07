```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user ->>browser: Navigate to https://studies.cs.helsinki.fi/exampleapp/spa
    Note right of browser: Browser captures the user input and prepares to send it to the server

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa

    activate server 
    Note right of server: Server receives the note data and saves it
    server -->>browser: HTML document(SPA shell)
    deactivate server 



    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server ->>browser: HTML document
    deactivate server

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->>browser: the css file
    deactivate server

    browser ->>server: https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server -->>browser: the JavaScrip file
    deactivate server

    Note right of browser: The browser start exacuting the JavaScript code of the SPA

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server -->>browser: [{"content": "HTML is easy", "date": 2023-1-1}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes in the SPA
```