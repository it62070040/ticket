const express = require("express")
var cors = require('cors')
const path = require("path")
const { logger } = require('./middlewares')
const app = express();
app.use(logger)

app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const concertRouter = require('./routes/concert')
const commentRouter = require('./routes/comment')
const regRouter = require('./routes/reg')


app.use(indexRouter.router)
app.use(concertRouter.router)
app.use(commentRouter.router)
app.use(regRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})