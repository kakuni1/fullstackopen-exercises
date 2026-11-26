const { Entry, connectMongoDb } = require("./models/entry")

const express = require("express")
const app = express()

const PORT = process.env.PORT

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:", request.path)
  console.log("Body", request.body)
  console.log("---")
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }

  next(error)
}

app.use(express.static("dist"))
app.use(express.json())
app.use(requestLogger)

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

app.get("/", (request, response) => {
  response.send("")
})

app.get("/api/persons", (request, response, next) => {
  Entry.find({}).then((persons) => {
    response.json(persons)
  })
    .catch((error) => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
  Entry.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.get("/info", (request, response, next) => {
  Entry.countDocuments({})
    .then((count) => {
      response.send(`<p>Phonebook has info for ${count} people</p>
                     <p>${new Date()}</p>`)
    })
    .catch((error) => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body

  Entry.findById(request.params.id)
    .then((entry) => {
      if (!entry) {
        return response.status(404).end()
      }

      entry.name = name
      entry.number = number

      return entry.save().then((updatedEntry) => {
        response.json(updatedEntry)
      })
    })
    .catch((error) => next(error))
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

app.delete("/api/persons/:id", (request, response, next) => {
  Entry.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)
app.use(errorHandler)
