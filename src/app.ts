import express from 'express'

import Logger from './util/logger'
import AutoComplete from './routers/autoComplete'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, _, next) => {
  const dateTime = `[${req.method}] ${req.path} ${Date.now().toString()}`
  Logger.time(dateTime)
  next()
  Logger.timeEnd(dateTime)
})

app.use('/ac', AutoComplete)

export default app;