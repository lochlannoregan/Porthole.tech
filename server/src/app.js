const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())

// Need if you want other server to access but is security risk
app.use(cors())

// get request to status endpoint
app.get('/status', (req, res) => {
  res.send({
    message: 'hello world!'
  })
})

app.post('/register', (req, res) => {
  res.send({
    message: `Your ${req.body.email} user was registered`
  })
})

app.listen(process.env.PORT || 8081
)
