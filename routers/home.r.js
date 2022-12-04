const app= require('express');
const router = app.Router();
const homeC = require('../controllers/home.c')

router.get('/',homeC.getHome)

module.exports = router;