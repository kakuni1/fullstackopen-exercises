const { Entry, connectMongoDb } = require("./models/entry")
const express = require("express")
const morgan = require("morgan")
const app = express()

const PORT = process.env.PORT

app.use(express.json())

connectMongoDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log("Mongodb connection failure: ", error.message)
    process.exit(1)
  })

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

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name and/or number missing"
    })
  }

  const person = new Entry({
    name: body.name,
    number: body.number
  })

  person.save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})
