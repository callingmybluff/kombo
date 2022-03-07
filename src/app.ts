import express from 'express'

import Logger from './util/logger'
import AutoComplete from './autoComplete'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, _, next) => {
  Logger.debug(`[${req.method}] ${req.path}`)
  next()
})

app.use('/ac', AutoComplete)

export default app;