const express = require('express')

app.use(express())


app.get('/', (req, res) => {
    res.send('<h1>Phonebook backend</h1>')
})


const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})