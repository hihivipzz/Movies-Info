const movieM = require('../models/movie.m');
const reviewPerPage = 3;

exports.getMovie = async (req,res,next)=>{
    try{
        const movie = await movieM.readMovie(req.params.id)
        const genre = await movieM.readMovieGenre(req.params.id);
        const cast = await movieM.readMovieCast(req.params.id);
        const totalReview = await movieM.countReviews(req.params.id);
      
        const totalPage = Math.ceil(totalReview.count/reviewPerPage)
    
        res.render('movies/details',{
            isLogin: req.session.uid != undefined,
            movie,
            genre,
            cast,
            totalPage,
        })
    }catch(e){
        next(e);
    }
}

exports.getReview = async(req,res,next)=>{
    try{
        
        if(!req.query.id){
            res.send('error')
        }else if(!req.query.page){
            res.send('error')
        }

        skip = (req.query.page-1)*reviewPerPage

        const result = await movieM.readReviews(req.query.id,skip,reviewPerPage);

        res.send(result)
    }catch(e){
        next(e);
    }
}