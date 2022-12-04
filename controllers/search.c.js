const searchM = require('../models/search.m');

exports.getSearch = async (req,res,next) =>{
    try{
        var result;
        var page;

        if(!req.query.page){
            page =1;
        }else{
            page = req.query.page;
        }

        

        if(req.query.type =='cast'){
            const num = await searchM.countActor(req.query.str);
            const maxPage = Math.ceil(num/9);
            result = await searchM.findActor(req.query.str,(page-1)*9,9)
            return res.render('cast/casts',{
                isLogin: req.session.uid != undefined,
                maxPage,
                casts: result,
                page: page,
            })
        }

        var maxPage;
        if(req.query.type =='name'){
            const num = await searchM.countMovieByName(req.query.str);
            maxPage = Math.ceil(num/9);
            result = await searchM.findMovieByName(req.query.str,(page-1)*9,9);
        }else if(req.query.type=='genre'){
            const num = await searchM.countMovieByGenre(req.query.str);
            maxPage = Math.ceil(num/9);
            result = await searchM.findMovieByGenre(req.query.str,(page-1)*9,9);
        }
        
        res.render('movies/movies',{
            isLogin: req.session.uid != undefined,
            movies: result,
            maxPage,
            page,
        })
    }catch(e){
        next(e)
    }
}

