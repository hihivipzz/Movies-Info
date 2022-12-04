const db = require('../configs/database')

module.exports = {
    readTopRating : async(limit)=>{
        try{
            const result = await db.any('select * from "Movies" where "rating" is not NULL order by "rating" desc limit $1',limit)

            return result;
        }catch(e){
            throw(e)
        }
    }
}