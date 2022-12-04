const movieM = require('../models/movie.m');

exports.getMovie = async (req,res,next)=>{
    try{
        const movie = await movieM.readMovie(req.params.id)
        const genre = await movieM.readMovieGenre(req.params.id);
        const cast = await movieM.readMovieCast(req.params.id)
    
        res.render('movies/details',{
            movie,
            genre,
            cast,
        })
    }catch(e){
        next(e);
    }
}