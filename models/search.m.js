const { result } = require('../config/database');
const db = require('../config/database')

module.exports = {
    findMovieByName : async(name,skip,take)=>{
        const result = await db.any(`select  * from "Movies" where Lower("title") like $1 offset $2 ROWS FETCH NEXT $3 ROWS ONLY`,['%'+name.toLowerCase()+'%',skip,take]) 
        return result;
    },

    findMovieByGenre: async(genre,skip,take)=>{
        const result = await db.any(`
        select  * from "Movies" as MV join "Movie Genres" as MVG on MV."id" = MVG."id" where Lower("genre") like $1 offset $2 ROWS FETCH NEXT $3 ROWS ONLY`,['%'+ genre.toLowerCase()+'%',skip,take]) 

        return result
    }
}