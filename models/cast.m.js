const db = require('../configs/database')

module.exports = {
    readCast: async (id)=>{
        try{
            const result = await db.one(`select * from "Casts" where "id"= $1 `,[id])

            return result;
        }catch(e){
            throw(e)
        }
    },

    readCastNickName: async(id)=>{
        try{
            const result = await db.any(`select * from "Casts" as C join "Nicknames" as CN on C."id" = CN."id" where C."id"= $1 `,[id])

            return result;
        }catch(e){
            throw(e)
        }
    },

    readCastMovie: async(id)=>{
        const result = await db.any(`select distinct "id","title","year" from "Movies" join "Casting" on "idMovie"="id" where "idCast" = $1 order by "year" desc`,[id])
        return result;
    },
}