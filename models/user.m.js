const db = require('../config/database')

module.exports = {
    findUsername: async(username)=>{
        const user = await db.any('select * from "Accounts" where username = $1', [username])
        return user;
    },
    add: async(info)=>{
        try{
            var id = await db.one('select max(id) from "Accounts"')
            console.log(id)
            if(id.max== null){
                id.max=1;
            }else{
                id.max+=1
            }
            db.none('Insert into "Accounts"("id","username","password","Name","Email","DOB") VALUES ($1,$2,$3,$4,$5,$6)',[id.max,info.username,info.password,info.Name,info.Email,info.DOB])
        }catch(e){
            throw(e);
        }
    }
}