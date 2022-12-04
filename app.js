const express= require('express');
const importJSON = require('./utils/importJSON');


const app = express();
const port = 20480;

//cấu hình handlebars
require('./configs/hbs')(app);
//cấu hình session
require('./configs/session')(app);
//cấu hình express
app.use(express.static(__dirname + '/public'));
//Parse dữ liệu
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user',require('./routers/user.r'))

app.use('/home',require('./routers/home.r'))

app.use('/search',require('./routers/search.r'))

app.use('/movie',require('./routers/movies.r'))

app.use('/cast',require('./routers/cast.r'))

app.get('/',(req,res,next)=>{
   res.redirect('/home')
})
//xu ly loi
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode | 500;
    const message = err.message;
    res.render('error',{
        statusCode,
        message
    })
})

app.listen(port, async  () => {
    importJSON();
    console.log('App listening on port ',port);
});