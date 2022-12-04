const app= require('express');
const router = app.Router();
const userC = require('../controllers/user.c')

router.get('/regist',userC.getRegist)
router.post('/regist',userC.postRegist)
router.get('/login',userC.getLogin)
router.post('/login',userC.postLogin)
router.post('/logout',userC.postLogout)

module.exports = router;