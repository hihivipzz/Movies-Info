const express= require('express');
const importJSON = require('./config/importJSON');
const inportJSON = require('./config/importJSON')

const app = express();
const port = 20480;

//cấu hình handlebars
require('./config/hbs')(app);
//cấu hình session
require('./config/session')(app);
//cấu hình express
app.use(express.static(__dirname + '/public'));
//Parse dữ liệu
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, async  () => {
    await importJSON.importCast();
    importJSON.importMovie();
    console.log('App listening on port ',port);
});