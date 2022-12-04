exports.auth =  async(req,res,next)=>{
    if(!req.session){
        return res.render('user/login');
    }
    next();
}