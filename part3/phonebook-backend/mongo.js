const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

if (!url) {
  console.log("MONGODB_URI not set")
  process.exit(1)
}

if (process.argv.length !== 2 && process.argv.length !== 4) {
  console.log("invalid argument(s)")
  console.log("log: 'fnox exec -- node mongo.js'")
  console.log("add: 'fnox exec -- node mongo.js 'Jane Doe' 123-1231230'")
  process.exit(1)
}

mongoose.set("strictQuery", false)

const entrySchema = new mongoose.Schema({
  name: String,
  number: String
})

const Entry = mongoose.model("Entry", entrySchema)

if (process.argv.length === 2) {
  mongoose.connect(url, { dbName: "phonebook", family: 4 })
    .then(() => {
      console.log("phonebook:")
      Entry.find({})
        .then((result) => {
          result.forEach((entry) => {
            console.log(entry.name, entry.number)
          })
          return mongoose.connection.close()
        })
    })
}

if (process.argv.length === 4) {
  mongoose.connect(url, { dbName: "phonebook", family: 4 })
    .then(() => {
      const entry = new Entry({
        name: process.argv[2],
        number: process.argv[3]
      })
      return entry.save()
    })
    .then(() => {
      console.log(`added ${process.argv[2]} number ${process.argv[3]} to phonebook`)
      return mongoose.connection.close()
    })
}
