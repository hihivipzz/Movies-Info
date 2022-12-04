const homeM = require('../models/home.m');

exports.getHome = async (req,res,next)=>{
    const movies = await homeM.readTopRating(9);

    res.render('home',{
        isLogin: req.session.uid != undefined,
        movies
    })
}