const app= require('express');
const router = app.Router();
const searchC = require('../controllers/search.c')

router.get('/',searchC.getSearch)

module.exports = router