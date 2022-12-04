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
    },

    findActor: async(name,skip,take)=>{
        const result = await db.any(`
        select  * from "Casts"  where Lower("name") like $1 offset $2 ROWS FETCH NEXT $3 ROWS ONLY`,['%'+ name.toLowerCase()+'%',skip,take]) 

        return result;
    },

    countMovieByName: async (name)=>{
        const result = await db.one(`select  count(*) from "Movies" where Lower("title") like $1 `,['%'+name.toLowerCase()+'%']) 
        return result.count;
    },

    countMovieByGenre : async(genre) =>{
        const result = await db.one(`
        select  count(*) from "Movies" as MV join "Movie Genres" as MVG on MV."id" = MVG."id" where Lower("genre") like $1`,['%'+ genre.toLowerCase()+'%']) 

        return result.count;
    },

    countActor : async(name)=>{
        const result = await db.one(`
        select  count(*) from "Casts"  where Lower("name") like $1 `,['%'+ name.toLowerCase()+'%']) 

        return result.count;
    }
}