const express = require('express')
const app = express()

let persons = [
    {
      id: 1,
      content: "Arto Hellas",
      number: "223-233-232"
    },
    {
        id: 2,
        content: "Samuel Johnson",
        number: "124-2451-3543"
    },
    {
        id: 3,
        content: "Michelle Long",
        number: "120-41-2332"
    },      
    {
        id: 4,
        content: "Mary Smith",
        number: "110-242-00-1"
    }
]

var requestTime = function(req, res, next) {
    req.requestTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    next();
};

app.use(requestTime);

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${req.requestTime}</p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        // Set res status as missing and respond to request without data
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
