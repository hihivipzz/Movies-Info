const searchM = require('../models/search.m');

exports.getSearch = async (req,res,next) =>{
    try{
        var result;
        if(req.query.type =='name'){
            result = await searchM.findMovieByName(req.query.str,0,10);
        }else if(req.query.type=='genre'){
            result = await searchM.findMovieByGenre(req.query.str,0,10);
        }
        
        res.render('movies/movies',{
            movies: result,
        })
    }catch(e){
        next(e)
    }
   
}