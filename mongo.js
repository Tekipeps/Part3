const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://tekipeps:${password}@cluster0-8ksjd.mongodb.net/phonebook?retryWrites=true&w=majority`

console.log('connecting to', url)
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to mongoDB')
  })
  .catch((error) => {
    console.log('error connecting to mongoDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: name,
    number: number,
  })
  person.save().then((response) => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
