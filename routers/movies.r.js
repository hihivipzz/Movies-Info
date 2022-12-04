const app= require('express');
const router = app.Router();
const movieC = require('../controllers/movie.c')


router.get('/review',movieC.getReview)

router.get('/:id',movieC.getMovie)


module.exports = router;