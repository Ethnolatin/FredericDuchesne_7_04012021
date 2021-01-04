import { Router } from 'express'

const router = Router()

// définit les routes relatives aux posts
router.get('/', (req, res) => {
    res.send('Salut post !')
})

module.exports = router
