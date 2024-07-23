const express = require('express')
const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    res.send("hii")
})

const loginRoute = require('./routes/login')
app.use('/login', loginRoute)



app.listen(3000, () => console.log("listening 3000!"))