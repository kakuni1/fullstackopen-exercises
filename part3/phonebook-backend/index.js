const { Entry, connectMongoDb } = require("./models/entry")
const express = require("express")
const morgan = require("morgan")
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(connectMongoDb)
app.use(
  morgan((tokens, request, response) => {
    return JSON.stringify({
      method: tokens.method(request, response),
      path: tokens.url(request, response),
      code: Number(tokens.status(request, response)),
      responseTime: `${tokens["response-time"](request, response)} ms`,
      body: request.body
    })
  })
)

const generateId = () => {
  return Math.floor(Math.random() * 10000)
}

app.get("/", (request, response) => {
  response.send("home")
})

app.get("/api/persons", (request, response) => {
  Entry.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
                 <p>${new Date()}</p>`)
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name and/or number missing"
    })
  }

  if (persons.find((person) => body.name === person.name)) {
    return response.status(409).json({
      error: "name must be unique"
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
