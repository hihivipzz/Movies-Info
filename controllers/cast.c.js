const castM = require('../models/cast.m');

exports.getCast = async(req,res,next)=>{
    try{
        const cast = await castM.readCast(req.params.id);
        const nicknames = await castM .readCastNickName(req.params.id)
        const movies = await castM.readCastMovie(req.params.id)
        if(cast.gender = true){
            cast.gender="male"
        }else{
            cast.gender="female"
        }
        res.render('cast/detail',{
            cast,nicknames,movies
        })
    }catch(e){
        next(e);
    }
}