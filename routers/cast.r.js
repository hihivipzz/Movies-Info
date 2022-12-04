const app= require('express');
const router = app.Router();
const castC = require('../controllers/cast.c')




router.get('/:id',castC.getCast)


module.exports = router;