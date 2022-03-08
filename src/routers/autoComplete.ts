import Express from 'express'

import Controller, {IAutoComplete} from '../controllers/autoComplete'
import Cache from '../models/cache'

const router = Express.Router()
const acCach = new Cache<IAutoComplete[]>()

router.get('/', async (req, res) => {
  let queryText = req.query.text
  if (typeof queryText !== 'string')
    queryText = ''
  let queryLanguage = req.query.language
  if (typeof queryLanguage !== `string`)
    queryLanguage = 'en'
  const queryID = `${queryText}-${queryLanguage}`

  const cached = acCach.get(queryID)
  if (cached) {
    console.log('It was cached')
    res.send(cached)
  } else
    res.send(acCach.set(queryID, await Controller.completeText(queryText, queryLanguage)))
})

export default router