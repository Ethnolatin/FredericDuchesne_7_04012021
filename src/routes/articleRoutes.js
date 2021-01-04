import { Router } from 'express'

const router = Router()

// définit les routes relatives aux articles
router.get('/', (req, res) => {
    res.send('Salut article !')
})

module.exports = router
