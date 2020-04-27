title Note Submission

Browser->Server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
Server->Browser: HTTP Status Code 302
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
Server->Browser: HTML-Code
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
Server->Browser: main.css
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
Server->Browser: main.js

note over Browser:
Browser starts executing js code, 
which makes a HTTP GET request 
to json data.
end note

Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
Server->Browser: [{json: "format", code: "is", returned: "and", rendered: "on browser"}]

note over Browser: 
Browser execute code triggered 
by event handler to display json
data.
end note.

