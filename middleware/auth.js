exports.auth =  async(req,res,next)=>{
    if(!req.session.uid){
        return res.render('user/login');
    }
    next();
}