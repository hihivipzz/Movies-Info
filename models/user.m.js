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
    },

    addFavouriteMovie: async(uId,mId)=>{
        try{
            db.none('Insert into "Favourite Movies"("idUser","idMovie") VALUES ($1,$2)',[uId,mId])
        }catch(e){
            throw(e)
        }
    },

    removeFavouriteMovie: async(uId,mId)=>{
        try{
            db.none('DELETE from "Favourite Movies" where "idUser"=$1 and "idMovie"=$2',[uId,mId])
        }catch(e){
            throw(e)
        }
    },

    readFavouriteMovie: async(uId)=>{
        try{
            const result= db.any('Select * from "Favourite Movies" join "Movies" on "id" = "idMovie"  where "idUser" = $1',[uId])

            return result;
        }catch(e){
            throw(e);
        }
    },

    isFavourite: async(uId,mId)=>{
        try{
            const result = db.any('Select * from "Favourite Movies" where "idUser"=$1 and "idMovie"=$2',[uId,mId]);

            return result;
        }catch(e){
            throw(e);
        }
    }


}