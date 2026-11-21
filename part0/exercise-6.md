# New note in Single page app diagram

```mermaid
sequenceDiagram
participant browser
participant server

    Note right of browser: The browser is sending the user input to the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP status code 201 Created
    deactivate server

    Note right of browser: The browser executes the callback function that re-renders the notes
```
