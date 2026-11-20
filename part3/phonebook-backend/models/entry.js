const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

if (!url) {
  console.log("MONGODB_URI not set")
  process.exit(1)
}

const connectMongoDb = (request, response, next) => {
  mongoose.connect(url, { dbName: "phonebook", family: 4 })
    .then(() => {
      console.log("connected to mongodb:phonebook")
      next()
    })
    .catch((error) => {
      console.log(error)
      next(error)
    })
}

const entrySchema = new mongoose.Schema({
  name: String,
  number: String
})

entrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Entry = mongoose.model("Entry", entrySchema)
module.exports = { Entry, connectMongoDb }
