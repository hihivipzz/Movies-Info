const userM = require('../models/user.m');
const CryptoJS = require("crypto-js")
const hashLength = 64;

exports.getRegist = async (req, res, next) => {
    res.render('user/regist')
}

exports.postRegist = async (req, res, next) => {
    try {
        const user = await userM.findUsername(req.body.username);
        if (user.length != 0) {
            res.render('user/regist', {
                notice: "Username exist! Please choose other!"
            })
        } else {
            const salt = Date.now().toString(16);
            const pwSalt = req.body.password + salt;
            const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
            const info = req.body;
            info.password = pwHashed + salt;
            userM.add(info);
            res.redirect('/user/login');
        }
    } catch (e) {
        next(e);
    }
}

exports.getLogin = async (req, res, next) => {
    res.render('user/login')
}

exports.postLogin = async (req, res, next) => {
    try {
        const user = await userM.findUsername(req.body.username);
        if (user.length ==0) {
            res.render('user/login', {
                notice: "Username is not exist!"
            })
        } else {
            const pwDb = user[0].password;
            const salt = pwDb.slice(hashLength);
            const pwSalt = req.body.password + salt;
            const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString(CryptoJS.enc.Hex);
          
            if (pwDb === (pwHashed + salt)) {
                req.session.uid = user[0].id;
                res.redirect('/');
            } else {
                res.render('user/login',{
                    notice: "Wrong password!"
                });
            }
        }
    } catch (e) {
        next(e);
    }
}

exports.postLogout = async(req,res,next) =>{
    try{
        delete req.session.uid;
        res.redirect('/home');
    }catch(e){
        next(e)
    }
}