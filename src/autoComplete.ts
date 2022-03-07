import Express from 'express'

const router = Express.Router()

router.get('/', (req, res) => {
  console.log('Here to return ', req.query.text)
  res.send(req.query.text)
})

export default router