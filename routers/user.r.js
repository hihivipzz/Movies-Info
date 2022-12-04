const app= require('express');
const router = app.Router();
const userC = require('../controllers/user.c')
const auth = require('../middleware/auth')

router.get('/regist',userC.getRegist)
router.post('/regist',userC.postRegist)
router.get('/login',userC.getLogin)
router.post('/login',userC.postLogin)
router.post('/logout',userC.postLogout)
router.get('/favourite',auth.auth,userC.getFavourite)
router.post('/favourite',auth.auth,userC.postFavourite)
router.delete('/favourite',auth.auth,userC.daleteFavourite)
router.get('/favourite/check',auth.auth,userC.checkFavourite)
module.exports = router;